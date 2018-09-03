import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight, Text, Alert } from 'react-native'
import Config from '../config'

export default class Buttons extends Component {
	constructor(props) {
		super(props)

		this.gateway = this.gateway.bind(this)
	}

	check() {
		let host = Config.BACKEND_URL + ':' + Config.BACKEND_PORT
		fetch(host + '/ping')
			.then((response) => response.json())
			.then((result) => Alert.alert(result.error || ('Connected to ' + host)))
	}

	gateway(button) {
		switch(button) {
			case 'check' :
				this.check()
				break
					
			default:
				Alert.alert('You tapped ' + button)
				break
		}
	}

	render() {
		return (
			<View style={styles.parent}>
				<TouchableHighlight onPress={() => this.gateway('check')} style={styles.touchable} >
					<Text style={styles.buttonText}>Check connection</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => this.gateway('other')} style={styles.touchable} >
					<Text style={styles.buttonText}>Other</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	parent: {
		margin: 20,
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
	    backgroundColor: 'black',
	    borderRadius: 10,
	    borderWidth: 1,
	    borderColor: 'ivory'
	},

	buttonText: {
		textAlign: 'center',
		color: 'ivory'
	}
})