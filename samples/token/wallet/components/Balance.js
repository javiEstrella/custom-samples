import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class Balance extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.parent}>
				<Text style={styles.balanceText}>{this.props.balance}</Text>
				<Text style={styles.tokenText}>{this.props.token}</Text>
			</View>
		)
	}
}

Balance.defaultProps = {
	balance: '0',
	token: 'Pts'
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'ivory'
	},

	balanceText: {
		fontSize: 35,
		padding: 2,
		color: 'black'
	},

	tokenText: {
		fontSize: 35,
		padding: 2,
		fontWeight: 'bold',
		color: 'black'
	}
})