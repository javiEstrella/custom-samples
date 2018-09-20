import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	TouchableHighlight,
	Text
} from 'react-native'

import { store } from '../App'

import {
	connect,
	dispatch
} from 'react-redux'

import AccountDialog from './AccountDialog'
import Backend from '../services/Backend'
import Migrate from '../services/Migrate'

import { updateTokens } from '../redux/actions/updateTokens'

const mapDispatchToProps = dispatch => {
	return {
		updateTokens: tokens => dispatch(updateTokens(tokens))
	}
}

class Buttons extends Component {
	state = {
		accountDialogVisible: false
	}

	async refresh() {
		const { updateTokens } = this.props
		const { publicAddress, tokens } = store.getState()

		if (publicAddress) {
			let newTokens = await Migrate.obtainTokens(publicAddress)
			console.log(newTokens)
			if (newTokens != tokens) {
				updateTokens(newTokens)
			}
		}
	}

	render() {
		return (
			<View style={ styles.parent }>

				<TouchableHighlight
					onPress={ () => this.refresh() }
					style={ styles.touchable } >
					<Text style={ styles.buttonText }>Refresh</Text>
				</TouchableHighlight>

				<AccountDialog
					visible={ this.state.accountDialogVisible }
					close={ () => this.setState({accountDialogVisible: false}) } />

				<TouchableHighlight
					onPress={ () => this.setState({accountDialogVisible: true}) }
					style={ styles.touchable } >
					<Text style={ styles.buttonText }>Account</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

export default connect(null, mapDispatchToProps)(Buttons)

const styles = StyleSheet.create({
	parent: {
		margin: 10,
		marginBottom: 0,
		flexDirection: 'row',
		justifyContent: 'center'
	},

	touchable: {
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
	},

	buttonText: {
		textAlign: 'center',
		color: 'ivory'
	}
})
