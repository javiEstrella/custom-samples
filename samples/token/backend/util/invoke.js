'use strict'
var FabricClient = require('fabric-client')

function execute(callback, fcn, args = {}) {
	args.fcn = fcn
	let request = parseQuery(args)
	if (request.error) {
		throw new Error(request.error)
	}

	let client = new FabricClient()
	let channel = client.newChannel('mychannel')
	channel.addPeer(client.newPeer('grpc://localhost:7051'))
	let path = require('path').join(__dirname, '../hfc-key-store')

	FabricClient.newDefaultKeyValueStore({ path: path
	}).then((state) => {
		// Obtain user
		client.setStateStore(state)
		let suite = FabricClient.newCryptoSuite()
		let store = FabricClient.newCryptoKeyStore({path: path})
		suite.setCryptoKeyStore(store)
		client.setCryptoSuite(suite)

		return client.getUserContext('user1', true)

	}).then((user) => {
		// Execute request
		if (!user || !user.isEnrolled())
			throw new Error('Failed to get user')

		return channel.queryByChaincode(request)

	}).then((responses) => {
		callback(responses)

	}).catch((err) => {
		callback(error)
	})
}

function parseQuery(args) {
	let request = {
		chaincodeId: 'token',
		args: []
	}

	if (!args.fcn) {
		request.error = 'Unspecified function'
		return request
	}

	request.fcn = args.fcn
	let error = null
	switch(request.fcn) {
		case 'ping':
			break

		case 'query':
			error = validate(args, ['account'])
			if (error != null) {
				request.error = error
				return request
			}
			request.args = [args.account]
			break

		case 'transfer':
			error = validate(args, ['source', 'target', 'amount', 'timestamp', 'signature'])
			if (error != null) {
				request.error = error
				return request
			}
			request.args = [args.source, args.target, args.amount, args.timestamp, args.signature]
			break

		default:
			request.error = 'Unsupported function: ' + request.fcn
	}

	for (let item in request.args) request.args[item] = request.args[item].toString()

	return request
}

function validate(args, parameters) {
	let i
	for (i = 0; i < parameters.length; i++) {
		if (!args[parameters[i]]) {
			return 'Unspecificed argument: ' + parameters[i]
		}
	}
	return null
}

module.exports.execute = execute
module.exports.parseQuery = parseQuery