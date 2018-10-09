import React, { Component } from 'react'
import {
	StyleSheet,
	Platform,
	View,
	Text
} from 'react-native'

import { connect } from 'react-redux'

import PrivateKeySetter from './PrivateKeySetter'

const mapStateToProps = state => {
	return {
		publicKey: state.publicKey,
		privateKey: state.privateKey,
		visibleKey: state.visibleKey
	}
}
class Key extends Component {
	render() {
		const { publicKey, privateKey, visibleKey } = this.props
		let address = (visibleKey == 'public') ? publicKey : privateKey
	
		const content = (address) ? address : 'undefined key'
		var style = (address) ? [styles.text] : [styles.text, styles.undefinedKey]

		if (visibleKey == 'public') {
			return (
				<View style={ styles.parent }>
					<Text style={ style }>{ content }</Text>
				</View>
			)
		} else {
			return (
				<View style={ styles.parent }>
					<Text style={ style }>{ content }</Text>
					<PrivateKeySetter />
				</View>
			)
		}
	}
}

export default connect(mapStateToProps, {})(Key)

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#586589',
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
	},

	text: {
		fontSize: 14,
		borderWidth: 1,
		fontFamily: (Platform.OS === 'ios' ? 'Courier' : 'monospace'),
		textAlign: 'center',
		borderColor: 'ivory',
		backgroundColor: 'ivory',
		borderRadius: 50,
		padding: 20,
		margin: 3,
		flex: 1,
		height: 75,
		textAlignVertical: 'center',
		color: '#586589'
	},

	undefinedKey: {
		color: 'gray'
	}
})