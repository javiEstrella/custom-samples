import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	AsyncStorage
} from 'react-native'

import { BaseNavigator } from './navigation'

export default class Wallet extends Component {
	render() {
		return (
			<View style={styles.parent}>
				<BaseNavigator />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		backgroundColor: 'ivory',
		justifyContent: 'center'
	}
})
