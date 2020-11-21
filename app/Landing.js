import * as React from "react";
import { apiRepository} from '../api/apiRepository';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity, Image, Button, View, SafeAreaView, ScrollView, Text, Alert } from 'react-native';
import Logo from './Images/Logo.png';
import Friends from "./Friends";
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';



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
        currentUserId:'',
        username: '',
        action:'',
        cause:'',


    }

    threeOptionAlertHandler = () => {
        //function to make three option alert
        Alert.alert(
          //title
          'Hello',
          //body
          `Send a Response ?`,
          [
            { text: 'Call Me', onPress: () => console.log('Call Me Was Pressed') },
            { text: 'I love you.', onPress: () => console.log('I love you Was Pressed') },
            { text: 'Can I get you anything?', onPress: () => console.log('Can I get you anything Was Pressed') },
          ],
          { cancelable: true }
        );
      };

    list = () => {
        return this.state.array.map(element => {
          return (
            <TouchableOpacity onPress={()=>{this.threeOptionAlertHandler()}}>  
            <View style={styles.bar}>
              <Text style={styles.textStyle}>{element.name} {element.condition}</Text>
              <Text>{element.date}</Text>
              </View> 
              </TouchableOpacity>
          );
        });
      };

      

    render() {
        const params = this.props.route.params;
        this.state.currentUserId = params.id;
        this.state.username = params.username;
        //console.log(this.state.currentUser);

        const { navigation } = this.props;
        return (
            <LinearGradient  colors={['#859a9b', 'white',]}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
            <View style={styles.otherStyle}>
                 
                <View style={styles.container}>
                  
                 <TouchableOpacity
                    style={styles.profileButton}
                    onPress= {() => this.props.navigation.navigate('Profile', {
                        id: this.state.currentUserId
                    })}
                >
                <Text style={styles.fontStyle}>Profile</Text>
                </TouchableOpacity>  

                <TouchableOpacity
                    style={styles.friendButton}
                    onPress ={() => this.props.navigation.navigate('Friends', {
                        id: this.state.currentUserId
                    })}
                >
                <Text style={styles.fontStyle}>Friends</Text>
                </TouchableOpacity>
                </View>
           <View style={styles.container_2}>  
        <TouchableOpacity style={styles.button} onPress={()=>{Alert.alert("Sent",`${this.state.currentUser} is ${this.state.action} ${this.state.cause}`)}}>
        <Image style={styles.logo} source={Logo}/>
        </TouchableOpacity>
           </View>       
                <SafeAreaView style={styles.container_3}>
                <ScrollView style={styles.scroll}>
                    {this.list()}
                </ScrollView>
                </SafeAreaView>
            </View>
            </LinearGradient>
        );_
    }
    componentDidMount() {
        //this.state.profile.userId = +this.props.match.params.userId; // + in front of string number makes it an actual number

        // if (this.state.profile.userId) {
        //     this.apiRepository.getUser(this.state.profile.userId)
        //     .then(user => {
        //         this.setState({profile: user});
        //     });
        // }

        // this.apiRepository.getRatings(this.state.profile.userId)
        // .then (ratings => {
        //     this.setState({ratings: ratings})
        // })

        

        


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
        padding: 0,
        marginBottom: 20,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,

    },

    profileButton:{
        fontFamily:'Cochin',
        backgroundColor: '#859a9b',
        borderRadius: 60,
        padding: 10,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,    

        alignItems:'center',
        //justifyContent:'center',

    },

    friendButton:{
        fontFamily:'Cochin',
        backgroundColor: '#859a9b',
        borderRadius: 60,
        padding: 10,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
    },

    logo: {
        width: 200,
        height: 200,
      },
      
    container:{
        
        //justifyContent:'space-evenly',
        flexDirection: 'row', 
        
    },

    container_2:{
        //justifyContent:'space-evenly',
        flexDirection: 'row', 
    },
    container_3:{
        marginHorizontal:60,
        borderRadius:10,
        borderWidth:4,
        borderColor:"#859a9b",
        flex:1,
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
  });
export default Landing; 
