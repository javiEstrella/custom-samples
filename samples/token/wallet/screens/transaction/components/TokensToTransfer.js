import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	TextInput
} from 'react-native'

import {
	connect,
	dispatch
} from 'react-redux'

import { updateTokensToTransfer } from '../../../redux/actions/updateTokensToTransfer'

const mapStateToProps = state => {
	return {
		tokensToTransfer: state.tokensToTransfer
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateTokensToTransfer: tokensToTransfer => dispatch(updateTokensToTransfer(tokensToTransfer))
	}
}

class TokensToTransfer extends Component {
	render() {
		const { tokensToTransfer, updateTokensToTransfer } = this.props

		return (
			<TextInput
				style={ styles.textInput }
				onChangeText={tokensToTransfer => updateTokensToTransfer(tokensToTransfer)}
				keyboardType={ 'numeric' }
				value={ tokensToTransfer }>
			</TextInput>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TokensToTransfer)

const styles = StyleSheet.create({
	textInput: {
		fontSize: 50,
		color: 'ivory'
	},
})