import React, { Component } from 'react'
import {
	View,
	StyleSheet
} from 'react-native'

import Key from './components/Key'
import Keys from './components/Keys'

export default class Account extends Component {
	render() {
		return (
			<View style={ styles.parent }>
				<View style={ styles.topContainer }>
					<Key />
				</View>
	
				<View style={ styles.bottomContainer }>
					<Keys />
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