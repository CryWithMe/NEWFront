import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { apiRepository} from '../api/apiRepository';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
class Login extends React.Component{

    apiRepository = new apiRepository();

    state={
        username: '',
        password:'',
    };

    onSubmit(){

        this.apiRepository.login(this.state)
            .then(rep => {
                console.log(rep);
                if(rep === 'OK') {
                    this.props.navigation.navigate("Home", {
                        username: this.state.username,
                        password: this.state.password},
                    )}

            });
                



    }

    render() {
        return (
            <View style={styles.otherStyle}>
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
        );_
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
        marginVertical:80,
        flex:3,
      //backgroundColor: "#859a9b",
    },
    router:{
        marginHorizontal:150,
        fontSize: 30,
        fontFamily:'Cochin',
        color:"white",

    },
  }
  );
export default Login; 
