import * as React from "react";
import { apiRepository} from '../api/apiRepository';
import { StyleSheet, TouchableOpacity, Image, Button, View, Linking, SafeAreaView, ScrollView, Text,TouchableHighlight, Alert } from 'react-native';
import Logo from './Images/Logo.png';
import { LinearGradient } from 'expo-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import Heart from './Images/heart.png';

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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setResponse(){
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
    if((this.state.erows == undefined )|| (this.state.erows.length==0)){
      return(
        <View style={styles.bar}>
          <ScrollView style={styles.scrollView}> 
            <Text style={styles.textStyle}>
              No events in the past 48 hours.
            </Text>
          </ScrollView>
        </View>
      );// end return
    }//end of if statement
    else{
      console.log(this.state.erows.length);
      return this.state.erows.map(element => {
        return(
          <TouchableOpacity onPress={()=>{this.setState({response_display:true,friend_in_need:element.username})}}>  
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
                this.setState({response: itemValue},()=>this.setResponse())}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Call Me" value="Call Me" />
                <Picker.Item label="I'm Here For You" value="I'm Here For You" />
                <Picker.Item label="I Care About You, Lunch This Week?" value="I Care About You, Lunch This Week?" />
              </Picker>
            </View>
          </TouchableOpacity>
        );// end return
      });
    }//end of else statement 
  };// end eventList()

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
    });// end return
  }; // end list

  onEvent(){
    //let str1=this.state.username;
    //let strhalf=" is ";
    //let str2=this.state.action;
    //console.log(str1);
    //console.log(strhalf);
    //console.log(str2);
    //let message= str1.concat(strhalf,str2);
    let message=this.state.action;    
    var reqInfo = {
      accountId: this.state.currentAccountId,
      type:message,
    }

    this.apiRepository.postEvent(reqInfo)
      .then(rep => {
        onsole.log(rep);
        alert(`Message Sent: ${this.state.username} is ${this.state.action}`);
        if(rep.statusText === 'OK') {
          console.log("Event posted"); 
        }
      });
  }// end onEvent()

  render() {
    const params = this.props.route.params;
    this.state.currentAccountId = params.id;
    this.state.username = params.username;
    this.state.password = params.password;

    return (
      <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#859a9b', 'white',]}
        style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}
      >
      <ScrollView style={styles.scrollView}>
      <View style={styles.otherStyle}>
        <View style={{flex:6,}}>
          <TouchableOpacity
            onPress= {() => this.props.navigation.navigate('Response', {
              currentAccountId: this.state.currentAccountId,
              username: this.state.username
            })}
          >
            <Image
              source={Heart} 
              style={styles.logo2}
            ></Image>
          </TouchableOpacity>
        </View>
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
          <TouchableOpacity
            style={styles.button}
            onPress={()=> { this.setState({action_display:true})}}
          >
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
              this.setState({action: itemValue},()=>this.onEvent())}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="crying" value="crying" />
            <Picker.Item label="having a panic attack" value="having a panic attack" />
            <Picker.Item label="in a depressive episode" value="in a depressive episode" />
            <Picker.Item label="relapsing" value="relapsing" />
            <Picker.Item label="not taking care of myself" value="not taking care of themselves" />
          </Picker>
        </View>
        {this.eventlist()}
      </View>
         
      </ScrollView>
      </LinearGradient>
      </SafeAreaView>
    );
  }// end render
 
  componentDidMount() {
    this.apiRepository.getEventList(this.state.currentAccountId)
      .then( rep => {
        this.setState({
          erows: rep.data
        })
      });
  }

}// end Landing

// CSS
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
      
      logo2:{
        width:50,
        height:50,
      },

    container:{
      flexDirection: 'row',      
    },

    container_2:{
        flexDirection: 'row', 
        flex:6,
    },
    container_3:{
        borderRadius:10,
        borderWidth:4,
        borderColor:"#859a9b",
    },
    textStyle: {
      fontSize: 30,
      fontFamily:'Cochin',
    },
    otherStyle: {

    }, 
    fontStyle:{
        fontFamily:'Cochin',
    },
    container: {
        flex: 1,

      },
      scrollView: {
        marginHorizontal: 20,
      },
  });
  export default Landing; 
