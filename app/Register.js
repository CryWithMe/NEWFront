import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, TouchableOpacity, Text, Image, TextInput, ScrollView, Alert } from 'react-native';
import { apiRepository} from '../api/apiRepository';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from './Images/login_logo.png';

class Register extends React.Component{

    apiRepository = new apiRepository();

    state={
        email:'',
        username: '',
        password:'',
        fname:'',
        lname:'',
        pass_confirm:'',
        fname:'',
        lname:'',
    };

    onSubmit(){
        console.log(this.state);

        if(this.state.password!=this.state.pass_confirm){
            window.alert("Oops! you're passwords don't match!");
        }
        else if(this.state.email  == "" || this.state.username  == "" || this.state.password == "" || this.state.fname == ""|| this.state.lname == ""){
            window.alert("Please fill out all fields");
        }
        else {
            this.apiRepository.registerUser(this.state)
                .then(rep => {
                    if(rep === "OK"){
                        console.log('Great Success!');
                    }
                })
        }



    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
               <LinearGradient  colors={['#859a9b', 'white',]}>
            <ScrollView style={styles.scrollView}> 
            <View style={styles.otherStyle}>
                <Image style={styles.logo} source={Logo}></Image>
                <Text style={styles.textStyle}>
                    Register
                </Text>
                <Text style={styles.textStyle}>Email</Text>
                <TextInput
                    autoCapitalize="none"
                    style={styles.inputStyle}
                    onChange={ e => this.setState({ email: e.target.value })}
                />

                <Text style={styles.textStyle}>UserName</Text>

                <TextInput
                    autoCapitalize="none"
                    style={styles.inputStyle}
                    onChange={ e => this.setState({ username: e.target.value })}

                />
                <Text style={styles.textStyle}>Password</Text>
                <TextInput
                    autoCapitalize="none"
                    style={styles.inputStyle}
                    secureTextEntry={true}
                    onChange={ e => this.setState({ password: e.target.value })}
                />
                 <Text style={styles.textStyle}>Confirm Password</Text>
                <TextInput
                    autoCapitalize="none"
                    secureTextEntry={true}
                    style={styles.inputStyle}
                    onChange={ e => this.setState({ pass_confirm: e.target.value })}
                />

                <Text style={styles.textStyle}>First Name</Text>
                <TextInput
                    autoCapitalize="none"
                    style={styles.inputStyle}
                    onChange={ e => this.setState({ fname: e.target.value })}
                />
                <Text style={styles.textStyle}>Last Name</Text>
                <TextInput
                    autoCapitalize="none"
                    style={styles.inputStyle}
                    onChange={ e => this.setState({ lname: e.target.value })}
                />

                 <TouchableOpacity title="Register" style={styles.buttonStyle} onPress={()=>this.onSubmit()}>

                 <Text style={styles.appButtonText}>Register</Text>
                </TouchableOpacity>

                <Text style={styles.textStyle}>Already have an account?</Text>
                <TouchableOpacity title="Login" onPress={()=>this.props.navigation.navigate('Login')}>
                    <Text style={styles.router}>Login</Text>
                    </TouchableOpacity>
            </View>
            </ScrollView>
            </LinearGradient>
            </SafeAreaView>
        );_
    }
}
const styles = StyleSheet.create({
    inputStyle:{
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 3,
        marginHorizontal:60,
        borderRadius:5,
    },

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
            marginHorizontal:80,           
            padding:2,
            margin:4,
    },
    textStyle: {
        marginHorizontal:60,
      fontSize: 20,
      fontFamily:'Cochin',
    },
    otherStyle: {
        marginVertical:80,
        flex:4,
      //backgroundColor: "#859a9b",
     
    },
    router:{
        marginHorizontal:170,
        fontSize: 30,
        fontFamily:'Cochin',
        color:"#859a9b",

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
      
      
  });

export default Register; 
