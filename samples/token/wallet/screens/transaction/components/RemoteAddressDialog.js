import React, { Component } from 'react'
import {
	Text,
	TouchableOpacity,
	View,
	AsyncStorage,
	Alert
} from 'react-native'

import {
	connect
} from 'react-redux'

import Dialog from 'react-native-dialog'
import { updateRemoteAddress } from '../../../redux/actions/updateRemoteAddress'

const mapStateToProps = state => {
	return { remoteAddress: state.remoteAddress }
}

class RemoteAddressDialog extends Component {
	state = { tmp: '' }

	save = this.save.bind(this)

	async save() {
		const { updateRemoteAddress, close } = this.props
		const { tmp } = this.state

		updateRemoteAddress(tmp)
		close()
	}

	componentDidMount() {
		const { remoteAddress } = this.props

		this.setState({ tmp: remoteAddress })
	}

	render() {
		const { visible, close } = this.props
		const { tmp } = this.state

		return (
			<View>
				<Dialog.Container visible={ visible }>
					<Dialog.Title>Remote address</Dialog.Title>
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

export default connect(mapStateToProps, {})(RemoteAddressDialog)
