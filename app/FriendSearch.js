import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, TouchableOpacity, Text, Alert, Image, TextInput } from 'react-native';
import Search from './Images/icons8-search-48.png';

class FriendSearch extends React.Component{
    
    state={
        friend_name:'',
        namelist:['@amy123','@tyler123'],
        found:false,
        value:-1, 
    };

    findFriends(){
        const value = true; 
        for(var i=0;i<this.state.namelist.length;i++){
        if(this.state.friend_name.localeCompare(this.state.namelist[i])==0){
            this.setState({found:true});
            this.setState({value:i});
        }
    }
    }

    showNames(){
        if(this.state.value!=-1){
            return this.state.namelist[this.state.value];
        }
    }

    addFriend(){

    }

    render() {
        return (
            <View style={styles.otherStyle}>
                 <TouchableOpacity style={styles.backStyle} title="back"
                    onPress= {() => this.props.navigation.navigate('Friends')}>
                  <Text style={styles.textStyle}>Back</Text>      
                </TouchableOpacity>
                <Text style={styles.textStyle}>
                    Search for Friends
                </Text>
                <View style={styles.bar}>
                <TextInput
                placeholder="ex: @egg123"  
                autoCapitalize="none"
                onChange={e=>this.setState({friend_name: e.target.value})}
                style={styles.inputStyle}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.findFriends()}>
                     <Image style={styles.image} source={Search}></Image>
                </TouchableOpacity>
            
                </View>
                <Text style={styles.names}>
                {this.showNames()}
                </Text>
                <TouchableOpacity onClick={()=>this.addFriend()} style={{'backgroundColor':"#abcdcf" ,'display':this.state.found ? "block": "none", "border-radius":10, padding:2,marginHorizontal:80,textAlign:"Center",}}><Text style={styles.appButtonText}>Add Friend</Text></TouchableOpacity>
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
            //justifyContent:"left",
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
        //justifyContent:"center",
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
        //justifyContent:"center",
        
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

  //justifyContent: 'center',
  //backgroundColor: "#859a9b",
      //backgroundColor: 'linear-gradient(#95afb4,white)',
    },
  });
export default FriendSearch; 
