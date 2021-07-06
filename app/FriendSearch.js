import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, TouchableOpacity, Text, Alert, Image, TextInput, ScrollView } from 'react-native';
import Search from './Images/icons8-search-48.png';
import { LinearGradient } from 'expo-linear-gradient';
import { apiRepository} from '../api/apiRepository';
import Home from './Images/home.png';

class FriendSearch extends React.Component{
    
    apiRepository = new apiRepository();

    state={
        friend_name:'',
        namelist:['@amy123','@tyler123'],
        found:false,
        value:-1,
        display_name: '',
    };

    findFriends() {
        const value = true; 
        for(var i=0;i<this.state.namelist.length;i++){
            if (this.state.friend_name.localeCompare(this.state.namelist[i])==0) {
                this.setState({found:true});
                this.setState({value:i});
            }
        }
    }// end findFriends

    friendRequest() {
        this.apiRepository.sendFriendRequest(this.state.friend_name)
            .then(rep => {
            if(rep.statusText == this.state.friend_name){
                console.log("Friend fround");
            }
        });
    }// end friendRequest

    sendRequest(u) {
        var reqInfo = {
            username: u,
            accountId: this.props.route.params.currentAccountId
        }
        
        this.apiRepository.sendFriendRequest(reqInfo)
            .then(rep => {
                if(rep.statusText == "OK"){
                    console.log("Friend Request Sent");
                }
            })

        this.props.navigation.navigate('Friends', {
            currentAccountId: this.state.currentAccountId
        })
    }// end sendRequest

    showNames() {
        if(this.state.value!=-1){
            return this.state.namelist[this.state.value];
        }
    }// end showNames

    searchAFriend() {
        this.apiRepository.searchAccount(this.state.friend_name)
            .then(rep => {
                if(rep.statusText == "OK"){
                    console.log("Friend fround");
                    this.setState({
                        found: 1,
                        display_name: this.state.friend_name,
                    })
                    }
            });
    }// end searchAFriend

    render() {
        return (
            <SafeAreaView style={styles.container}>
            <LinearGradient  colors={['#859a9b', 'white',]}>
            <ScrollView style={styles.scrollView}>

            <View style={styles.otherStyle}>
                <View style={styles.bar}>
                    <TouchableOpacity style={styles.backStyle}
                        title="back"
                        onPress= {() => this.props.navigation.navigate('Friends')}
                    >
                        <Text style={styles.textStyle}>Back</Text>      
                    </TouchableOpacity>
                    <TouchableOpacity
                        title="Back"
                        onPress= {() => this.props.navigation.navigate('Home')}
                    >
                        <Image style={styles.icon} source={Home}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textStyle}>
                    Search for Friends
                </Text>
                <View style={styles.bar}>
                    <TextInput
                        placeholder="ex: mark123"  
                        autoCapitalize="none"
                        onChange={e=>this.setState({friend_name: e.target.value, found: false})}
                        style={styles.inputStyle}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={ ()=> { this.setState({
                            found: false
                        });
                        this.searchAFriend();
                        }}
                    >
                        <Image style={styles.image} source={Search}></Image>
                    </TouchableOpacity>
                </View>
                <Text style={styles.names}>
                    {this.showNames()}
                </Text>
                <Text style={styles.textStyle}>{this.state.display_name}</Text>
                <TouchableOpacity
                    onPress={ ()=>this.sendRequest(this.state.friend_name)}
                    style={{'backgroundColor':"#abcdcf" ,'display':this.state.found ? "block": "none", "border-radius":10, padding:2,marginHorizontal:80,textAlign:"Center",}}
                >
                    <Text style={styles.appButtonText}>
                        Add Friend
                    </Text>
                </TouchableOpacity>
            </View>

            </ScrollView>
            </LinearGradient>
            </SafeAreaView>
        );
    }// end render

}// end FriendSearch

// CSS
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
    appButtonText: {
        fontSize: 18,
        fontFamily:'Cochin',
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },

    names:{
        flexDirection:"column",
        textAlign:"center",
        padding:10,
        margin:10,

    },
    inputStyle:{
        height: 40, 
        borderColor: "#859a9b", 
        borderWidth: 3,
        borderRadius:5,
    },
    bar:{
        flexDirection: 'row', 
        flexWrap:'wrap',
        
    },

    textStyle: {
        padding:10,
        textAlign:"center",
      fontSize: 20,
      fontFamily:'Cochin',
    },
    image:{
        marginHorizontal:20,
        width:30,
        height:30,
    },
    otherStyle: {

    },
    container: {
        flex: 1,
      },
      scrollView: {
        marginHorizontal: 20,
      },
      icon:{
        marginTop:10,
        width:50,
        height:50,
      },
  });
export default FriendSearch; 
