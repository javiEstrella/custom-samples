import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	StyleSheet,
	View,
	Text
} from 'react-native'

import Keys from '../config/keys'

export default class Balance extends Component {
	render() {
		return (
			<View style={styles.parent}>
				<Text style={styles.tokensText}>{ this.props.tokens }</Text>
				<Text style={styles.symbolText}>{ this.context.get(Keys.symbol) }</Text>
			</View>
		)
	}
}

Balance.propTypes = {
	tokens: PropTypes.number
}

Balance.defaultProps = {
	tokens: 0
}

Balance.contextTypes = {
	storage: PropTypes.object,
	data: PropTypes.object,
	get: PropTypes.func,
	register: PropTypes.func,
	load: PropTypes.func,
	read: PropTypes.func,
	save: PropTypes.func
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'ivory'
	},

	tokensText: {
		fontSize: 35,
		padding: 2,
		color: 'black'
	},

	symbolText: {
		fontSize: 35,
		padding: 2,
		fontWeight: 'bold',
		color: 'black'
	}
})