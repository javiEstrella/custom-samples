import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text
} from 'react-native'

import Buttons from './Buttons'
import PublicAccount from './PublicAccount'

export default class Dashboard extends Component {
	render() {
		const { content } = this.props

		return (
			<View style={ styles.parent }>
				<Buttons />
				<PublicAccount />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		backgroundColor: '#586589'
	},

	content: {
		flex: 1,
		color: 'ivory',
		textAlign: 'center',
		justifyContent: 'center'
	}
})