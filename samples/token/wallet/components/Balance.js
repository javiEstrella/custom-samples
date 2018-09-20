import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text
} from 'react-native'

import { connect } from 'react-redux'

const mapStateToProps = state => {
	return { tokens: state.tokens }
}

class Balance extends Component {
	render() {
		const { tokens } = this.props

		return (
			<View style={styles.parent}>
				<Text style={styles.text}>{ tokens }</Text>
				<Text style={[styles.text, styles.weight]}>Pesetas</Text>
			</View>
		)
	}
}

export default connect(mapStateToProps, {})(Balance)

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'ivory'
	},

	text: {
		fontSize: 35,
		padding: 2,
		color: '#171F33'
	},

	weight: {
		fontWeight: 'bold'
	}
})