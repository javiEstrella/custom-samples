export const UPDATE_REMOTE_ADDRESS = 'UPDATE_REMOTE_ADDRESS'

export function updateRemoteAddress(remoteAddress) {
	return {
		type: UPDATE_REMOTE_ADDRESS,
		payload: remoteAddress
	}
}