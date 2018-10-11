import React, { Component } from 'react'
import {
	View,
	StyleSheet
} from 'react-native'

import AddressScanner from '../../components/AddressScanner'
import Key from './components/Key'
import Keys from './components/Keys'

import {
	connect
} from 'react-redux'

const mapStateToProps = state => {
	return { visibleAddressScanner: state.visibleAddressScanner }
}

class Account extends Component {
	render() {
		const { visibleAddressScanner } = this.props

		if (visibleAddressScanner) {
			return (<AddressScanner />)
		} else {
			return (
				<View style={ styles.parent }>
					<View style={ styles.topContainer }>
						<Key />
					</View>
		
					<View style={ styles.bottomContainer }>
						<Keys />
					</View>
				</View>
			)
		}
	}
}

export default connect(mapStateToProps, {})(Account)

const styles = StyleSheet.create({
	parent: {
		flex: 1
	},

	topContainer: {
		flex: 2
	},

	bottomContainer: {
		flex: 3
	}
})