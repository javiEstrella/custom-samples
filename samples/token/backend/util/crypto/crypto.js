var Elliptic = require('elliptic')
var EC = Elliptic.eddsa
var ec = new EC('ed25519')
var sha256 = require('js-sha256').sha256

// Generate public key from key
// k: <string|key>
//
// Return string (invalid k -> '')
function generatePublic(k) {
	return (k) ? Elliptic.utils.toHex(getKey(k).getPublic()) : ''
}

// Return key
// k: <string|key>
//
// Return elliptic key (or null)
function getKey(k) {
	return (k) ?
			((isString(k)) ? generateKey(k) : k) :
			null
}

// Generate elliptic key
// secret: string
//
// Return elliptic key
function generateKey(secret) {
	return ec.keyFromSecret(sha256(secret))
}

// Sign a message
// key: <string|key>
// message: string
//
// Return string
function sign(key, message) {
	let result = ''
	if (key) {
		key = (isString(key)) ? generateKey(key) : key
		result = key.sign(sha256(message)).toHex()
	}
	return result
}

// Verify a signature
// key: <string|key>
// message: string
// signature: string
// type: 'public' || 'private' (default 'public') - Only used if `isString(key) == true`
//
// Retrun true or false
function verify(key, message, signature, type = 'public') {
	if (key) {
		try {
			switch (type) {
			case 'public':
				if (isString(key))
					key = ec.keyFromPublic(key, 'hex')
				break
	
			case 'private':
				if (isString(key))
					key = generateKey(key)
				break
	
			default:
				return false
			}
	
			return key.verify(sha256(message), signature)
		} catch (error) {
		}
	}

	return false
}

function isString(v) {
	return typeof(v) === 'string' || s instanceof String;
}

module.exports.generatePublic = generatePublic
module.exports.sign = sign
module.exports.verify = verify