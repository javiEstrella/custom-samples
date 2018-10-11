export const UPDATE_ADDRESS_SCANNER_INVOCATOR = 'UPDATE_ADDRESS_SCANNER_INVOCATOR'

export function updateAddressScannerInvocator(addressScannerInvocator) {
	return {
		type: UPDATE_ADDRESS_SCANNER_INVOCATOR,
		payload: addressScannerInvocator
	}
}