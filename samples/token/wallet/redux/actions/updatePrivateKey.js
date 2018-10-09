export const UPDATE_PRIVATE_KEY = 'UPDATE_PRIVATE_KEY'

export function updatePrivateKey(privateKey) {
	return {
		type: UPDATE_PRIVATE_KEY,
		payload: privateKey
	}
}