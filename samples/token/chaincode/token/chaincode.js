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

	async ping(stub, args) {
		return 'pong'
	}

}

shim.start(new Token(shim))
