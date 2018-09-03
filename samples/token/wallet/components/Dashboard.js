import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import Buttons from './Buttons'

export default class Dashboard extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.parent}>
				<Buttons />
				<Text style={styles.content}>{this.props.content}</Text>
			</View>
		)
	}
}

Dashboard.defaultProps = {
	content: 'Work In Progress'
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		backgroundColor: 'black',
	},

	content: {
		flex: 1,
		color: 'ivory',
		textAlign: 'center',
		justifyContent: 'center'
	}
})