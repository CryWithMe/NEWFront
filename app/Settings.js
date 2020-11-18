import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, Modal} from 'react-native';

class Settings extends React.Component{
    state={
        password:'',
        phone_num:0,
        send_alerts:true,
        receive_alerts:true,
    };
    deleteAccount(){
        var r=confirm("Press a button!\nEither OK or Cancel.");
        if(r==true){
           //send api request to delete from table
           alert("You selected delete!");
        }
       }

    changePhoneNum(){
        let regex= RegExp("(([+]?[1-9][0-9]?[0-9]?)?[\\s]?[(]?[1-9][0-9]{2}[)]?[-\\s]?([0-9]{3})?[-\\s]?[0-9]{4})");
        var num= prompt("Type new # here (only numbers) ");
        if(num!=this.state.password && num!=null){
            if(regex.test(num)){
            this.setState({phone_num:num});
            alert("phone num succesfully changed!");
            }
        }
        else{
            alert("phone num rejected");
            
        }
        return false;
    }

    changePassword(){
        var pass= prompt("What would you like to change it to?");
        if(pass!=this.state.password && pass!=null){
            if(pass.length>=7){
            this.setState({password:pass});
            alert("password succesfully changed!");
            }
        }
        else{
            alert("password rejected");
            
        }
        return false;
    }
    render() {
        return (
            // Make Modules that link, utilize state
            <View style={styles.otherStyle}>
                <TouchableOpacity style={styles.backStyle}
                    onPress = {() => this.props.navigation.navigate('Profile')}>
                <Text style={styles.textStyle}>Back</Text>
                </TouchableOpacity>
                <Text>        </Text>
                <Text style={styles.titleStyle}>
                    Settings
                </Text>
                <View style={styles.container}>
                <Text style={styles.textStyle}>
                    Contact Info
                </Text>
                <TouchableOpacity
                onPress={()=> {this.changePhoneNum()}}>
                <Text style={styles.textStyle}>
                    Change Phone Number
                </Text>
                </TouchableOpacity>
                </View>
                <View style={styles.container}>
                <Text style={styles.textStyle}>
                    Account Controls
                </Text>
                <TouchableOpacity
                onPress={()=> {this.changePassword()}}>
                <Text style={styles.textStyle}>
                    Change Password
                </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    title="Delete Account"
                    onPress= {() => {this.deleteAccount()}}
                    ><Text style={styles.textStyle}>Delete Account</Text></TouchableOpacity>
                </View>
                <View style={styles.container}>
                <Text style={styles.textStyle}>
                    Notifications
                </Text>
                <Text style={styles.textStyle}>
                    Send/Receive Alerts
                </Text>
                </View>
            </View>
        );_
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
    otherStyle: {
      //justifyContent: 'center',
      //backgroundColor: 'linear-gradient(#95afb4,white)',
    }
  });
export default Settings; 
