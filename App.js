import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert,Vibration, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
//import ApiKeys from './constants/ApiKeys';

import { apiRepository} from './api/apiRepository';
import Landing from './app/Landing.js';
import Login from './app/Login.js';
import Register from './app/Register.js';
import Profile from './app/Profile.js';
import Friends from './app/Friends.js';
import FriendSearch from './app/FriendSearch.js';
import Settings from './app/Settings.js';
import EditProfile from './app/EditProfile.js';
import FriendProfile from './app/FriendProfile.js'

const Stack = createStackNavigator(); 

const myTheme = {
	...DefaultTheme,
	colors: {
	  ...DefaultTheme.colors,
	  background: 'white',
	},
  };

  
  //if(!firebase.apps.length){firebase.initializeApp();}

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: false,
  //     shouldSetBadge: false,
  //   }),
  // });

 
class App extends React.Component{


  apiRepository = new apiRepository();

  state = {
    notification: {},
  };

  componentDidMount(){
    this.registerForPushNotifications();
  }

//useEffect(() => {
    //   (()=> registerForPushNotificationsAsync())();
    // }, [] );

  // giveMeTheToken(){
  //   this.apiRepository.postToken({accountId, token});
  // }

  registerForPushNotifications = async() => {
    //check for existing permissions

    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        //alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    console.log(token);

    
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref("users").child(uid).update({
        expoPushToken:token
    });
    return token;
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
<Stack.Screen name="FriendProfile" component={FriendProfile} options={{ headerShown: false }}/>
</Stack.Navigator>
      </NavigationContainer>
    
    );
  }

  

}export default App;
