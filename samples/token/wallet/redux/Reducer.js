import {
	UPDATE_ADDRESS,
	UPDATE_TOKENS
} from './actions'

const initialState = {
	privateAddress: '',
	tokens: 0
}

const reducer = (state = initialState, action) => {
	const { privateAddress, tokens } = state
	const { type, payload } = action

	switch (type) {
		case UPDATE_ADDRESS:
			return { ...state, privateAddress: payload }

		case UPDATE_TOKENS:
			return { ...state, tokens: payload }

		default:
			return state
	}
}

export default reducer
