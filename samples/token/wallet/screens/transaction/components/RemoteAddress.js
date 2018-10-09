import React, { Component } from 'react'
import {
	StyleSheet,
	Platform,
	View,
	Text
} from 'react-native'

import { connect } from 'react-redux'

import RemoteAddressSetter from './RemoteAddressSetter'

const mapStateToProps = state => {
	return {
		remoteAddress: state.remoteAddress
	}
}
class RemoteAddress extends Component {
	render() {
		const { remoteAddress } = this.props
	
		const content = (remoteAddress) ? remoteAddress : 'undefined'
		var style = (remoteAddress) ? [styles.text] : [styles.text, styles.undefinedKey]

		return (
			<View style={ styles.parent }>
				<Text style={ style }>{ content }</Text>
				<RemoteAddressSetter />
			</View>
		)
	}
}

export default connect(mapStateToProps, {})(RemoteAddress)

const styles = StyleSheet.create({
	parent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#586589',
		padding: 10,
		paddingLeft: 40,
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