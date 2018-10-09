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

import AccountDialog from './AccountDialog'

class PrivateKeySetter extends Component {
	state = {
		accountDialogVisible: false
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
					onPress={ () => this.setState({accountDialogVisible: true}) }>
				</Icon>

				<AccountDialog
					visible={ this.state.accountDialogVisible }
					close={ () => this.setState({accountDialogVisible: false}) } />
			</View>
		)
	}
}

export default connect(null, {})(PrivateKeySetter)

const styles = StyleSheet.create({
	parent: {
		margin: 0,
		flexDirection: 'column',
		justifyContent: 'center'
	}
})
