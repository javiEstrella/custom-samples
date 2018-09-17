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
	let peer = client.newPeer('grpc://localhost:7051')
	channel.addPeer(peer)
	let path = require('path').join(__dirname, '../hfc-key-store')

	callback = callback(request)

	if (request.chainId) {
		executePersistent(callback, client, channel, peer, path, request)
	} else {
		executeQuery(callback, client, channel, peer, path, request)
	}
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
			request.chainId = 'mychannel'
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

function executePersistent(callback, client, channel, peer, path, request) {
	channel.addOrderer(client.newOrderer('grpc://localhost:7050'))

	FabricClient.newDefaultKeyValueStore({ path: path
	}).then((state) => {
		return obtainUser(client, state, path)

	}).then((user) => {
		return sendTransactionProposal(user, channel, request, client)

	}).then((results) => {
		// Submit proposal
		var proposalResponses = results[0]
		var proposal = results[1]
		var txIdValue = request.txId.getTransactionID()

		let validProposal = (proposalResponses && proposalResponses[0].response && proposalResponses[0].response.status === 200)
		if (validProposal) {
			var r = {
				proposalResponses: proposalResponses,
				proposal: proposal
			}

			var promises = [channel.sendTransaction(r)]
			let hub = channel.newChannelEventHub(peer)

			let promise = new Promise((resolve, reject) => {
				let handle = setTimeout(() => {
					hub.unregisterTxEvent(txIdValue)
					hub.disconnect()
					resolve({event_status : 'TIMEOUT'})
				}, 3000)

				hub.registerTxEvent(txIdValue, (tx, code) => {
					clearTimeout(handle)
					resolve({event_status : code, tx_id : txIdValue})
				}, (err) => {
					reject(new Error('There was a problem with the eventhub ::' + err))
				},
					{disconnect: true}
				)
				hub.connect()

			})
			promises.push(promise)

			return Promise.all(promises)
		} else {
			callback(new Error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...'))
		}
	}).then((results) => {
		callback(results)

	}).catch((err) => {
		callback(err)
	})
}

function executeQuery(callback, client, channel, peer, path, request) {
	FabricClient.newDefaultKeyValueStore({ path: path
	}).then((state) => {
		return obtainUser(client, state, path)

	}).then((user) => {
		return query(user, channel, request)

	}).then((responses) => {
		callback(responses)

	}).catch((err) => {
		callback(err)
	})
}

function obtainUser(client, state, path, id = 'user1') {
	client.setStateStore(state)
	let suite = FabricClient.newCryptoSuite()
	let store = FabricClient.newCryptoKeyStore({path: path})
	suite.setCryptoKeyStore(store)
	client.setCryptoSuite(suite)

	return client.getUserContext(id, true)
}

function query(user, channel, request) {
	validateUser(user)

	return channel.queryByChaincode(request)
}

function sendTransactionProposal(user, channel, request, client) {
	validateUser(user)
	request.txId = client.newTransactionID()

	return channel.sendTransactionProposal(request)
}

function validateUser(user) {
	if (!user || !user.isEnrolled())
		throw new Error('Failed to get user')
}

function traceQueryResult(responses) {
	if (responses instanceof Error) {
		console.error('Failed to execute successfully :: ' + responses)
	} else {
		if (responses && responses.length == 1) {
			if (responses[0] instanceof Error) {
				console.error("error from query = ", responses[0])
			} else {
				console.log("Response is ", responses[0].toString())
			}
		} else {
			console.log("No payloads were returned from query")
		}
	}
}

function tracePersistentResult(results) {
	if (results instanceof Error) {
		console.error('Failed to execute successfully :: ' + results)
	} else {
		if (results && results[0] && results[0].status === 'SUCCESS') {
			console.log('Successfully sent transaction to the orderer')
		} else {
			console.error('Failed to order the transaction. Error code: ' + results[0].status)
		}

		if(results && results[1] && results[1].event_status === 'VALID') {
			console.log('Successfully committed the change to the ledger by the peer')
		} else {
			console.error('Transaction failed to be committed to the ledger due to ::' + results[1].event_status)
		}
	}
}

function trace(request) {
	return (request.chainId) ? tracePersistentResult : traceQueryResult
}

function responseQueryResult(responses) {
	let result = {}
	if (responses instanceof Error) {
		result.error = 'Failed to execute successfully :: ' + responses
	} else {
		if (responses && responses.length == 1) {
			if (responses[0] instanceof Error) {
				result.error = 'Query error'
			} else {
				result.value = responses[0].toString()
			}
		} else {
			result.info = 'No payloads were returned'
			result.value = ''
		}
	}
	this.res.send(result)
}

function responsePersistentResult(results) {	
	let result
	if (results instanceof Error) {
		result = {}
		result.error = 'Failed to execute successfully :: ' + results
	} else {
		result = [{},{}]
		if (results && results[0] && results[0].status === 'SUCCESS') {
			result[0].info = 'Successfully sent transaction to the orderer'
		} else {
			result[0].error = 'Failed to order the transaction. Error code: ' + results[0].status
		}

		if(results && results[1] && results[1].event_status === 'VALID') {
			result[1].info = 'Successfully committed the change to the ledger by the peer'
		} else {
			result[1].error = 'Transaction failed to be committed to the ledger due to ::' + results[1].event_status
		}
	}
	this.res.send(result)
}

function response(request) {
	return (request.chainId) ? responsePersistentResult.bind(this) : responseQueryResult.bind(this)
}

module.exports.execute = execute
module.exports.trace = trace
module.exports.response = response
