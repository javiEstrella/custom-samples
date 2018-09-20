export const UPDATE_TOKENS = 'UPDATE_TOKENS'

export function updateTokens(tokens) {
	return {
		type: UPDATE_TOKENS,
		payload: tokens
	}
}