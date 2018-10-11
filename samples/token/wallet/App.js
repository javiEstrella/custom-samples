import React, { Component } from 'react'
import Wallet from './Wallet'
import { Provider } from 'react-redux'
import {
	Text,
	AppState,
	AsyncStorage
} from 'react-native'

import {
	applyMiddleware,
	createStore
} from 'redux'

import {
	Camera,
	Permissions
} from 'expo'

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
const loggerMiddleware = createLogger({})
const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware)

import reducer from './redux/Reducer'
export const store = createStore(reducer, middleware)

// Adapted from https://medium.com/@sumitkushwaha/syncing-redux-store-with-asyncstorage-in-react-native-2b8b890b9ca1
class App extends Component {
	state = {
		isStoreLoading: false,
		store: store
	}

	componentWillMount() {
		var self = this
		AppState.addEventListener('change', this._handleAppStateChange.bind(this))
		this.setState({isStoreLoading: true})
		AsyncStorage.getItem('completeStore')
		.then((value) => {
			if (value && value.length) {
				let initialStore = JSON.parse(value)
				self.setState({
					store: createStore(reducers, initialStore, middleware),
					isStoreLoading: false
				})
			} else {
				self.setState({
					store: store,
					isStoreLoading: false
				})
			}
		}).catch((error) => {
			self.setState({
				store: store,
				isStoreLoading: false
			})
		})
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange.bind(this))
	}

	_handleAppStateChange(currentAppState) {
		let storingValue = JSON.stringify(this.state.store.getState())
		AsyncStorage.setItem('completeStore', storingValue)
	}

	render() {
		if (this.state.isStoreLoading) {
			return <Text>Loading store ...</Text>
		} else {
			return (
				<Provider store={this.state.store}>
					<Wallet />
				</Provider>
			)
					
		}
	}
}

export default App