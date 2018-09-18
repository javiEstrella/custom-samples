import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	StyleSheet,
	View,
	Text
} from 'react-native'

import Buttons from './Buttons'

export default class Dashboard extends Component {
	render() {
		return (
			<View style={styles.parent}>
				<Buttons />
				<Text style={styles.content}>{this.props.content}</Text>
			</View>
		)
	}
}

Dashboard.propTypes = {
	content: PropTypes.string
}

Dashboard.defaultProps = {
	content: 'TODO Transaction list'
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