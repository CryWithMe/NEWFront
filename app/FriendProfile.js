import * as React from "react";
import { StyleSheet, Button, View, Modal, TouchableOpacity, TouchableHighlight, SafeAreaView, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class FriendProfile extends React.Component{
    state={
        screen_name:'',
        //username:'',
        conditions_info:['ADHD','Depression'],
        triggers:'',
        comforts:'',
        modalVisible:false,
        friend_account:false,
    };


    componentDidMount(){

    }

 setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }


    list = () => {
        return this.state.conditions_info.map(element => {
          return (
            
              <Text style={styles.descriptionStyle}>
                  {element}
                </Text>
              
          );
        });
      };

    //  deleteAccount(){
    //   var r=confirm("Press a button!\nEither OK or Cancel.");
    //   if(r==true){
    //      //send api request to delete from table
    //      alert("You selected cancel!");
    //   }
    //  }

    render() {
      const params = this.props.route.params;
        var username = params.username;
        

      const { modalVisible } = this.state;
        return (
          <LinearGradient  colors={['#859a9b', 'white',]}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
            <View style={styles.otherStyle}>
                

                <View style={styles.bar}>

                <TouchableOpacity style={styles.backStyle}>
                <TouchableOpacity
                    title="Back"
                    onPress= {() => this.props.navigation.navigate('Friends')}
                ><Text style={{fontFamily:"Cochin"}}>Back</Text></TouchableOpacity>
                </TouchableOpacity>
                
                <View></View>
                <Text style={styles.titleStyle}>
                    
                </Text>
                <Text>                </Text>
                </View>
            
                <Text style={styles.textStyle}>
                    Welcome back,{this.state.screen_name}
                </Text>
                <Text style={styles.textStyle}>
                    @{username}
                </Text>
                <Text style={styles.textStyle}>
                    Conditions Info:
                    {this.list()}
                </Text>
                <Text style={styles.textStyle}>
                    Triggers:
                    {this.state.triggers}
                </Text>

                <Text style={styles.textStyle}>
                    Comforts:
                    {this.state.comforts}
                </Text>
            </View>
           </LinearGradient>
        );_
    }
}

const styles = StyleSheet.create({
    titleStyle:{
        fontSize: 20,
      fontFamily:'Cochin',
      textAlign:"center",
      //justifyContent:"center",
      alignContent:"center",
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
      modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7021a',
        padding: 100
     },
    bar:{
        marginTop:20,
        padding:10,
        //justifyContent:"space-between",
        flexDirection: 'row', 
        flexWrap:'nowrap',
    },
    textStyle: {
      borderWidth:4,
      backgroundColor:"rgba(255, 255, 255, 0.53)",
      borderColor:"white",
      margin:10,
      marginHorizontal:60,
      borderRadius:20,
      padding:8,
      fontSize: 20,
      fontFamily:'Cochin',
      textAlign:'center',
      alignContent:"stretch",
      alignSelf:"stretch",
    },
    otherStyle: {
        padding:8,
        alignSelf:"stretch",
        fontSize: 20,
      fontFamily:'Cochin',
    textAlign:'center',
      //backgroundColor: 'linear-gradient(#95afb4,white)',
    },
    descriptionStyle: {
        padding:8,
        alignSelf:"stretch",
        fontSize: 20,
      fontFamily:'Cochin',
    textAlign:'center',

    },

    linkStyle:{
      borderWidth:4,
      backgroundColor:"rgba(255, 255, 255, 0.53)",
      borderColor:"#859a9b",
      margin:10,
      marginHorizontal:60,
      borderRadius:20,
      padding:8,
      fontSize: 20,
      fontFamily:'Cochin',
      textAlign:'center',
      alignContent:"stretch",
      alignSelf:"stretch",
    },
    containerStyle:{
      backgroundColor: 'white', 
      padding: 20
    },
    centeredView: {
      flex: 1,
      //justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      }
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
  });
export default FriendProfile; 
