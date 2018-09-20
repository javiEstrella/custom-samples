import Crypto from './Crypto'
import Backend from './Backend'

export default {
	async obtainTokens(address) {
		let tokens = 0
		if (address != null) {
			let publicAddress = await Crypto.getPublic(address)
			tokens = await Backend.query(publicAddress)
			tokens = Number((tokens != null) ? tokens.value : 0)
		}
		return tokens
	}
}