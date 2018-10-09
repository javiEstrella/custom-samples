import React, { Component } from 'react'
import {
	StyleSheet,
	View
} from 'react-native'

import Selector from './Selector'
import QR from './QR'

export default class Keys extends Component {
	render() {
		return (
			<View style={ styles.parent }>
				<Selector />
				<QR />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		backgroundColor: '#586589'
	}
})