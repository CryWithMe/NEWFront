import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Image, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { apiRepository} from '../api/apiRepository';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import Logo from './Images/login_logo.png';

class Login extends React.Component{

    apiRepository = new apiRepository();

    state={
        username: '',
        password:'',
        id: '',
    };

    onSubmit(){

        console.log(this.state);
        this.apiRepository.login(this.state)
            .then(rep => {
                console.log(rep);
                if(rep.statusText === 'OK') {
                    this.props.navigation.navigate("Home", {
                        username: this.state.username,
                        password: this.state.password,
                        id: rep.data
            })}

            });
                
    }

    render() {
        return (
            
            
           <SafeAreaView style={styles.container}>
               <LinearGradient  colors={['#859a9b', 'white',]}>
            <ScrollView style={styles.scrollView}> 
            
            <View style={styles.otherStyle}>
            <Image style={styles.logo} source={Logo}></Image>
                <Text style={styles.textStyle}>Login</Text>
                <Text style={styles.textStyle}>Username</Text>
                <TextInput
                    autoCapitalize="none"
                    style={styles.inputStyle}
                    onChange={ e => this.setState({ username: e.target.value })}
                />
                <Text style={styles.textStyle}>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    style={styles.inputStyle}
                    onChange={ e => this.setState({ password: e.target.value })}
                />
                <TouchableOpacity title="Login" style={styles.buttonStyle} onPress={()=> this.onSubmit()}>
                    <Text style={styles.appButtonText}>Login</Text>
                    </TouchableOpacity>
                <Text style={styles.textStyle}>Don't Have an Account Yet?</Text>
                <TouchableOpacity title="Register" onPress={()=>this.props.navigation.navigate('Register')}>
                    <Text style={styles.router}>Register</Text>
                    </TouchableOpacity>
            </View>
            </ScrollView>
            </LinearGradient>
            </SafeAreaView>
            
            
        );_
    }

    componentDidMount() {
        this.apiRepository.getTest()
            .then(console.log("YO"));
    }
}

const styles = StyleSheet.create({

    appButtonText: {
        fontSize: 18,
        fontFamily:'Cochin',
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

      },

    buttonStyle:{
            backgroundColor:"#859a9b",
            borderRadius:10, 
            padding:2,
            margin:4,
            marginHorizontal:60,
    },
    inputStyle:{
        height:40,
        borderColor: 'gray', 
        borderWidth: 3,
        marginHorizontal:60,
        borderRadius:5,
    },
    textStyle: {
        marginHorizontal:60,
      fontSize: 20,
      fontFamily:'Cochin',
    },
    otherStyle: {
        marginVertical:180,
        flex:3,
      //backgroundColor: "#859a9b",
    },
    router:{
        //marginHorizontal:150,
        flex:6,
        textAlign:"center",
        fontSize: 30,
        fontFamily:'Cochin',
        color:"white",

    },
    container: {
        flex: 1,
       // marginTop: Constants.statusBarHeight,
      },
      scrollView: {
        marginHorizontal: 20,
      },
      logo: {
        width: 300,
        height: 300,
      },
      
  }
  );
export default Login; 
