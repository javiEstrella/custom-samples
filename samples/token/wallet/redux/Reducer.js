import {
	UPDATE_ADDRESS,
	UPDATE_PUBLIC,
	UPDATE_TOKENS
} from './actions'

const initialState = {
	privateAddress: '',
	publicAddress: '',
	tokens: 0
}

const reducer = (state = initialState, action) => {
	const { privateAddress, publicAddress, tokens } = state
	const { type, payload } = action

	switch (type) {
		case UPDATE_ADDRESS:
			return { ...state, privateAddress: payload }

		case UPDATE_PUBLIC:
			return { ...state, publicAddress: payload}

		case UPDATE_TOKENS:
			return { ...state, tokens: payload }

		default:
			return state
	}
}

export default reducer
