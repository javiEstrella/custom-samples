import React, { Component } from 'react'
import {
	StyleSheet,
	Platform,
	View,
	Text
} from 'react-native'
import QRCode from 'react-native-qrcode'

import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		publicKey: state.publicKey,
		privateKey: state.privateKey,
		visibleKey: state.visibleKey
	}
}

class QR extends Component {
	render() {
		const { publicKey, privateKey, visibleKey } = this.props
		let address = (visibleKey == 'public') ? publicKey : privateKey
	

		if (!address)
			return (
				<View style={ styles.parent } >
					<Text style={ styles.text }>Set key first</Text>
				</View>
			)

		return (
			<View style={ styles.parent }>
				<View style={ styles.qrContainer }>
					<QRCode
						value={ address }
						size={ 200 }
						bgColor='#171F33'
						fgColor='ivory' >
					</QRCode>
				</View>
			</View>
		)
	}
}

export default connect(mapStateToProps, {})(QR)

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#586589'
	},

	qrContainer: {
		backgroundColor: 'ivory',
		padding: 10,
		borderWidth: 3,
		borderColor: '#171F33'
	},

	text: {
		fontSize: 20,
		fontFamily: (Platform.OS === 'ios' ? 'Courier' : 'monospace'),
		textAlign: 'center',
		flex: 1,
		textAlignVertical: 'center',
		color: 'ivory'
	},
})