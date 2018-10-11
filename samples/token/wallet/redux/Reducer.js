import {
	UPDATE_PRIVATE_KEY,
	UPDATE_PUBLIC_KEY,
	UPDATE_VISIBLE_KEY,
	UPDATE_TOKENS,
	UPDATE_REMOTE_ADDRESS,
	UPDATE_TOKENS_TO_TRANSFER,
	UPDATE_VISIBLE_ADDRESS_SCANNER,
	UPDATE_ADDRESS_SCANNER_RESULT,
	UPDATE_ADDRESS_SCANNER_INVOCATOR,
} from './actions'

const initialState = {
	visibleAddressScanner: false,
	addressScannerResult: null,
	addressScannerInvocator: null,
	privateKey: '',
	publicKey: '',
	visibleKey: 'public',
	tokens: 0,
	remoteAddress: '',
	tokensToTransfer: '0',
	transactions: [
		{id:'1', value: 10, source: 'x', target: 'y'},
		{id:'2', value: 15, source: 'y', target: 'x'},
		{id:'3', value: 25, source: 'y', target: 'x'},
		{id:'4', value: 35, source: 'z', target: 'x'},
		{id:'5', value: 100, source: 'x', target: 'z'},
		{id:'6', value: 100, source: 'x', target: 'z'},
		{id:'7', value: 100, source: 'x', target: 'z'}
	]
}

const reducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case UPDATE_PRIVATE_KEY:
			return { ...state, privateKey: payload }

		case UPDATE_PUBLIC_KEY:
			return { ...state, publicKey: payload }

		case UPDATE_VISIBLE_KEY:
			return { ...state, visibleKey: payload }

		case UPDATE_TOKENS:
			return { ...state, tokens: payload }

		case UPDATE_REMOTE_ADDRESS:
			return { ...state, remoteAddress: payload }

		case UPDATE_TOKENS_TO_TRANSFER:
			return { ...state, tokensToTransfer: payload }

		case UPDATE_VISIBLE_ADDRESS_SCANNER:
			return { ...state, visibleAddressScanner: payload }

		case UPDATE_ADDRESS_SCANNER_RESULT:
			return { ...state, addressScannerResult: payload }

		case UPDATE_ADDRESS_SCANNER_INVOCATOR:
			return { ...state, addressScannerInvocator: payload }

		default:
			return state
	}
}

export default reducer
