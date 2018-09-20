export const UPDATE_PUBLIC = 'UPDATE_PUBLIC'

export function updatePublic(address) {
	return {
		type: UPDATE_PUBLIC,
		payload: address
	}
}