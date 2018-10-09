import Config from './Config'

export default {
	host() {
		return Config.BACKEND_URL + ':' + Config.BACKEND_PORT
	},

	async get(elements) {
		try {
			let url = this.host()
			for (let i in elements) url += '/' + elements[i]
			let response = await fetch(url)
			return (response.ok) ? response.json() : null
		} catch (err) {
			return null
		}
	},

	async ping() {
		let result = await this.get(['ping'])
		return result
	},

	async query(address) {
		let result = await this.get(['query', address])
		return result
	},

	async transfer(source, target, amount, timestamp, signature) {
		let result = await this.get(['transfer', source, target, amount, timestamp, signature])
		return result
	}
}