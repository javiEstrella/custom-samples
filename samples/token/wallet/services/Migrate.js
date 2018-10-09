import Crypto from './Crypto'
import Backend from './Backend'

export default {
	async obtainTokens(publicAddress) {
		let tokens = 0
		if (publicAddress != null) {
			tokens = await Backend.query(publicAddress)
			tokens = Number((tokens != null) ? tokens.value : 0)
		}
		return tokens
	},

	async obtainPublic(privateAddress) {
		let result = null
		if (privateAddress != null) {
			result = await Crypto.getPublic(privateAddress)
		}
		return result
	},

	async transfer(privateAddress, target, amount) {
		let result = null
		if (privateAddress != null) {
			let timestamp = Date.now()
			let publicAddress = await Crypto.getPublic(privateAddress)
			let signature = await Crypto.sign(privateAddress, target, amount, timestamp)
			result = await Backend.transfer(publicAddress, target, amount, timestamp, signature)
		}
		return result
	}
}