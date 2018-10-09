export const UPDATE_TOKENS_TO_TRANSFER = 'UPDATE_TOKENS_TO_TRANSFER'

export function updateTokensToTransfer(tokensToTransfer) {
	return {
		type: UPDATE_TOKENS_TO_TRANSFER,
		payload: tokensToTransfer
	}
}