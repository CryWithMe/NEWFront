import * as React from "react";
import { StyleSheet, CheckBox, TextInput, Button, View, SafeAreaView, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import Pencil from './Images/pencil.png'
class EditProfile extends React.Component{
    
    state={
        checked:false,
        edit_triggers:false,
        edit_comforts:false,
        screen_name:'',
        username:'',
        conditions_info:[
            {
                has:true,
                condition:'ADHD'
            },
            {
                has:false,
                condition:'Anxiety'
            },
            {
                has:false,
                condition:'Bipolar Disorder'
            },
            {
                has:true,
                condition:'Depression'
            },
        ],
        triggers:'',
        comforts:'',
    };
   
    handleChange(e){
        const item= e.target.name;
        const isChecked = e.target.checked;
    }

    list = () => {

        return this.state.conditions_info.map(element => {
          return (
            <View>
                <CheckBox 
                    value={element.has}
                    style={styles.checkbox}
                    onChange={this.handleChange}
                    ></CheckBox>
              <Text style={{
                    textAlign:"center",
                    fontSize: 20,
                    fontFamily:'Cochin',
                    flexDirection:"row"
                    }}>
                        {element.condition}</Text>

              {/* <Button onClick={ () => this.changeColor()} title = "Add Friend" style= {{"display": element.alreadyFriend ? "none" : "inline"}} color = {element.alreadyFriend ? "#859a9b": "gray"} ></Button>*/}  
              </View> 
          );
        });
      };

    render() {
        return (
            <View style={styles.otherStyle}>
                <View style={styles.bar}>
                <TouchableOpacity style={styles.backStyle}
                    onPress = {() => this.props.navigation.navigate('Profile')}>
                        <Text style={styles.textStyle}>Back</Text>
                </TouchableOpacity>
                <Text>        </Text>
                <Text style={styles.textStyle}>
                    Edit Your Profile
                </Text>
                <Text>        </Text>
                </View>
                <Text style={styles.textStyle}>
                    Screen Name: {this.state.screen_name}
                </Text>
                <TouchableOpacity style={styles.opacityStyle} ><Text style={styles.appButtonText}>Change Screen Name</Text></TouchableOpacity>
                <Text style={styles.textStyle}>
                    Username: {this.state.username}
                </Text>
                <TouchableOpacity style={styles.opacityStyle}><Text style={styles.appButtonText}>Change Username</Text></TouchableOpacity>
                <Text style={styles.textStyle}>
                    Conditions Info:
                </Text>
                <SafeAreaView style={styles.container_3}>
                <ScrollView>
                    {this.list()}
                </ScrollView>
                </SafeAreaView>
                <View style={styles.bar}> 
                <Text style={styles.textStyle}>
                    Triggers:
                </Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.setState({edit_triggers:true})}>
                     <Image style={styles.image} source={Search}></Image>
                </TouchableOpacity>
                </View>
                <TextInput 
                placeholder={this.state.triggers} 
                style={{
                    "display": this.state.edit_comforts ? "block":"none",
                    fontSize: 20,
                    fontFamily:'Cochin',
                    borderWidth:2,
                    borderColor:'#859a9b',
                    borderRadius:10,}}
                onChangeText={text => this.setState({triggers:text})}
                >
                </TextInput>
                <View style={styles.bar}> 
                <Text style={styles.textStyle}>
                    Comforts:
                </Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.setState({edit_comforts:true})}>
                     <Image style={styles.image} source={Search}></Image>
                </TouchableOpacity>
                </View>
                <TextInput 
                placeholder={this.state.comforts} 
                style={{
                    "display": this.state.edit_comforts ? "block":"none",
                    fontSize: 20,
                    fontFamily:'Cochin',
                    borderWidth:2,
                    borderColor:'#859a9b',
                    borderRadius:10,}}
                onChangeText={text => this.setState({comforts:text})}
                ></TextInput>
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
    opacityStyle:{
        borderRadius:10, 
        padding:2,
        margin:4,
        backgroundColor:"#859a9b",
        marginHorizontal:60,
    },
    appButtonText: {
        fontSize: 18,
        fontFamily:'Cochin',
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
    bar:{
        marginTop:20,
        padding:10,
        //justifyContent:"space-between",
        flexDirection: 'row', 
        flexWrap:'wrap',
    },

    inputStyle:{
        fontSize: 20,
      fontFamily:'Cochin',
      borderWidth:2,
      borderColor:'#859a9b',
      borderRadius:10,
    //backgroundColor:"rgba(255, 255, 255, 0.53)",
    marginHorizontal:60,
    padding:2,

    },
    textStyle: {
        textAlign:"center",
      fontSize: 20,
      fontFamily:'Cochin',
    },
    otherStyle: {
      //justifyContent: 'center',
      //backgroundColor: 'linear-gradient(#95afb4,white)',
    },
    container_3:{
        marginHorizontal:60,
        borderRadius:10,
        borderWidth:4,
        borderColor:"#859a9b",
        flex:1,
    },
    checkbox:{
        display:"flex",
        flexDirection:"row",
    },
    descriptionStyle: {
        padding:8,
        alignSelf:"stretch",
        fontSize: 20,
      fontFamily:'Cochin',
    textAlign:'center',
      //backgroundColor: 'linear-gradient(#95afb4,white)',
    },

  });
export default EditProfile; 
