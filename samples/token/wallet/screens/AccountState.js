import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'

import Balance from '../components/Balance'
import Dashboard from '../components/Dashboard'

export default class AccountState extends Component {
	render() {
		return (
			<View style={ styles.parent }>
				<View style={ styles.topContainer }>
					<Balance />
				</View>
	
				<View style={ styles.bottomContainer }>
					<Dashboard />
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	parent: {
		flex: 1
	},

	topContainer: {
		flex: 2
	},

	bottomContainer: {
		flex: 3
	}
})