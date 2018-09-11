const shim = require('fabric-shim')
const util = require('util')

const Token = class {

	// Initialize the chaincode
	async Init(stub) {
		let ret = stub.getFunctionAndParameters()
		let args = ret.params

		if (args.length != 2) {
			return shim.error('Incorrect number of arguments. Expecting 2 ' + args.length)
		}

		let account = args[0]
		let tokens = args[1]

		if (typeof parseInt(tokens) !== 'number') {
			return shim.error('Expecting integer value for tokens')
		}

		try {
			await stub.putState(account, Buffer.from(tokens))
			return shim.success()
		} catch (err) {
			return shim.error(err)
		}
	}

	// Invoke a function
	async Invoke(stub) {
		let ret = stub.getFunctionAndParameters()
		let method = this[ret.fcn]
		if (!method) {
			// Undefined method
			return shim.success()
		}

		try {
			let payload = await method(stub, ret.params)
			return shim.success(payload)
		} catch (err) {
			return shim.error(err)
		}
	}

	// Check chaincode
	async ping(stub, args) {
		return Buffer.from('pong')
	}

	// Query account
	async query(stub, args) {
		if (args.length != 1) {
			throw new Error('Incorrect number of arguments. Expecting account')
		}

		let account = args[0]
		let bytes = await stub.getState(account)
		if (!bytes) {
			throw new Error(JSON.stringify({error: 'Failed to get state for ' + account}))
		}

		return Buffer.from(bytes)
	}
}

shim.start(new Token(shim))
