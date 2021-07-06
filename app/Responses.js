import * as React from "react";
import { apiRepository} from '../api/apiRepository';
import { StyleSheet, TouchableOpacity, Image, Button, View, Linking, SafeAreaView, ScrollView, Text,TouchableHighlight, Alert } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';


class Response extends React.Component{

  apiRepository = new apiRepository();

  state={
    currentAccountId:'',
    username: '',
    action:'',
    cause:'',
    password:'',
    modalVisible:false, 
    response:'',
    rrows:[],
    action_display:false, 
    response_display:false,
    long:0,
    friend_in_need:'',
    rrows:[],
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }// end setModlal

  responselist = () => {

    if ((this.state.rrows == undefined )|| (this.state.rrows.length==0)) {
      return(
        <View style={styles.bar}>
          <ScrollView style={styles.scrollView}> 
            <Text style={styles.textStyle}>
              No responses in the past 48 hours.
            </Text>
          </ScrollView>
        </View>
      );
    }//end of if statement
    else {
      return this.state.rrows.map(element => {
        return(
          <View style={styles.bar}>
            <Text style={styles.textStyle}>{element.username} says "{element.type}"</Text>
          </View>  
        );
      });
    }//end of else statement 
  };// end responceList()

  render() {
    const params = this.props.route.params;
    this.state.currentAccountId = params.id;
    this.state.username = params.username;
    this.state.password = params.password;

    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
      <LinearGradient  colors={['#859a9b', 'white',]}
        style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}
      >
      <ScrollView style={styles.scrollView}> 

      <View style={styles.otherStyle}>
        <TouchableOpacity style={styles.backStyle}>
          <TouchableOpacity
            title="Back"
            onPress= {() => this.props.navigation.navigate('Home', {
              currentAccountId: this.state.currentAccountId,
              username: this.props.route.params.username
            })}
          >
            <Text style={{fontFamily:"Cochin"}}>
              Back
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{flex:6,alignSelf:"center",}}>
          <Text style={styles.textStyle}>Responses</Text>
        </View>
        {this.responselist()}
      </View>

      </ScrollView>
      </LinearGradient>
      </SafeAreaView>
    );_
  }// end render

  componentDidMount() {

    this.apiRepository.getResponseList(this.props.route.params.currentAccountId)
      .then( rep => {
        this.setState({
          rrows: rep.data.rows
        })
      });
    }

}// end Responces

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
            marginTop: Constants.statusBarHeight,
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
      }); export default Response; 