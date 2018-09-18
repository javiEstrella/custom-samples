import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	Text,
	TouchableOpacity,
	View,
	AsyncStorage,
	Alert
} from 'react-native'

import Dialog from 'react-native-dialog'
import Config from '../config/config'
import Keys from '../config/keys'
import Crypto from '../services/crypto'

export default class AccountDialog extends Component {
	state = {address: null}

	save = this.save.bind(this)
	hide = this.hide.bind(this)
	syncText = this.syncText.bind(this)

	async save() {
		await this.context.register(Keys.privateAddress, this.state.address)
		await this.context.save(Keys.privateAddress)
		await this.context.get(Keys.setPrivateAddress)(this.state.address)
		this.hide()
	}

	async hide() {
		this.props.close()
		await this.syncText()
	}

	async syncText() {
		let address = await this.context.get(Keys.privateAddress)
		this.setState({address: address})
	}

	async componentDidMount() {
		let address = await this.context.read(Keys.privateAddress)
		this.setState({address: address})
	}

	render() {
		return (
			<View>
				<Dialog.Container visible={this.props.visible}>
					<Dialog.Title>Private address</Dialog.Title>
					<Dialog.Input autocapitalize="none" value={ this.state.address } onChangeText={(value) => this.setState({address: value})}></Dialog.Input>
					<Dialog.Button label='Save' onPress={this.save}></Dialog.Button>
					<Dialog.Button label='Cancel' onPress={this.hide}></Dialog.Button>
				</Dialog.Container>
			</View>
		)
	}
}

AccountDialog.propTypes = {
	visible: PropTypes.bool,
	close: PropTypes.func
}

AccountDialog.defaultProps = {
	visible: false
}

AccountDialog.contextTypes = {
	storage: PropTypes.object,
	data: PropTypes.object,
	get: PropTypes.func,
	register: PropTypes.func,
	load: PropTypes.func,
	read: PropTypes.func,
	save: PropTypes.func
}
