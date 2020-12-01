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
      }

    //   setResponse(){
    //     //let regex= RegExp("/^([^.])(\w[.]{0,1})+[^.]@(?:[a-zA-z]+\.)+[a-zA-z]{2,}$");
        
       
    //         //this.setState({response:new_response});
    //         Alert.alert("Confirmation","Response succesfully sent!");
    //         console.log("Responding in landing...");

    //         var reqInfo = {
    //             accountId: this.state.currentAccountId,
    //             username:this.state.friend_in_need,
    //             type:this.state.response,
    //           }

    //         this.apiRepository.postResponse(reqInfo)
    //         .then(rep => {
    //             if(rep.statusText == "OK"){
    //               console.log("Event response succesfully sent");
    //             }
    //           })
    //     return false;
    // }

    responselist = () => {
        //console.log('Friends is', this.state.rrows[0]);
    
        if((this.state.rrows == undefined )|| (this.state.rrows.length==0)){
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
        else{
            console.log(this.state.rrows.length);
            return this.state.rrows.map(element => {
          return(
             
            <View style={styles.bar}>
              <Text style={styles.textStyle}>{element.username} says "{element.type}"</Text>
             </View>  
          );
                });
      }//end of else statement 
      };

    // list = () => {
    //     return this.state.array.map(element => {
    //       return (
    //         <TouchableOpacity onPress={()=>{this.setResponse()}}>  
    //         <View style={styles.bar}>
    //           <Text style={styles.textStyle}>{element.name} {element.condition}</Text>
    //           <Text>{element.date}</Text>
    //           </View> 
    //           </TouchableOpacity>
    //       );
    //     });
    //   };

    //   onEvent(){

    //     //let str1=this.state.username;
    //     //let strhalf=" is ";
    //     //let str2=this.state.action;

    //     //console.log(str1);
    //     //console.log(strhalf);
    //     //console.log(str2);

    //     //let message= str1.concat(strhalf,str2);
    //     let message=this.state.action;
    
    //     console.log(message);
        
    //     var reqInfo = {
    //         accountId: this.state.currentAccountId,
    //         type:message,
    //       }

    //       this.apiRepository.postEvent(reqInfo)
    //       .then(rep => {
    //         console.log(rep);
    //         alert(`Message Sent: ${this.state.username} is ${this.state.action}`);
    //         if(rep.statusText === 'OK') {
    //            console.log("Event posted");
               
    //         }

    //     });
          
    //   }
      

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
                 
            <TouchableOpacity style={styles.backStyle}>
                <TouchableOpacity
                    title="Back"
                    onPress= {() => this.props.navigation.navigate('Home', {
                      currentAccountId: this.state.currentAccountId,
                      username: this.props.route.params.username
                    })}
                ><Text style={{fontFamily:"Cochin"}}>Back</Text></TouchableOpacity>
                </TouchableOpacity>
                
                <View style={{flex:6,alignSelf:"center",}}>
                    <Text style={styles.textStyle}>Responses</Text>
                    </View>
                {/* <SafeAreaView style={styles.container_3}> */}
                {/* <ScrollView style={styles.scroll}> */}
                    {this.responselist()}
                {/* </ScrollView> */}
                {/* </SafeAreaView> */}
            </View>
            </ScrollView>
            </LinearGradient>
            </SafeAreaView>
        );_
    }
    componentDidMount() {


        this.apiRepository.getResponseList(this.props.route.params.currentAccountId)
        .then( rep => {
            console.log(rep);
          this.setState({
            rrows: rep.data.rows
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
      }); export default Response; 