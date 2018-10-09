import React, { Component } from 'react'
import {
	StyleSheet,
	View
} from 'react-native'

import { Icon } from 'react-native-elements'

import {
	connect,
	dispatch
} from 'react-redux'

import RemoteAddressDialog from './RemoteAddressDialog'

class RemoteAddressSetter extends Component {
	state = {
		remoteAddressDialogVisible: false
	}

	render() {
		return (
			<View style={ styles.parent }>
				<Icon name='camera'
					color='ivory'
					onPress={ () => console.log('TO-DO') }>
				</Icon>
							
				<Icon name='keyboard'
					color='ivory'
					onPress={ () => this.setState({remoteAddressDialogVisible: true}) }>
				</Icon>

				<RemoteAddressDialog
					visible={ this.state.remoteAddressDialogVisible }
					close={ () => this.setState({remoteAddressDialogVisible: false}) } />
			</View>
		)
	}
}

export default connect(null, {})(RemoteAddressSetter)

const styles = StyleSheet.create({
	parent: {
		margin: 0,
		flexDirection: 'column',
		justifyContent: 'center'
	}
})
