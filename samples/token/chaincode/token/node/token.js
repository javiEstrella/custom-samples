'use strict'
const shim = require('fabric-shim')
const util = require('util')

let Chaincode = class {

	async Init(stub) {
		return shim.success()
	}

	async Invoke(stub) {
		let ret = stub.getFunctionAndParameters()
		console.info(ret)

		let method = this[ret.fcn]
		if (!method) {
			console.error('no function of name:' + ret.fcn + ' found')
			throw new Error('Received unknown function ' + ret.fcn + ' invocation')
		}

		try {
			let payload = await method(stub, ret.params)
			return shim.success(payload)
		} catch (err) {
			console.log(err)
			return shim.error(err)
		}
	}

	async queryAddress(stub, args) {
		if (args.length != 1)
			throw new Error('Incorrect number of arguments. Expecting AddressNumber ex: ADD1')

		let addressNumber = args[0]

		let addressAsBytes = await stub.getState(addressNumber)
		if (!addressAsBytes || addressAsBytes.toString().length <= 0)
			throw new Error(addressNumber + ' does not exist: ')

		console.log(addressAsBytes.toString())
		return addressAsBytes
	}

	async initLedger(stub, args) {
		let addresses = []
		addresses.push({ item: 'Pen', owner: 'Pepe' })
		addresses.push({ item: 'Pencil', owner: 'Pipo' })
		addresses.push({ item: 'Lighter', owner: 'Pupa' })
		addresses.push({ item: 'Book', owner: 'Pope' })

		for (let i = 0; i < addresses.length; i++) {
			addresses[i].docType = 'address'
			await stub.putState('ADD' + i, Buffer.from(JSON.stringify(addresses[i])))
			console.info('Added <--> ', addresses[i])
		}
	}
}

shim.start(new Chaincode());
