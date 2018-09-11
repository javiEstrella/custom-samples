let args = process.argv.slice(2)
let key = args[0]
let message = args[1]
let signature = args[2]
let type = args[3]

if (key && message && signature && type)
	console.log(require('./crypto').verify(key, message, signature, type))