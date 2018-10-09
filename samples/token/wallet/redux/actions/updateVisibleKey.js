export const UPDATE_VISIBLE_KEY = 'UPDATE_VISIBLE_KEY'

export function updateVisibleKey(visibleKey) {
	return {
		type: UPDATE_VISIBLE_KEY,
		payload: visibleKey
	}
}