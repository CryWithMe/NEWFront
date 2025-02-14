import * as React from "react";
import { apiRepository} from '../api/apiRepository';
import { StyleSheet, Button, View, Modal, TouchableOpacity, TouchableHighlight, Linking, SafeAreaView, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class Profile extends React.Component{

  apiRepository = new apiRepository();

    state={
        screen_name:'',
        first_name: '',
        last_name: '',
        username:'',
        email: '',
        password:'',
        conditions_info:[''],
        triggers:'',
        comforts:'',
        modalVisible:false,
        currentAccountId: '',
    };


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
  
  onLogout(){
    console.log("Logging User Out");
    this.props.navigation.navigate("Login", {
      username: '',
      password: '',
      id: ''
    })
                
  }


    render() {
      const params = this.props.route.params;
      this.state.currentAccountId = params.currentAccountId;

      const { modalVisible } = this.state;
        return (
          <LinearGradient  colors={['#859a9b', 'white',]}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
            <View style={styles.otherStyle}>
                

                <View style={styles.bar}>

                <TouchableOpacity style={styles.backStyle}>
                <TouchableOpacity
                    title="Back"
                    onPress= {() => this.props.navigation.navigate('Home', {
                      currentAccountId: this.state.currentAccountId,
                      username: this.props.route.params.username
                    })}
                ><Text style={{fontFamily:"Cochin"}}>Back</Text></TouchableOpacity>
                </TouchableOpacity>
                
                <View></View>
                <Text style={styles.titleStyle}>
                    
                </Text>
                <Text>                </Text>
                </View>
            
                <Text style={styles.textStyle}>
                    Welcome back, {this.state.first_name} {this.state.last_name}
                </Text>
                <Text style={styles.textStyle}>
                    @{this.state.username}
                </Text>
                <Text style={styles.textStyle}>
                    Conditions Info:
                  {this.state.conditions_info}
                    {/* this.list()*/}
                
                    <View style={{flex:6,alignSelf:"center",}}>
                <Text style={styles.hyperLink}>Want to learn more about these conditions?</Text>
                </View>
                <View style={{flex:6,alignSelf:"center",}}>
                <Text style={styles.hyperLink} onPress={() => Linking.openURL('https://www.namigreenvillesc.org/list-of-mental-illnesses/')}>Click here.</Text> 
               </View>

                </Text>
                
                <Text style={styles.textStyle}>
                    Triggers:
                    {this.state.triggers}
                </Text>

                <Text style={styles.textStyle}>
                    Comforts:
                    {this.state.comforts}
                </Text>

                <View style={styles.textStyle}>
                <TouchableOpacity
                  title="Manage Profile"
                  onPress= {() => this.props.navigation.navigate('Edit-Profile', {
                    username: this.state.username,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    currentAccountId: this.state.currentAccountId,
                    
                  })}
                ><Text style={styles.linkStyle}>Manage Profile</Text></TouchableOpacity>
                <TouchableOpacity
                  title="Settings"
                  onPress= {() => this.props.navigation.navigate('Settings', {
                    username: this.state.username,
                    password: this.state.password,
                    currentAccountId: this.state.currentAccountId,
                    screen_name: this.state.screen_name,
                  })}
                  ><Text style={styles.linkStyle}>Settings</Text></TouchableOpacity>
                  <TouchableOpacity
                  title="Logout"
                  onPress= {() => this.onLogout() }
                  ><Text style={styles.linkStyle}>Logout</Text></TouchableOpacity>

                </View>
            </View>
           </LinearGradient>
        );_
    }
    componentDidMount() {

      this.apiRepository.getUser(this.state.currentAccountId)
            .then(rep => {
                this.setState({
                  first_name: rep.rows[0].fname,
                  last_name: rep.rows[0].lname,
                  username: rep.rows[0].username,
                  email: rep.rows[0].email,
                  password: rep.rows[0].password,

                })
            })

        this.apiRepository.getCondition(this.props.route.params.username)
          .then(rep => {
            for (var i = 0; i < rep.rows.length; i++){
              this.setState({
                conditions_info: this.state.conditions_info + ' ' + rep.rows[i].condition
              })
            }
        
            })
        
        this.apiRepository.getComfort(this.props.route.params.username)
            .then(rep => {
                for (var i = 0; i < rep.rows.length; i++){
                  this.setState({
                    comforts: this.state.comforts + ' ' + rep.rows[i].condition
                  })
                }
            })

        this.apiRepository.getTrigger(this.props.route.params.username)
          .then(rep => {
            for (var i = 0; i < rep.rows.length; i++){
                  this.setState({
                    triggers: this.state.triggers + ' ' + rep.rows[i].condition
                  })
                }
          })
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
      hyperLink: {
        flex:6,
        // borderWidth:4,
        // backgroundColor:"rgba(255, 255, 255, 0.53)",
        // borderColor:"white",
        // margin:10,
        marginHorizontal:60,
        // borderRadius:20,
        padding:8,
        fontSize: 20,
        fontFamily:'Cochin',
        textAlign:'center',
        alignContent:"stretch",
        alignSelf:"stretch",
        fontStyle:'italic',
      },

      
  });
export default Profile; 
