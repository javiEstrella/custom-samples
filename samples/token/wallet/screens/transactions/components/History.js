import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	Platform,
	RefreshControl
} from 'react-native'

import { List, ListItem } from 'react-native-elements'

import { store } from '../../../App'

import {
	connect,
	dispatch
} from 'react-redux'

import Migrate from '../../../services/Migrate'

import { updateTokens } from '../../../redux/actions/updateTokens'

const mapStateToProps = state => {
	return { transactions: state.transactions }
}

const mapDispatchToProps = dispatch => {
	return {
		updateTokens: tokens => dispatch(updateTokens(tokens))
	}
}

class History extends Component {
	state = {
		refreshing: false
	}

	refresh = this.refresh.bind(this)

	async refresh() {
		this.setState({ refreshing: true })

		const { updateTokens } = this.props
		const { publicKey, tokens } = store.getState()

		const newTokens = await Migrate.obtainTokens(publicKey)
		if (publicKey) {
			if (newTokens != tokens) {
				updateTokens(newTokens)
			}
		}
		this.setState({ refreshing: false })
	}

	render() {
		const { transactions } = this.props
		const { refreshing } = this.state

		return (
			<View style={ styles.parent }>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={ refreshing }
							onRefresh={ this.refresh }
						/>
					}>
					<List containerStyle={ styles.list }>
						{
							transactions.map((transaction) => (
								<ListItem
									key={ transaction.id }
									hideChevron={ true }
									underlayColor={ 'red' }
									title=
									{
										<View style={((transaction.id == '1') ? [styles.itemView, styles.itemViewFirst] : [styles.itemView])}>
											<Text style={ styles.itemText }>5 months ago</Text>
										</View>
									}>
								</ListItem>
							))
						}
					</List>
				</ScrollView>
			</View>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(History)

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		backgroundColor: '#586589'
	},

	list: {
		backgroundColor: '#586589',
		borderTopWidth: 0,
		borderBottomColor: 'gray'
	},

	itemView: {
		flexDirection: 'row',
		paddingTop: 15,
		paddingBottom: 15
	},

	itemViewFirst: {
		paddingTop: 0
	},

	itemText: {
		color: 'ivory',
		fontSize: 15
	}
})