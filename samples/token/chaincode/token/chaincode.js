const shim = require('fabric-shim')
const util = require('util')
const Elliptic = require('elliptic')
const EC = Elliptic.eddsa
const ec = new EC('ed25519')
const sha256 = require('js-sha256').sha256

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

	// Transfer
	async transfer(stub, args) {
		if (args.length != 5) {
			throw new Error('Incorrect number of arguments. Expecting [source, target, amount, timestamp, signature]')
		}

		let source = args[0]
		let target = args[1]
		let amount = args[2]
		let timestamp = args[3]
		let signature = args[4]

		if (isNaN(parseInt(amount))) {
			throw new Error(JSON.stringify({error: 'Expecting integer value for amount'}))
		}

		if (isNaN(parseInt(timestamp))) {
			throw new Error(JSON.stringify({error: 'Expecting integer value for timestamp'}))
		}

		let balance = await stub.getState(source)
		if (!balance) {
			throw new Error(JSON.stringify({error: 'Failed to get balance for ' + source}))
		}

		if (amount > balance) {
			throw new Error(JSON.stringify({error: 'Insufficient balance for ' + source}))
		}

		let message = sha256(source + '-' + target + '-' + amount + '-' + timestamp)
		let key = ec.keyFromPublic(source, 'hex')
		try {
			if (!key.verify(message, signature))
				throw new Error()
		} catch (error) {
			throw new Error(JSON.stringify({error: 'Invalid signature ' + signature}))
		}

		let other = await stub.getState(target)
		if (!other) {
			throw new Error(JSON.stringify({error: 'Failed to get state for ' + target}))
		}

		other = other + amount

		await stub.putState(source, Buffer.from((balance - amount).toString()))
		await stub.putState(target, Buffer.from(other.toString()))

		return Buffer.from('Source: ' + (balance - amount) + ' Target: ' + other)

	}
}

shim.start(new Token(shim))