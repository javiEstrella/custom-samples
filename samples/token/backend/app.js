const port = 3000

var express = require('express')
var app = express()
var invoke = require('./util/invoke')

var gets = {}

app.get('/', function (req, res) {
	res.send({
		info: 'Backend API',
		gets: gets
	})
})

function registerGET(topic, description, params = []) {
	gets[topic] = {description: description, params: params}

	let path = '/' + topic
	for (let i in params) path += '/:' + params[i]
	app.get(path, function (req, res) {
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
		let args = {}
		for (let i in params) args[params[i]] = req.params[params[i]]
		invoke.execute(callback, topic, args)
	})
}


registerGET('ping', 'check server connection')
registerGET('query', ' query account', ['account'])

console.log('Backend listened in port ' + port)
app.listen(port)

