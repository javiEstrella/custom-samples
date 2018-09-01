const port = 3000

var express = require('express')
var app = express()
var invoke = require('./invoke')

app.get('/', function (req, res) {
	res.send({
		info: 'Backend API',
		methods: 
		[{
			name: 'ping',
			description: 'check server connection'
		}]
	})
})

app.get('/ping', function (req, res) {
	let callback = function(responses) {
		let result = {}
		if (responses && responses.length == 1) {
			if (responses[0] instanceof Error) {
				result.error = 'Query error'
			} else {
				result.value = responses[0].toString()
			}
		} else {
			result.info = 'No payloads were returned'
			result.value = ''
		}
		res.send(result)
	}
	invoke.execute(callback, 'ping')
})


console.log('Backend listened in port ' + port)
app.listen(port)

