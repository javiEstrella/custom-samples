import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text
} from 'react-native'

import Buttons from './Buttons'

export default class Dashboard extends Component {
	render() {
		const { content } = this.props

		return (
			<View style={ styles.parent }>
				<Buttons />
				<Text style={styles.content}>{ content }</Text>
			</View>
		)
	}
}

Dashboard.defaultProps = {
	content: 'TODO Transaction list'
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