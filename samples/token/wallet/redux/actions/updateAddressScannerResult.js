export const UPDATE_ADDRESS_SCANNER_RESULT = 'UPDATE_ADDRESS_SCANNER_RESULT'

export function updateAddressScannerResult(addressScannerResult) {
	return {
		type: UPDATE_ADDRESS_SCANNER_RESULT,
		payload: addressScannerResult
	}
}