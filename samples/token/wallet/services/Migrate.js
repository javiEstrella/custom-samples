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
	}
}