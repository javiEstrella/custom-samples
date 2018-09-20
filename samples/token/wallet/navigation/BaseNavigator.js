import React from 'react';
import {
	createBottomTabNavigator,
	BottomTabBar
} from 'react-navigation'

import Icon from '@expo/vector-icons/FontAwesome'
import AccountState from '../screens/AccountState'
import Private from '../screens/Private'
import Bookmarks from '../screens/Bookmarks'
import Likes from '../screens/Likes'

const TabBarComponent = (props) => (<BottomTabBar {...props}></BottomTabBar>)

const BaseNavigator = createBottomTabNavigator({
	AccountState: {
		screen: AccountState,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
				<Icon color={tintColor} size={24} name='user' />
			)
		})
	},
	Private: {
		screen: Private,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
				<Icon color={tintColor} size={24} name='lock' />
			)
		})
	},
	Bookmarks: {
		screen: Bookmarks,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
				<Icon color={tintColor} size={24} name='bookmark' />
			)
		})
	},
	Likes: {
		screen: Likes,
		navigationOptions: () => ({
			tabBarIcon: ({tintColor}) => (
				<Icon color={tintColor} size={24} name='heart' />
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
