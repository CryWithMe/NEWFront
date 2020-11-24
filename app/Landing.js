import * as React from "react";
import { apiRepository} from '../api/apiRepository';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Image, Button, View, Linking, SafeAreaView, ScrollView, Text,TouchableHighlight, Alert } from 'react-native';
import Logo from './Images/Logo.png';
import Friends from "./Friends";
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import {Picker} from '@react-native-picker/picker';


class Landing extends React.Component{

    apiRepository = new apiRepository();

    state={
        array:
        [
            {
                name:'Travis',
                condition:'is having a panic attack',
                date: Date().toLocaleString(),
            },
            {
                name:'Megan',
                condition:'is crying',
                date: Date().toLocaleString(),
            },
           
        ],


        currentAccountId:'',
        username: '',
        action:'',
        cause:'',
        password:'',
        modalVisible:false, 
        response:'',
        erows:[],
        action_display:false, 
        response_display:false,
        long:0,
        friend_in_need:'',
    }


    // threeOptionAlertHandler = () => {
    //     //function to make three option alert
    //     Alert.alert(
    //       //title
    //       'Hello',
    //       //body
    //       `Send a Response ?`,
    //       [
    //         { text: 'Call Me', onPress: () => console.log('Call Me Was Pressed') },
    //         { text: "I'm here for you", onPress: () => console.log('I love you Was Pressed') },
    //         { text: 'I care about you. Lunch this week?', onPress: () => console.log('Can I get you anything Was Pressed') },
    //       ],
    //       { cancelable: true }
    //     );
    //   };

      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

      setResponse(){
        //let regex= RegExp("/^([^.])(\w[.]{0,1})+[^.]@(?:[a-zA-z]+\.)+[a-zA-z]{2,}$");
        
       
            //this.setState({response:new_response});
            Alert.alert("Confirmation","Response succesfully sent!");
            console.log("Responding in landing...");

            var reqInfo = {
                accountId: this.state.currentAccountId,
                username:this.state.friend_in_need,
                type:this.state.response,
              }

            this.apiRepository.postResponse(reqInfo)
            .then(rep => {
                if(rep.statusText == "OK"){
                  console.log("Event response succesfully sent");
                }
              })
        return false;
    }

    eventlist = () => {
        //console.log('Friends is', this.state.erows[0]);
    
        if((this.state.erows == undefined )|| (this.state.erows.length==0)){
          return(

            <View style={styles.bar}>
                <ScrollView style={styles.scrollView}> 
              <Text style={styles.textStyle}>
                No events in the past 48 hours.
              </Text>
              </ScrollView>
            </View>
            
          );
        }//end of if statement
        else{
            console.log(this.state.erows.length);
            return this.state.erows.map(element => {
          return(
                <TouchableOpacity onPress={()=>{this.setState({response_display:true,friend_in_need:this.state.element.username})}}>  
            <View style={styles.bar}>
              <Text style={styles.textStyle}>{element.username} is {element.type}</Text>
              <Text>{element.date}</Text>
              
              <Picker      
                    selectedValue={this.state.language}
                    style={{"display" : this.state.response_display ? "block":"none",
                    borderRadius:10,
                    borderColor:"#859a9b",
                    fontFamily:"Cochin",
                    alignContent:"center",
                    height: 50, 
                    width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                    this.setState({response: itemValue},()=>this.setResponse())
                 }>
                     <Picker.Item label="Call Me" value="Call Me" />
                    <Picker.Item label="I'm Here For You" value="I'm Here For You" />
                    <Picker.Item label="I Care About You, Lunch This Week?" value="I Care About You, Lunch This Week?" />
                 </Picker>
             </View>  
              </TouchableOpacity>
          );
                });
      }//end of else statement 
      };

    list = () => {
        return this.state.array.map(element => {
          return (
            <TouchableOpacity onPress={()=>{this.setResponse()}}>  
            <View style={styles.bar}>
              <Text style={styles.textStyle}>{element.name} {element.condition}</Text>
              <Text>{element.date}</Text>
              </View> 
              </TouchableOpacity>
          );
        });
      };

      onEvent(){

        //let str1=this.state.username;
        //let strhalf=" is ";
        //let str2=this.state.action;

        //console.log(str1);
        //console.log(strhalf);
        //console.log(str2);

        //let message= str1.concat(strhalf,str2);
        let message=this.state.action;
    
        console.log(message);
        
        var reqInfo = {
            accountId: this.state.currentAccountId,
            type:message,
          }

          this.apiRepository.postEvent(reqInfo)
          .then(rep => {
            console.log(rep);
            alert(`Message Sent: ${this.state.username} is ${this.state.action}`);
            if(rep.statusText === 'OK') {
               console.log("Event posted");
               
            }

        });
          
      }
      

    render() {
        const params = this.props.route.params;
        this.state.currentAccountId = params.id;
        this.state.username = params.username;
        this.state.password = params.password;
        //console.log(this.state.currentUser);
        //{this.getToken()}
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
            <LinearGradient  colors={['#859a9b', 'white',]}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
                <ScrollView style={styles.scrollView}> 
            <View style={styles.otherStyle}>
                 
                <View style={styles.container}>
                  
                 <TouchableOpacity
                    style={styles.profileButton}
                    onPress= {() => this.props.navigation.navigate('Profile', {
                        currentAccountId: this.state.currentAccountId,
                        username: this.state.username,
                    })}
                >
                <Text style={styles.fontStyle}>Profile</Text>
                </TouchableOpacity>  

                <TouchableOpacity
                    style={styles.friendButton}
                    onPress ={() => this.props.navigation.navigate('Friends', {
                        currentAccountId: this.state.currentAccountId
                    })}
                >
                <Text style={styles.fontStyle}>Friends</Text>
                </TouchableOpacity>
                </View>


           <View style={styles.container_2}>  
        <TouchableOpacity style={styles.button} onPress={()=>{
            this.setState({action_display:true})
            }}>
        <Image style={styles.logo} source={Logo}/>
        </TouchableOpacity>
</View>  
            <View style={{flex:6,alignSelf:"center",}}>
        <Picker      
                    selectedValue={this.state.language}
                    style={{"display" : this.state.action_display ? "block":"none",
                    borderRadius:10,
                    borderColor:"#859a9b",
                    fontFamily:"Cochin",
                    alignContent:"center",
                    height: 50, 
                    width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                    this.setState({action: itemValue},()=>this.onEvent())
                 }>
                    <Picker.Item label="crying" value="crying" />
                    <Picker.Item label="having a panic attack" value="having a panic attack" />
                    <Picker.Item label="in a depressive episode" value="in a depressive episode" />
                    <Picker.Item label="relapsing" value="relapsing" />
                    <Picker.Item label="not taking care of myself" value="not taking care of themselves" />
                    
                </Picker>

             </View>


                {/* <SafeAreaView style={styles.container_3}> */}
                {/* <ScrollView style={styles.scroll}> */}
                    {this.eventlist()}
                {/* </ScrollView> */}
                {/* </SafeAreaView> */}
            </View>
            </ScrollView>
            </LinearGradient>
            </SafeAreaView>
        );_
    }
    componentDidMount() {


        this.apiRepository.getEventList(this.state.currentAccountId)
        .then( rep => {
          this.setState({
            erows: rep.data
          })
          console.log(rep.data);
        });

    }

}

const styles = StyleSheet.create({
    bar:{
        padding:2,
        margin:3,
        borderWidth:3,
        backgroundColor:"rgba(255, 255, 255, 0.53)",
        borderRadius:10,
        borderColor:"white",
    },
    button:{
        fontFamily:'Cochin',
        backgroundColor: '#859a9b',
        borderRadius: 100,
        //padding: 0,
        //marginBottom: 20,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
        flex:6,
        margin:30,
        alignItems:"center", 
    },

    profileButton:{
        margin:10,
        fontFamily:'Cochin',
        backgroundColor: '#859a9b',
        borderRadius: 60,
        padding: 10,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,    
        flex:3,
        alignItems:'center',
        //justifyContent:'center',

    },

    friendButton:{
        margin:10,
        fontFamily:'Cochin',
        backgroundColor: '#859a9b',
        borderRadius: 60,
        padding: 10,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
        flex:3,
        textAlign:"center",
    }, 

    logo: {
        width: 300,
        height: 300,
      },
      
    container:{
        
        //justifyContent:'space-evenly',
        flexDirection: 'row', 
        
    },

    container_2:{
        //justifyContent:'space-evenly',
        flexDirection: 'row', 
        flex:6,
    },
    container_3:{
        //marginHorizontal:60,
        borderRadius:10,
        borderWidth:4,
        borderColor:"#859a9b",
        //flex:1,
        marginTop: Constants.statusBarHeight,
    },
    textStyle: {
      fontSize: 30,
      fontFamily:'Cochin',
    },
    otherStyle: {
      //justifyContent: 'center',
      //backgroundColor: "#859a9b",
      //backgroundColor: 'linear-gradient(#95afb4,white)',
    }, 
    fontStyle:{
        fontFamily:'Cochin',
    },
    container: {
        flex: 1,
       // marginTop: Constants.statusBarHeight,
      },
      scrollView: {
        marginHorizontal: 20,
      },
  });
export default Landing; 
