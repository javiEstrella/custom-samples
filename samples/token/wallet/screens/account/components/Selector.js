import React, { Component } from 'react'
import {
	StyleSheet
} from 'react-native'

import { store } from '../../../App'

import {
	connect,
	dispatch
} from 'react-redux'

import SwitchSelector from '../../../components/SwitchSelector'

import { updateVisibleKey } from '../../../redux/actions/updateVisibleKey'

const mapStateToProps = state => {
	return {
		visibleKey: state.visibleKey
	}
}
const mapDispatchToProps = dispatch => {
	return {
		updateVisibleKey: visibleKey => dispatch(updateVisibleKey(visibleKey))
	}
}

class Selector extends Component {
	render() {
		const { visibleKey, updateVisibleKey } = this.props
		const initial = (visibleKey == 'public') ? 0 : 1

		return (
			<SwitchSelector style={ styles.parent }
				initial={ initial }
				onPress={ updateVisibleKey }
				textColor={'#586589'} //
				selectedColor={'ivory'}
				buttonColor={'#586589'}
				borderColor={'ivory'}
				hasPadding
				options={[
					{ label: 'public', value: 'public'},
					{ label: 'private', value: 'private'}
				]} />
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector)

const styles = StyleSheet.create({
	parent: {
		margin: 10,
		marginBottom: 0,
		flexDirection: 'row',
		justifyContent: 'center'
	}
})
