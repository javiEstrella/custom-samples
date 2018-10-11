import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Platform
} from 'react-native'

import AddressScanner from '../../components/AddressScanner'
import TokensToTransfer from './components/TokensToTransfer'
import RemoteAddress from './components/RemoteAddress'
import TransferButton from './components/TransferButton'

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return { visibleAddressScanner: state.visibleAddressScanner }
}

class Transaction extends Component {
	render() {
		const { visibleAddressScanner } = this.props

		if (visibleAddressScanner) {
			return (<AddressScanner />)
		} else {
			return (
				<View style={ styles.parent }>
					<Text style={ styles.text }>Transfer</Text>
					<TokensToTransfer />
					<Text style={ styles.text }>pesetas</Text>
					<Text style={ styles.text }>to</Text>
					<RemoteAddress />
					<TransferButton />
				</View>
			)
		}
	}
}

export default connect(mapStateToProps, {})(Transaction)

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#586589'
	},

	text: {
		fontSize: 50,
		padding: 0,
		margin: 0,
		color: 'ivory',
		fontWeight: 'bold',
	},

	slider: {
		justifyContent: 'center'
	}

})