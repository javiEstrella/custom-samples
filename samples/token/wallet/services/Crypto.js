import Config from './Config'

export default {
	host() {
		return Config.BACKEND_URL + ':' + Config.CRYPTO_PORT
	},
	async get(elements) {
		let url = this.host()
		for (let i in elements) url += '/' + elements[i]
		let response = await fetch(url)
		return response.text()
	},
	async getPublic(key) {
		let result = await this.get(['public', key])
		return result
	},
	async sign(key, message) {
		let result = await this.get(['sign', key, message])
		return result
	},
	async sign(key, target, amount, timestamp) {
		let result = await this.get(['sign', key, target, amount, timestamp])
		return result
	},
	async verify(key, message, signature, type) {
		let result = await this.get(['verify', key, message, signature, type])
		return result
	}
}