import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	StyleSheet,
	View,
	Alert,
	AsyncStorage
} from 'react-native'

import Balance from './components/Balance'
import Dashboard from './components/Dashboard'
import dependencies from './config/dependencies'
import Keys from './config/keys'

import Crypto from './services/crypto'
import Backend from './services/backend'

export default class App extends Component {
	state = {
		privateAddress: null
	}

	populateState = this.populateState.bind(this)
	setPrivateAddress = this.setPrivateAddress.bind(this)

	getChildContext() {
		return dependencies
	}

	async componentWillMount() {
		await this.readConfig()
		this.populateState()
	}

	async readConfig() {
		dependencies.storage = AsyncStorage
		dependencies.register(Keys.symbol, 'Pesetas')
		dependencies.register(Keys.setPrivateAddress, this.setPrivateAddress)
		await dependencies.load(Keys.privateAddress, '')
	}

	populateState() {
		let address = dependencies.get(Keys.privateAddress)
		this.setPrivateAddress(address)
	}

	async setPrivateAddress(address) {
		let tokens = await this.obtainTokens(address)
		this.setState({
			tokens: tokens,
			privateAddress: address
		})
	}

	async obtainTokens(address) {
		let tokens = 0
		if (address != null) {
			let publicAddress = await Crypto.getPublic(address)
			tokens = await Backend.query(publicAddress)
			tokens = Number((tokens != null) ? tokens.value : 0)
		}
		return tokens
	}

	render() {
		return (
			<View style={styles.parent}>
				<View style={styles.topContainer}>
					<Balance tokens = {this.state.tokens} />
				</View>

				<View style={styles.bottomContainer}>
					<Dashboard />
				</View>
			</View>
		);
	}
}

App.childContextTypes = {
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
		flex: 1
	},

	topContainer: {
		flex: 2
	},

	bottomContainer: {
		flex: 3
	}
})
