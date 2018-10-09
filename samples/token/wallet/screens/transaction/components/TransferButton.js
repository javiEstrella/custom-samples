import React, { Component } from 'react'
import {
	ActivityIndicator,
	StyleSheet,
	View,
	Alert
} from 'react-native'

import { Button } from 'react-native-elements'

import { store } from '../../../App'
import Migrate from '../../../services/Migrate'

import {
	connect,
	dispatch
} from 'react-redux'

import { updateTokens } from '../../../redux/actions/updateTokens'

const mapStateToProps = state => {
	return {
		tokens: state.tokens,
		remoteAddress: state.remoteAddress,
		tokensToTransfer: state.tokensToTransfer,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateTokens: tokens => dispatch(updateTokens(tokens))
	}
}

class TransferButton extends Component {
	state = {
		wip: false
	}

	isDisabled = this.isDisabled.bind(this)
	transferConfirmation = this.transferConfirmation.bind(this)
	transfer = this.transfer.bind(this)

	async transfer() {
		const { remoteAddress, tokensToTransfer, tokens, updateTokens } = this.props

		const { privateKey, publicKey } = store.getState()

		this.setState({wip: true})
		let result = await Migrate.transfer(privateKey, remoteAddress, tokensToTransfer)
		let newTokens = tokens - Number(tokensToTransfer)
		updateTokens(newTokens)
		this.setState({wip: false})
	}

	async transferConfirmation() {
		const { remoteAddress, tokensToTransfer, tokens } = this.props
		Alert.alert(
			'Confirmation required',
			'Transfer ' + tokensToTransfer + ' pesetas to «' + remoteAddress + '»',
			[
				{text: 'Cancel', onPress: () => {}},
				{text: 'OK', onPress: () => this.transfer()}
			],
			{ cancelable: false }
		)
	}

	isDisabled() {
		const { remoteAddress, tokensToTransfer, tokens } = this.props

		let aux = Number(tokensToTransfer)
		return (!remoteAddress || isNaN(aux) || (aux <= 0) || (tokens < aux))
	}

	render() {
		let { wip } = this.state
		if (wip) {
			return (
				<View style={ styles.parent }>
					<ActivityIndicator size='large' color='ivory' />
				</View>
			)
		} else {
			return (
				<View style={ styles.parent }>
					<Button
						disabled={ this.isDisabled() }
						raised
						onPress={ () => this.transferConfirmation() }
						backgroundColor = '#171F33'
						title='TRANSFER' >
					</Button>
				</View>
			)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferButton)

const styles = StyleSheet.create({
	parent: {
		margin: 10,
		marginBottom: 0,
		flexDirection: 'row',
		justifyContent: 'center'
	},

	button: {
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
	}
})
