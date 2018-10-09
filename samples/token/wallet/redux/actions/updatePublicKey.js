export const UPDATE_PUBLIC_KEY = 'UPDATE_PUBLIC_KEY'

export function updatePublicKey(publicKey) {
	return {
		type: UPDATE_PUBLIC_KEY,
		payload: publicKey
	}
}