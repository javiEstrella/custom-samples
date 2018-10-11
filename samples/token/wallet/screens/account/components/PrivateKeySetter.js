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

import AccountDialog from './AccountDialog'
import AddressScanner from '../../../components/AddressScanner'

import Migrate from '../../../services/Migrate'

import { updateAddressScannerResult } from '../../../redux/actions/updateAddressScannerResult'
import { updateAddressScannerInvocator } from '../../../redux/actions/updateAddressScannerInvocator'
import { updateVisibleAddressScanner } from '../../../redux/actions/updateVisibleAddressScanner'
import { updatePrivateKey } from '../../../redux/actions/updatePrivateKey'
import { updatePublicKey } from '../../../redux/actions/updatePublicKey'
import { updateTokens } from '../../../redux/actions/updateTokens'

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
		updatePrivateKey: privateKey => dispatch(updatePrivateKey(privateKey)),
		updatePublicKey: publicKey => dispatch(updatePublicKey(publicKey)),
		updateTokens: tokens => dispatch(updateTokens(tokens))
	}
}

class PrivateKeySetter extends Component {
	state = {
		accountDialogVisible: false
	}

	initScanner = this.initScanner.bind(this)
	endScanner = this.endScanner.bind(this)
	setPrivateKey = this.setPrivateKey.bind(this)

	initScanner() {
		const { updateAddressScannerResult, updateAddressScannerInvocator, updateVisibleAddressScanner } = this.props
		updateAddressScannerResult(null)
		updateAddressScannerInvocator('PrivateKeySetter')
		updateVisibleAddressScanner(true)
	}

	async endScanner() {
		const { updateAddressScannerInvocator, updateAdddressScannerResult, addressScannerResult, addressScannerInvocator } = this.props

		if (addressScannerInvocator == 'PrivateKeySetter') {
			updateAddressScannerInvocator(null)
			if (addressScannerResult != null) {
				await this.setPrivateKey(addressScannerResult)
			}
			updateAddressScannerResult(null)
		}
	}

	async setPrivateKey(privateKey) {
		const { updatePrivateKey, updatePublicKey, updateTokens } = this.props

		updatePrivateKey(privateKey)

		// Migrate to thunk
		let publicKey = await Migrate.obtainPublic(privateKey)
		updatePublicKey(publicKey)

		// Migrate to thunk
		let tokens = await Migrate.obtainTokens(publicKey)
		updateTokens(tokens)
	}

	async componentDidMount() {
		await this.endScanner()
	}

	render() {
		const { addressScannerResult } = this.props
		const { accountDialogVisible, scanning } = this.state
	
		return (
			<View style={ styles.parent }>
				<Icon name='camera'
					color='ivory'
					onPress={ this.initScanner }>
				</Icon>

				<Icon name='keyboard'
					color='ivory'
					onPress={ () => this.setState({accountDialogVisible: true}) }>
				</Icon>
	
				<AccountDialog
					visible={ accountDialogVisible }
					setPrivateKey={ this.setPrivateKey }
					close={ () => this.setState({accountDialogVisible: false}) } >
				</AccountDialog>
			</View>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateKeySetter)

const styles = StyleSheet.create({
	parent: {
		margin: 0,
		flexDirection: 'column',
		justifyContent: 'center'
	}
})
