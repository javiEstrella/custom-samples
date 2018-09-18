export default {
	storage: null,
	data: {},
	get(key) {
		return this.data[key]
	},
	register(key, value) {
		this.data[key] = value
		return value
	},
	async read(key, d = null) {
		let value = null
		try {
			value = await this.storage.getItem(key)
		} catch (err) {
		}

		if (value == null && d != null) {
			value = d
		}
		return value
	},
	async load(key, d = null) {
		let value = await this.read(key, d)
		this.register(key, value)
		return value
	},
	async save(key) {
		try {
			await this.storage.setItem(key, this.data[key])
		} catch (err) {
		}
	}
}