const port = 3001

var crypto = require('./crypto')
var express = require('express')
var app = express()

app.get('/public/:private', function (req, res) {
	res.send(crypto.generatePublic(req.params.private))
})

app.get('/sign/:private/:message', function (req, res) {
	res.send(crypto.sign(req.params.private, req.params.message))
})

app.get('/sign/:private/:target/:amount/:timestamp', function (req, res) {
	let pub = crypto.generatePublic(req.params.private)
	let message = pub + '-' + req.params.target + '-' + req.params.amount + '-' + req.params.timestamp
	res.send(crypto.sign(req.params.private, message))
})

app.get('/verify/:key/:message/:signature/:type', function (req, res) {
	res.send(crypto.verify(req.params.key, req.params.message, req.params.signature, req.params.type))
})

console.log('Crypto backend listened in port ' + port)
app.listen(port)

