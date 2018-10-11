import React, { Component } from 'react'
import {
	StyleSheet,
	View
} from 'react-native'

import { Icon } from 'react-native-elements'

import {
	connect,
	dispatch
} from 'react-redux'

import RemoteAddressDialog from './RemoteAddressDialog'

import { updateAddressScannerResult } from '../../../redux/actions/updateAddressScannerResult'
import { updateAddressScannerInvocator } from '../../../redux/actions/updateAddressScannerInvocator'
import { updateVisibleAddressScanner } from '../../../redux/actions/updateVisibleAddressScanner'
import { updateRemoteAddress } from '../../../redux/actions/updateRemoteAddress'

const mapStateToProps = state => {
	return {
		addressScannerResult: state.addressScannerResult,
		addressScannerInvocator: state.addressScannerInvocator
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateVisibleAddressScanner: visibleAddressScanner => dispatch(updateVisibleAddressScanner(visibleAddressScanner)),
		updateAddressScannerResult: addressScannerResult => dispatch(updateAddressScannerResult(addressScannerResult)),
		updateAddressScannerInvocator: addressScannerInvocator => dispatch(updateAddressScannerInvocator(addressScannerInvocator)),
		updateRemoteAddress: remoteAddress => dispatch(updateRemoteAddress(remoteAddress))
	}
}

class RemoteAddressSetter extends Component {
	state = {
		remoteAddressDialogVisible: false
	}

	initScanner = this.initScanner.bind(this)
	endScanner = this.endScanner.bind(this)

	initScanner() {
		const { updateAddressScannerResult, updateAddressScannerInvocator, updateVisibleAddressScanner } = this.props
		updateAddressScannerResult(null)
		updateAddressScannerInvocator('RemoteAddressSetter')
		updateVisibleAddressScanner(true)
	}

	async endScanner() {
		const { updateAddressScannerResult, updateAddressScannerInvocator, updateRemoteAddress, addressScannerResult, addressScannerInvocator } = this.props

		if (addressScannerInvocator == 'RemoteAddressSetter') {
			updateAddressScannerInvocator(null)
			if (addressScannerResult != null) {
				updateRemoteAddress(addressScannerResult)
			}
			updateAddressScannerResult(null)
		}
	}

	async componentDidMount() {
		await this.endScanner()
	}

	render() {
		const { updateRemoteAddress } = this.props
		const { remoteAddressDialogVisible } = this.state
		
		return (
			<View style={ styles.parent }>
				<Icon name='camera'
					color='ivory'
					onPress={ this.initScanner }>
				</Icon>
							
				<Icon name='keyboard'
					color='ivory'
					onPress={ () => this.setState({remoteAddressDialogVisible: true}) }>
				</Icon>

				<RemoteAddressDialog
					updateRemoteAddress={ updateRemoteAddress }
					visible={ remoteAddressDialogVisible }
					close={ () => this.setState({remoteAddressDialogVisible: false}) } />
			</View>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoteAddressSetter)

const styles = StyleSheet.create({
	parent: {
		margin: 0,
		flexDirection: 'column',
		justifyContent: 'center'
	}
})
