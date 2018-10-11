export const UPDATE_VISIBLE_ADDRESS_SCANNER = 'UPDATE_VISIBLE_ADDRESS_SCANNER'

export function updateVisibleAddressScanner(visibleAddressScanner) {
	return {
		type: UPDATE_VISIBLE_ADDRESS_SCANNER,
		payload: visibleAddressScanner
	}
}