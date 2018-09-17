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
		let args = {}
		for (let i in params) args[params[i]] = req.params[params[i]]
		invoke.execute(invoke.response.bind({res: res, req: req}), topic, args)
	})
}


registerGET('ping', 'check server connection')
registerGET('query', ' query account', ['account'])
registerGET('transfer', ' transfer amount', ['source','target','amount','timestamp','signature'])

console.log('Backend listened in port ' + port)
app.listen(port)

