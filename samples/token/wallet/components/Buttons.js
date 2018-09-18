import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	StyleSheet,
	View,
	TouchableHighlight,
	Text,
	Alert,
	AsyncStorage
} from 'react-native'

import AccountDialog from './AccountDialog'
import Config from '../config/config'
import Keys from '../config/keys'

import Backend from '../services/backend'

/**
 * Buttons bar
 */
export default class Buttons extends Component {
	state = {
		privateAddress: null,
		accountDialogVisible: false
	}

	showAccountDialog = this.showAccountDialog.bind(this)
	hideAccountDialog = this.hideAccountDialog.bind(this)
	gateway = this.gateway.bind(this)

	async refresh() {
		await this.context.get(Keys.setPrivateAddress)(this.context.get(Keys.privateAddress))
	}

	showAccountDialog() {
		this.setState({ accountDialogVisible: true })
	}

	hideAccountDialog() {
		this.setState({ accountDialogVisible: false })
	}

	async getPrivateAddress() {
		try {
			let value = await AsyncStorage.getItem('@Token:privateAddress')
			this.setState({privateAddress: value})
		} catch (error) {
			Alert.alert('Error retrieving private address')
		}
	}

	async savePrivateAddress(value) {
		try {
			await AsyncStorage.setItem('@Token:privateAddress', value)
		} catch (error) {
			Alert.alert('Error saving private address')
		}
	}

	async removePrivateAddress(value) {
		try {
			await AsyncStorage.removeItem('@Token:privateAddress')
			let value = await AsyncStorage.getItem('@Token:privateAddress')
			this.setState({privateAddress: value})
		} catch (error) {
			Alert.alert('Error removing private address')
		}
	}

	gateway(button) {
		switch(button) {
			case 'refresh' :
				this.refresh()
				break

			case 'account' :
				this.showAccountDialog()
				break

			default:
				Alert.alert('You tapped ' + button)
				break
		}
	}

	render() {
		return (
			<View style={styles.parent}>

				<TouchableHighlight onPress={() => this.gateway('account')} style={styles.touchable} >
					<Text style={styles.buttonText}>Account</Text>
				</TouchableHighlight>

				<AccountDialog visible = {this.state.accountDialogVisible} close={this.hideAccountDialog}></AccountDialog>

				<TouchableHighlight onPress={() => this.gateway('refresh')} style={styles.touchable} >
					<Text style={styles.buttonText}>Refresh</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

Buttons.contextTypes = {
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
		backgroundColor: 'black',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'ivory'
	},

	buttonText: {
		textAlign: 'center',
		color: 'ivory'
	}
})
