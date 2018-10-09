import React from 'react';
import {
	createBottomTabNavigator,
	BottomTabBar
} from 'react-navigation'

import Icon from '@expo/vector-icons/FontAwesome'

import Account from '../screens/account/Account'
import Transactions from '../screens/transactions/Transactions'
import Transaction from '../screens/transaction/Transaction'

const TabBarComponent = (props) => (<BottomTabBar {...props}></BottomTabBar>)

const BaseNavigator = createBottomTabNavigator({

	Account: {
		screen: Account,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
				<Icon color={tintColor} size={24} name='user' />
			)
		})
	},

	Transactions: {
		screen: Transactions,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
				<Icon color={tintColor} size={24} name='exchange' />
			)
		})
	},

	Transaction: {
		screen: Transaction,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
				<Icon color={tintColor} size={24} name='arrow-right' />
			)
		})
	}

	}, {
		tabBarOptions: {
			showLabel: false,
			activeTintColor: 'ivory',
			inactiveTintColor: '#586589',
			style: {
				backgroundColor: '#171F33'
			},
			tabStyle: {}
		}
	}
)

const defaultGetStateForAction = BaseNavigator.router.getStateForAction

export { BaseNavigator }
