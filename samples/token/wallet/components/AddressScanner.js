import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	View
} from 'react-native'

import {
	Camera,
	Permissions
} from 'expo'

import {
	connect,
	dispatch
} from 'react-redux'

const mapStateToProps = state => {
	return { visibleAddressScanner: state.visibleAddressScanner }
}

import { updateVisibleAddressScanner } from '../redux/actions/updateVisibleAddressScanner'
import { updateAddressScannerResult } from '../redux/actions/updateAddressScannerResult'
const mapDispatchToProps = dispatch => {
	return {
		updateVisibleAddressScanner: visibleAddressScanner => dispatch(updateVisibleAddressScanner(visibleAddressScanner)),
		updateAddressScannerResult: addressScannerResult => dispatch(updateAddressScannerResult(addressScannerResult))
	}
}

class AddressScanner extends Component {
	state = {
		hasCameraPermission: null
	}

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({hasCameraPermission: status === 'granted'})
	}

	handleBarCodeReaded = (data) => {
		this.props.updateAddressScannerResult(data.data)
		this.props.updateVisibleAddressScanner(false)
	}

	componentDidMount() {
		this.timeoutHandle = setTimeout(() => {
			if (this.props.visibleAddressScanner) {
				this.props.updateAddressScannerResult(null)
				this.props.updateVisibleAddressScanner(false)
			}
		}, 15000)
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutHandle)
	}

	render() {
		const { hasCameraPermission } = this.state

		if (hasCameraPermission === null) {
			return <Text>Requesting for camera permission</Text>
		}

		if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>
		}

		return (
			<View style={{ flex: 1 }}>
				<Camera
					onBarCodeRead={ this.handleBarCodeReaded }
					style={ StyleSheet.absoluteFill }>
				</Camera>
			</View>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressScanner)
