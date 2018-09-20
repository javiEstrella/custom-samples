import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text
} from 'react-native'
import QRCode from 'react-native-qrcode'

import { connect } from 'react-redux'

import Migrate from '../services/Migrate'

const mapStateToProps = state => {
	return { publicAddress: state.publicAddress }
}

class PublicAccount extends Component {
	render() {
		let { publicAddress } = this.props

		if (!publicAddress) return (<View style={ styles.parent } />)

		return (
			<View style={ styles.parent }>
				<QRCode
					value={ publicAddress }
					size={ 175 }
					bgColor='ivory'
					fgColor='#586589' />
				<Text style={ styles.text }>{ publicAddress }</Text>
			</View>
		)
	}
}

export default connect(mapStateToProps, {})(PublicAccount)

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#586589'
	},

	text: {
		fontSize: 15,
		borderWidth: 1,
		textAlign: 'center',
		borderColor: 'ivory',
		alignSelf: 'stretch',
		padding: 2,
		marginTop: 15,
		marginLeft: 45,
		marginRight: 45,
		color: 'ivory'
	}
})