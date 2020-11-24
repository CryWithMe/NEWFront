import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image, TextInput, TouchableOpacity, Modal,ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {apiRepository} from '../api';
import Home from './Images/home.png';

class Settings extends React.Component{
    apiRepository = new apiRepository();

    state={
        password:'',
        email: '',
        phone_num:0,
        send_alerts:true,
        receive_alerts:true,
        currentAccountId: '',
        edit_password:false, 
        new_password:'',
        
    };
    deleteAccount(){
        var r=confirm("Press a button!\nEither OK or Cancel.");
        if(r==true){
            var body = {
                accountId: this.state.currentAccountId
            }
            this.apiRepository.delete(body)
                .then()

           //send api request to delete from table
           Alert.alert("Confirmation","You selected delete!");
        }
       }

    changePhoneNum(){
        let regex= RegExp("(([+]?[1-9][0-9]?[0-9]?)?[\\s]?[(]?[1-9][0-9]{2}[)]?[-\\s]?([0-9]{3})?[-\\s]?[0-9]{4})");
        var num= prompt("Type new # here (only numbers) ");
        if(num!=this.state.password && num!=null){
            if(regex.test(num)){
            this.setState({phone_num:num});
            Alert.alert("Confirmation","phone num succesfully changed!");
            }
        }
        else{
            Alert.alert("Invalid Number","phone number rejected");
            
        }
        return false;
    }

    changeEmail(){
        let regex= RegExp("/^([^.])(\w[.]{0,1})+[^.]@(?:[a-zA-z]+\.)+[a-zA-z]{2,}$");
        var num= prompt("Type new email ");
        if(num!=this.state.email && num!=null){
            if(true){
            this.setState({email:num});
            var reqInfo = {
                accountId: this.props.route.params.currentAccountId,
                username: this.props.route.params.username,
                email: num,
                fname: this.props.route.params.screen_name,
                lname: this.props.route.params.screen_name
            }
            this.apiRepository.updateAccount(reqInfo)
                .then(rep => {
                    console.log(rep);
                })
            Alert.alert("Confirmation","email succesfully changed!");
            }
        }
        else{
            Alert.alert("Invalid Number","email rejected");
            
        }
        return false;
    }

    changePassword(u){
        // var pass= prompt("What would you like to change it to?");
        var pass=u;
        if(pass!=this.state.password && pass!=null){
            if(pass.length>=7) {
            //this.setState({password:this.state.password});
            var reqInfo = {
                accountId: this.props.route.params.currentAccountId,
                newPassword: pass
            }
            this.apiRepository.updatePassword(reqInfo)
                .then(rep => {
                    if (rep.data == 'OK'){
                        this.props.navigation.navigate('Login');
                    }
                })
            }
        }
        else{
            Alert.alert("Invalid Password","password rejected");
            
        }
        return false;
    }
    render() {
        const params = this.props.route.params;
        this.state.currentAccountId = params.currentAccountId;
        this.state.password = params.password;
        this.state.email = params.email;
        
        return (
            <SafeAreaView style={styles.container_4}>
               <LinearGradient  colors={['#859a9b', 'white',]}>
            <ScrollView style={styles.scrollView}> 
            <View style={styles.otherStyle}>
        <View style={styles.bar}>
                <TouchableOpacity style={styles.backStyle}
                    onPress = {() => this.props.navigation.navigate('Profile', {
                        username: this.state.username,
                        password: this.state.password,
                        currentAccountId: this.state.currentAccountId,
                        screen_name: this.state.screen_name,
                        
                    }) }>
                <Text style={styles.textStyle}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    title="Back"
                    onPress= {() => this.props.navigation.navigate('Home')}
                ><Image style={styles.icon} source={Home}></Image>
          </TouchableOpacity>
          </View>

          <View style={{flex:6,alignSelf:"center",flexDirection:"row"}}>
                <Text style={styles.titleStyle}>
                    Settings
                </Text>
           </View>     
                <Text style={styles.textStyle}>
                    Contact Info
                </Text>
                <View style={styles.container}>
            
                <TouchableOpacity
                onPress={()=> {this.changeEmail()}}>
                <Text style={styles.textStyle}>
                    Change Email Address
                </Text>
                </TouchableOpacity>
                </View>
                
                <Text style={styles.textStyle}>
                    Account Controls
                </Text>
                <View style={styles.container}>
                <TouchableOpacity
                onPress={()=>this.setState({edit_password:!this.state.edit_password})}>
                <Text style={styles.textStyle}>
                    Change Password
                </Text>
                </TouchableOpacity>

                <View style={{"display": this.state.edit_password? "block":"none",}}>
                    <Text style={styles.textStyle} >New Password </Text>
                <TextInput 
                //placeholder={this.state.first_name}
                 secureTextEntry={true}
                style={{
                    //"display": this.state.edit_comforts ? "block":"none",
                    fontSize: 20,
                    fontFamily:'Cochin',
                    
                    borderWidth:2,
                    borderColor:'#859a9b',
                    borderRadius:10,}}
                onChangeText={text => this.setState({new_password:text})}
                ></TextInput>

            <TouchableOpacity
                style={styles.opacityStyle}
                    onPress={ () => {
                        this.setState({password: this.state.new_password});
                        this.changePassword(this.state.password);
                    }
                        
                }>
                    <Text style={styles.submitStyle}>Submit</Text>
                </TouchableOpacity>
                </View> 

                <TouchableOpacity
                    title="Delete Account"
                    onPress= {() => {this.deleteAccount()}}
                    ><Text style={styles.textStyle}>Delete Account</Text></TouchableOpacity>
                </View>
                
                <Text style={styles.textStyle}>
                    Notifications
                </Text>
                <View style={styles.container}>
                
                <Text style={styles.textStyle}>
                    Send/Receive Alerts
                </Text>
                </View>
            </View>
            </ScrollView>
            </LinearGradient>
            </SafeAreaView>
        );_
    }
    componentDidMount() {
        const params = this.props.route.params;
        this.setState({
            currentAccountId: params.currentAccountId,
            password: params.password,
            email: params.email,
        })
    }
}

const styles = StyleSheet.create({
    backStyle:{
        fontFamily:'Cochin',
            backgroundColor: '#859a9b',
            borderRadius: 60,
            padding: 10,
            shadowColor: '#303838',
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 10,
            shadowOpacity: 0.35,
            marginRight:450,
        
            textAlign:"center",
      },
    container:{
        padding:10,
        borderWidth:2,
      margin:4,
      marginHorizontal:60,
        borderRadius:10,
        borderWidth:4,
        borderColor:"#859a9b",
        flex:1,
        //backgroundColor:"rgba(255, 255, 255, 0.53)",
    },
    titleStyle:{
        padding:20,
        fontSize:20,
        fontFamily:'Cochin',
        textAlign:'center',
    },
    textStyle: {
      fontSize: 20,
      fontFamily:'Cochin',
      textAlign:"center",
      padding:10,
      
    },
    bar:{

    },

    otherStyle: {
      //justifyContent: 'center',
      //backgroundColor: 'linear-gradient(#95afb4,white)',
    },
    container_4: {
        flex: 1,
       // marginTop: Constants.statusBarHeight,
      },
      scrollView: {
        marginHorizontal: 20,
      },
      icon:{
        width:50,
        height:50,
      },
      submitStyle:{
        fontSize: 18,
        fontFamily:'Cochin',
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase" 
    },
    opacityStyle:{
        borderRadius:10, 
        padding:2,
        margin:4,
        backgroundColor:"#859a9b",
        marginHorizontal:60,
    },
  });
export default Settings; 
