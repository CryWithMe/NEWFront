import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, TouchableOpacity, Text, Image, TextInput, ScrollView, Alert } from 'react-native';
import { apiRepository} from '../api/apiRepository';
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
        // Error handles for mismatched passwords and unfilled forms
        if(this.state.password!=this.state.pass_confirm){
            window.alert("Oops! you're passwords don't match!");
        }
        else if(this.state.email  == "" || this.state.username  == "" || this.state.password == "" || this.state.fname == ""|| this.state.lname == ""){
            window.alert("Please fill out all fields");
        }
        else {
            this.apiRepository.registerUser(this.state)
                .then(rep => {
                    if(rep.data === "OK"){
                        console.log('Great Success!');
                        this.props.navigation.navigate('Login');
                    }
                })
            this.props.navigation.navigate('Login');
        }
    }// end onSubmit()

    render() {
        return (
            <SafeAreaView style={styles.container}>
            <LinearGradient  colors={['#859a9b', 'white',]}>
            <ScrollView style={styles.scrollView}> 

            <View style={styles.otherStyle}>
                <View style={{flex:6,alignSelf:"center",}}>
                    <Image style={styles.logo} source={Logo}></Image>
                </View>
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
                <TouchableOpacity
                    title="Register"
                    style={styles.buttonStyle}
                    onPress={ ()=> { this.onSubmit(); }}
                >
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
    } // end render
}// end Register

// CSS
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
     
    },
    router:{
        marginHorizontal:170,
        fontSize: 30,
        fontFamily:'Cochin',
        color:"#859a9b",

    },
    container: {
        flex: 1,
      },
      scrollView: {
        marginHorizontal: 20,
      },
      logo: {
        width: 500,
        height: 500,
        
      },
      
      container: {
        flex: 1,
      },
      scrollView: {
        marginHorizontal: 20,
      },
      
  });

export default Register; 
