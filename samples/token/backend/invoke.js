'use strict'
var FabricClient = require('fabric-client')

function execute(callback, fcn) {
	let request = {
		chaincodeId: 'token',
		fcn: fcn,
		args: []
	}

	let client = new FabricClient()
	let channel = client.newChannel('mychannel')
	channel.addPeer(client.newPeer('grpc://localhost:7051'))
	let path = require('path').join(__dirname, 'hfc-key-store')

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

module.exports.execute = execute
