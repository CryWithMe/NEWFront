import * as React from "react";
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert,Vibration, Platform } from 'react-native';

import {registerRootComponent, Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Landing from './app/Landing.js';
import Login from './app/Login.js';
import Register from './app/Register.js';
import Profile from './app/Profile.js';
import Friends from './app/Friends.js';
import FriendSearch from './app/FriendSearch.js';
import Settings from './app/Settings.js';
import EditProfile from './app/EditProfile.js';


const Stack = createStackNavigator(); 

const myTheme = {
	...DefaultTheme,
	colors: {
	  ...DefaultTheme.colors,
	  background: '#95afb4',
	},
  };

class App extends React.Component{

  state = {
    notification: {},
  };

  componentDidMount() {
    this._notificationSubscription = Notifications.addListener(this._handleNotification)
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
  }

  _handleNotification = notification => {
    this.setState({ notification })
  }

  render(){
    return(
		
      <NavigationContainer theme={myTheme}>
		  
 <Stack.Navigator initialRouteName="Login">
<Stack.Screen name="Home" component={Landing} options={{ headerShown: false }}/>
<Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
<Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
<Stack.Screen name="Friends" component={Friends} options={{ headerShown: false }}/>
<Stack.Screen name="FriendSearch" component={FriendSearch} options={{ headerShown: false }}/>
<Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
<Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
<Stack.Screen name="Edit-Profile" component={EditProfile} options={{ headerShown: false }}/>
</Stack.Navigator>
      </NavigationContainer>
	  
    )
  }
}export default App;


// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';

// export default class App extends Component {
// 	render() {
// 		return (
// 			<View style={styles.container}>
// 				<Text style={styles.instructions}>Hello World!</Text>
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#F5FCFF'
// 	},
// 	instructions: {
// 		textAlign: 'center',
// 		color: '#333333',
// 		marginBottom: 5
// 	}
// });