let args = process.argv.slice(2)
let priv = args[0]
let message = args[1]

if (priv && message)
	console.log(require('./crypto').sign(priv, message))