import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Platform
} from 'react-native'

import { Slider } from 'react-native-elements'

import TokensToTransfer from './components/TokensToTransfer'
import RemoteAddress from './components/RemoteAddress'
import TransferButton from './components/TransferButton'

export default class Transaction extends Component {
	render() {
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