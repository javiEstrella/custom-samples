'use strict'
var FabricClient
var client, channel
var request = {}

var invoke = require('./invoke')

prepareRequest()
setupFabric()
execute()

function prepareRequest() {
	request = invoke.parseQuery(require('minimist')(process.argv.slice(2)))
	if (request.error) {
		console.log(request.error)
		process.exit(1)
	}
}

function setupFabric() {
	FabricClient = require('fabric-client')
	client = new FabricClient()
	channel = client.newChannel('mychannel')
	channel.addPeer(client.newPeer('grpc://localhost:7051'))
}

function execute() {
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
		// Process response
		if (responses && responses.length == 1) {
			if (responses[0] instanceof Error) {
				console.error("error from query = ", responses[0])
			} else {
				console.log("Response is ", responses[0].toString())
			}
		} else {
			console.log("No payloads were returned from query")
		}

	}).catch((err) => {
		console.error('Failed to query successfully :: ' + err)
	})
}
