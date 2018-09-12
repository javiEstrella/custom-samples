let args = process.argv.slice(2)
let priv = args[0]
let target = args[1]
let amount = args[2]
let timestamp = args[3]

if (priv && target && amount && timestamp) {
	let crypto = require('./crypto')
	let pub = crypto.generatePublic(priv)
	let message = pub + '-' + target + '-' + amount + '-' + timestamp
	console.log(crypto.sign(priv, message))
}