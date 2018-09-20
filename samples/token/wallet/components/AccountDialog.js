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
import { updateAddress } from '../redux/actions/updateAddress'
import { updateTokens } from '../redux/actions/updateTokens'

import Migrate from '../services/Migrate'

const mapStateToProps = state => {
	return { privateAddress: state.privateAddress }
}

const mapDispatchToProps = dispatch => {
	return {
		updateAddress: privateAddress => dispatch(updateAddress(privateAddress)),
		updateTokens: tokens => dispatch(updateTokens(tokens))
	}
}

class AccountDialog extends Component {
	state = { tmp: '' }

	save = this.save.bind(this)

	async save() {
		const { updateAddress, updateTokens, close } = this.props
		const { tmp } = this.state

		updateAddress(tmp)

		// Migrate to thunk
		let tokens = await Migrate.obtainTokens(tmp)
		updateTokens(tokens)

		close()
	}

	componentDidMount() {
		this.setState({ tmp: this.state.privateAddress })
	}

	render() {
		const { visible, close } = this.props
		const { tmp } = this.state

		return (
			<View>
				<Dialog.Container visible={ visible }>
					<Dialog.Title>Private address</Dialog.Title>
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
