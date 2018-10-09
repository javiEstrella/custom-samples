import React, { Component } from 'react'
import {
	Text,
	TouchableOpacity,
	View,
	AsyncStorage,
	Alert
} from 'react-native'

import {
	connect,
	dispatch
} from 'react-redux'

import Dialog from 'react-native-dialog'
import { updatePrivateKey } from '../../../redux/actions/updatePrivateKey'
import { updatePublicKey } from '../../../redux/actions/updatePublicKey'
import { updateTokens } from '../../../redux/actions/updateTokens'

import Migrate from '../../../services/Migrate'

const mapStateToProps = state => {
	return { privateKey: state.privateKey }
}

const mapDispatchToProps = dispatch => {
	return {
		updatePrivateKey: privateKey=> dispatch(updatePrivateKey(privateKey)),
		updatePublicKey: publicKey => dispatch(updatePublicKey(publicKey)),
		updateTokens: tokens => dispatch(updateTokens(tokens))
	}
}

class AccountDialog extends Component {
	state = { tmp: '' }

	save = this.save.bind(this)

	async save() {
		const { updatePrivateKey, updatePublicKey, updateTokens, close } = this.props
		const { tmp } = this.state

		updatePrivateKey(tmp)

		// Migrate to thunk
		let publicKey = await Migrate.obtainPublic(tmp)
		updatePublicKey(publicKey)

		// Migrate to thunk
		let tokens = await Migrate.obtainTokens(publicKey)
		updateTokens(tokens)

		close()
	}

	componentDidMount() {
		this.setState({ tmp: this.state.privateKey })
	}

	render() {
		const { visible, close } = this.props
		const { tmp } = this.state

		return (
			<View>
				<Dialog.Container visible={ visible }>
					<Dialog.Title>Private key</Dialog.Title>
					<Dialog.Input
						autocapitalize='none'
						value={ tmp }
						onChangeText={ (value) => this.setState({tmp: value}) } />
					<Dialog.Button label='Save'	onPress={ this.save } />
					<Dialog.Button label='Cancel' onPress={ close } />
				</Dialog.Container>
			</View>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDialog)
