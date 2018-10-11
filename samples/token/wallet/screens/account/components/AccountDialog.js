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

const mapStateToProps = state => {
	return { privateKey: state.privateKey }
}

class AccountDialog extends Component {
	state = { tmp: '' }

	save = this.save.bind(this)

	async save() {
		const { close, setPrivateKey } = this.props
		const { tmp } = this.state

		await setPrivateKey(tmp)
		close()
	}

	componentDidMount() {
		const { privateKey } = this.props

		this.setState({ tmp: privateKey })
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

export default connect(mapStateToProps, {})(AccountDialog)
