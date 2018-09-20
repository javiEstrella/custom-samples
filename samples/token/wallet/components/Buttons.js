import React, { Component } from 'react'

import {
	StyleSheet,
	View,
	TouchableHighlight,
	Text
} from 'react-native'

import AccountDialog from './AccountDialog'
import Backend from '../services/Backend'

export default class Buttons extends Component {
	state = {
		accountDialogVisible: false
	}

	refresh() {
		// TODO Update address invokes token update
	}

	render() {
		return (
			<View style={ styles.parent }>

				<TouchableHighlight
					onPress={ () => this.refresh() }
					style={ styles.touchable } >
					<Text style={ styles.buttonText }>Refresh</Text>
				</TouchableHighlight>

				<AccountDialog
					visible={ this.state.accountDialogVisible }
					close={ () => this.setState({accountDialogVisible: false}) } />

				<TouchableHighlight
					onPress={ () => this.setState({accountDialogVisible: true}) }
					style={ styles.touchable } >
					<Text style={ styles.buttonText }>Account</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	parent: {
		margin: 20,
		flexDirection: 'row',
		justifyContent: 'center'
	},

	touchable: {
		marginRight: 20,
		marginLeft: 20,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#586589',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'ivory'
	},

	buttonText: {
		textAlign: 'center',
		color: 'ivory'
	}
})
