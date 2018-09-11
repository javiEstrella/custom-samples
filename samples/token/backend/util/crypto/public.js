let priv = process.argv.slice(2)[0]
if (priv)
	console.log(require('./crypto').generatePublic(priv))