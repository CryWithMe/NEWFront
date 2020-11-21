import * as React from "react";
import { StyleSheet, CheckBox, TextInput, Button, View, SafeAreaView, Text, Alert, Image, ScrollView, TouchableOpacity } from 'react-native';
import Pencil from './Images/pencil.png';
//import MultiSelect from 'react-native-multiple-select';
import SelectMultiple from 'react-native-select-multiple';
import { LinearGradient } from 'expo-linear-gradient';

const conditions = [
        { label: 'Anxiety Disorders', value: '1' },
        { label: 'Attention Deficit Hyperactivity Disorder (ADHD)', value: '2' },
        { label: 'Bipolar Disorder', value: '3' },
        { label: 'Borderline Personality Disorder (BPD)', value: '4' },
        { label: 'Dual Diagnosis/Co-Occurring Disorders', value: '5' },
        { label: 'Early Psychosis and Psychosis', value: '6' },
        { label: 'Eating Disorders', value: '7' },
        { label: 'Obsessive-Compulsive Disorder (OCD)', value: '8' },
        { label: 'Panic Disorder', value: '9' },
        { label: 'Posttraumatic Stress Disorder (PTSD)', value: '10' },
        { label: 'Schizoaffective Disorder', value: '11' },
        { label: 'Schizophrenia', value: '12' },
        { label: 'Seasonal Affective Disorder (SAD)', value: '13' },
    ]

    const renderLabel = (label, style) => {
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginLeft: 10,borderRadius:10,}}>
              <Text style={styles.textStyle}>{label}</Text>
            </View>
          </View>
        )
      }

class EditProfile extends React.Component{
    
    state={
        selectedItems:[],
        isShownPicker:false,
        checked:false,
        edit_triggers:false,
        edit_comforts:false,
        screen_name:'',
        username:'',
        triggers:'Fireworks',
        triggers_edit:'',
        comforts:'eggs',
        comforts_edit:'',
        index:0,
    };
   
    onSelectionsChange = (selectedItems) => {
        // selectedFruits is array of { label, value }
        this.setState({ selectedItems })
      }

      triggersOutput(props) {
        this.setState({triggers_edit:true})
        return (
            <TextInput 
            placeholder={this.state.triggers} 
            style={{
                fontSize: 20,
                fontFamily:'Cochin',
                borderWidth:2,
                borderColor:'#859a9b',
                borderRadius:10,}}
            onChangeText={text => this.setState({triggers_edit:text})}
            >
            </TextInput>
        );
      }

    render() {
        const params = this.props.route.params;
        this.state.username = params.username;
        this.state.screen_name = params.screen_name;
        
        // this.setState({
        //     username: params.username,
        //     screen_name: params.screen_name,
        // })
        return (
            <SafeAreaView style={styles.container}>
            <LinearGradient  colors={['#859a9b', 'white',]}>
         <ScrollView style={styles.scrollView}> 
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
                
            <SelectMultiple style={{fontFamily:"Cochin"}}
          items={conditions}
          renderLabel={renderLabel}
          selectedItems={this.state.selectedItems}
          onSelectionsChange={this.onSelectionsChange} />

            </ScrollView>




                </SafeAreaView>


                
                <View style={styles.bar}> 
                <Text style={styles.textStyle}>
                    Triggers: {this.state.triggers}
                </Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.setState({edit_triggers:true})}>
                     <Image style={styles.image} source={Pencil}></Image>
                </TouchableOpacity>
                </View>
                <View style={{"display": this.state.edit_comforts ? "block":"none",}}>
                <TextInput 
                placeholder={this.state.triggers} 
                style={{
                    //"display": this.state.edit_comforts ? "block":"none",
                    fontSize: 20,
                    fontFamily:'Cochin',
                    borderWidth:2,
                    borderColor:'#859a9b',
                    borderRadius:10,}}
                onChangeText={text => this.setState({triggers_edit:text})}
                >
                </TextInput>
                <TouchableOpacity onPress={()=>this.setState({triggers:this.state.triggers_edit})}>
                    <Text style={styles.appButtonText}>Submit</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.bar}> 
                <Text style={styles.textStyle}>
                    Comforts: {this.state.comforts}
                </Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.setState({edit_comforts:true})}>
                <Image style={styles.image} source={Pencil}></Image>
                </TouchableOpacity>
                </View>
                <View style={{"display": this.state.edit_comforts ? "block":"none",}}>
                <TextInput 
                placeholder={this.state.comforts} 
                style={{
                    //"display": this.state.edit_comforts ? "block":"none",
                    fontSize: 20,
                    fontFamily:'Cochin',
                    borderWidth:2,
                    borderColor:'#859a9b',
                    borderRadius:10,}}
                onChangeText={text => this.setState({comforts_edit:text})}
                ></TextInput>
                <TouchableOpacity onPress={()=>this.setState({comforts:this.state.comforts_edit})}>
                    <Text style={styles.appButtonText}>Submit</Text>
                </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
            </LinearGradient>
            </SafeAreaView>
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

    image:{
        marginHorizontal:20,
        width:30,
        height:30,
    },

    inputStyle:{
        fontSize: 20,
      fontFamily:'Cochin',
      borderWidth:2,
      borderColor:'#859a9b',
      borderRadius:10,
    backgroundColor:"#f7021a",
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
