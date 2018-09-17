'use strict'
let invoke = require('./invoke')
let args = require('minimist')(process.argv.slice(2))
invoke.execute(invoke.trace, args.fcn, args)
