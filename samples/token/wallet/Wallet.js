import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	AsyncStorage
} from 'react-native'

import AddressScanner from './components/AddressScanner'
import { BaseNavigator } from './navigation'

import {
	connect
} from 'react-redux'

class Wallet extends Component {

	render() {
		return (
			<View style={styles.parent}>
				<BaseNavigator />
			</View>
		)
	}
}

export default connect(null, {})(Wallet)

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		backgroundColor: 'ivory',
		justifyContent: 'center'
	}
})
