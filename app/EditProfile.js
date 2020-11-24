import * as React from "react";
import { StyleSheet, CheckBox, TextInput, Button, View, SafeAreaView, Text, Alert, Image, ScrollView, TouchableOpacity } from 'react-native';
import Pencil from './Images/pencil.png';
//import MultiSelect from 'react-native-multiple-select';
import SelectMultiple from 'react-native-select-multiple';
import { LinearGradient } from 'expo-linear-gradient';
import { apiRepository} from '../api/apiRepository';

const conditions = [
        { label: 'Anxiety Disorders', value: '1', link: 'https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Anxiety-Disorders' },
        { label: 'Attention Deficit Hyperactivity Disorder (ADHD)', value: '2', link: 'https://www.nami.org/Learn-More/Mental-Health-Conditions/ADHD' },
        { label: 'Bipolar Disorder', value: '3', link: 'https://www.nami.org/Learn-More/Mental-Health-Conditions/Bipolar-Disorder'},
        { label: 'Borderline Personality Disorder (BPD)', value: '4', link: 'https://www.nami.org/Learn-More/Mental-Health-Conditions/Borderline-Personality-Disorder'},
        { label: 'Dual Diagnosis/Co-Occurring Disorders', value: '5', link: 'https://www.nami.org/Learn-More/Mental-Health-Conditions/Related-Conditions/Dual-Diagnosis' },
        { label: 'Early Psychosis and Psychosis', value: '6', link: 'https://www.nami.org/Learn-More/Mental-Health-Conditions/Early-Psychosis-and-Psychosis' },
        { label: 'Eating Disorders', value: '7', link: 'https://www.nami.org/Learn-More/Mental-Health-Conditions/Eating-Disorders' },
        { label: 'Obsessive-Compulsive Disorder (OCD)', value: '8', link: 'https://www.nami.org/Learn-More/Mental-Health-Conditions/Obsessive-compulsive-Disorder'},
        { label: 'Panic Disorder', value: '9', link: 'https://namicobb.org/panic-disorder/' },
        { label: 'Posttraumatic Stress Disorder (PTSD)', value: '10', link: 'https://www.nami.org/Learn-More/Mental-Health-Conditions/Posttraumatic-Stress-Disorder' },
        { label: 'Schizoaffective Disorder', value: '11', link: 'https://www.nami.org/Learn-More/Mental-Health-Conditions/Schizoaffective-Disorder' },
        { label: 'Schizophrenia', value: '12', link: 'https://www.nami.org/Learn-More/Mental-Health-Conditions/Schizophrenia' },
        { label: 'Seasonal Affective Disorder (SAD)', value: '13', link: 'https://www.nami.org/Learn-More/Mental-Health-Conditions/Depression/Major-Depressive-Disorder-with-a-Seasonal-Pattern' },
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
    
    apiRepository = new apiRepository();
    state={
        selectedItems:[],
        isShownPicker:false,
        checked:false,
        edit_triggers:false,
        edit_comforts:false,
        edit_username:false,
        edit_screenname:false,
        screen_name:'',
        username:'',
        triggers:'',
        triggers_edit:'',
        comforts:'',
        comforts_edit:'',
        screenname_edit:'',
        username_edit:'',
        index:0,
        new_username:'',
        new_screen_name:'', 
        currentAccountId:'',
        first_name:'',
        last_name:'',
        new_first_name:'',
        new_last_name:'',
        email: '',
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

    changeUsername(){
        //let regex= RegExp("/^([^.])(\w[.]{0,1})+[^.]@(?:[a-zA-z]+\.)+[a-zA-z]{2,}$");
        var new_user= prompt("Type new username ");
        if(new_user!=this.state.username && new_user!=null){
            //if(regex.test(num)){
            this.setState({new_username:new_user});
            Alert.alert("Confirmation","username succesfully changed!");
            //}
        }
        else{
            Alert.alert("Invalid Username","username rejected");
            
        }
        return false;
    }

    changeScreenName(){
        //let regex= RegExp("/^([^.])(\w[.]{0,1})+[^.]@(?:[a-zA-z]+\.)+[a-zA-z]{2,}$");
        // var new_screen= prompt("Type a new screen name ");
        // if(new_screen!=this.state.screen_name && new_screen!=null){
        //     //if(regex.test(num)){
        //     this.setState({new_screen_name:new_screen});
        //     Alert.alert("Confirmation","Screen Name succesfully changed!");
        //     //}
        // }
        var reqInfo = {
            accountId: this.state.currentAccountId,
            username: this.state.username,
            email: this.state.email,
            fname: this.state.new_first_name,
            lname: this.state.new_last_name,
        }
        this.apiRepository.updateAccount(reqInfo)
            .then(rep => {
                console.log(rep);
            })
        
        Alert.alert("Invalid Screen Name","username rejected");
            
        return false;
    }

    selectConditions(v,u){
        let selectedValues= [];

        for(var j=0;j<this.state.selectedItems.length; j++){
            selectedValues[j]=this.state.selectedItems[j].label;
        }

        var reqInfo = {
            accountId: this.props.route.params.currentAccountId,
            condition: selectedValues.toString()
          }

        console.log(v);
        console.log(u);
        this.apiRepository.postCondition(reqInfo)
        .then(rep => {
            console.log(rep.statusText);
            if(rep.statusText == "OK"){
              console.log("Conditions loaded");
            }
          });
    }

    selectComforts(v,u){
        var reqInfo = {
            accountId: this.props.route.params.currentAccountId,
            comfort: u,
          }

        console.log(v);
        console.log(u);
        this.apiRepository.postComfort(reqInfo)
        .then(rep => {
            console.log(rep.statusText);
            if(rep.statusText == "OK"){
              console.log("Comforts loaded");
            }
          });
    }

    selectTriggers(v,u){
        var reqInfo = {
            accountId: this.props.route.params.currentAccountId,
            trigger: u,
          }

        console.log(v);
        console.log(u);
        this.apiRepository.postTrigger(reqInfo)
        .then(rep => {
            console.log(rep.statusText);
            if(rep.statusText == "OK"){
              console.log("Triggers loaded");
            }
          });
    }

    render() {
        

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
                    onPress = {() => this.props.navigation.navigate('Profile', {
                        username: this.state.username,
                        screen_name: this.state.screen_name,
                        email: this.state.email,
                        currentAccountId: this.state.currentAccountId,
                    }
                    )}>
                        <Text style={styles.textStyle}>Back</Text>
                </TouchableOpacity>
                <Text>        </Text>
                <Text style={styles.textStyle}>
                    Edit Your Profile
                </Text>
                <Text>        </Text>
                </View>
                
                <Text style={styles.textStyle}>
                    Screen Name: {this.state.first_name} {this.state.last_name}
                </Text>



                <TouchableOpacity style={styles.button} onPress={()=>this.setState({edit_screenname:!this.state.edit_screenname})}>
                <Image style={styles.image} source={Pencil}></Image>
                </TouchableOpacity>
                
                <View style={{"display": this.state.edit_screenname? "block":"none",}}>
                <TextInput 
                placeholder={this.state.first_name} 
                style={{
                    //"display": this.state.edit_comforts ? "block":"none",
                    fontSize: 20,
                    fontFamily:'Cochin',
                    borderWidth:2,
                    borderColor:'#859a9b',
                    borderRadius:10,}}
                onChangeText={text => this.setState({new_first_name:text})}
                ></TextInput>
                

                {/* <TouchableOpacity onPress={()=>this.setState({first_name:this.state.new_first_name})}>
                    <Text style={styles.submitStyle}>Submit</Text>
                </TouchableOpacity> */}

                <TextInput 
                placeholder={this.state.last_name} 
                style={{
                    //"display": this.state.edit_comforts ? "block":"none",
                    fontSize: 20,
                    fontFamily:'Cochin',
                    borderWidth:2,
                    borderColor:'#859a9b',
                    borderRadius:10,}}
                onChangeText={text => this.setState({new_last_name:text})}
                ></TextInput>
                

                <TouchableOpacity
                    onPress={ () => {
                        this.setState({first_name: this.state.new_first_name});
                        this.setState({last_name: this.state.new_last_name});
                        this.changeScreenName();
                    }
                        
                }>
                    <Text style={styles.submitStyle}>Submit</Text>
                </TouchableOpacity>

            </View>



                {/* <TouchableOpacity style={styles.opacityStyle} onPress={()=>this.changeScreenName()}><Text style={styles.appButtonText}>Change Screen Name</Text></TouchableOpacity> */}
                
                
                <Text style={styles.textStyle}>
                    Username: {this.state.username}
                </Text>
                {/* <TouchableOpacity style={styles.button} onPress={()=>this.setState({edit_username:!this.state.edit_username})}>
                <Image style={styles.image} source={Pencil}></Image>
                </TouchableOpacity> */}
                
                <View style={{"display": this.state.edit_username ? "block":"none",}}>
                <TextInput 
                placeholder={this.state.username} 
                style={{
                    //"display": this.state.edit_comforts ? "block":"none",
                    fontSize: 20,
                    fontFamily:'Cochin',
                    borderWidth:2,
                    borderColor:'#859a9b',
                    borderRadius:10,}}
                onChangeText={text => this.setState({username_edit:text})}
                ></TextInput>

                <TouchableOpacity onPress={()=>this.setState({username:this.state.username_edit})}>
                    <Text style={styles.submitStyle}>Submit</Text>
                </TouchableOpacity>
            </View>

                {/* <TouchableOpacity style={styles.opacityStyle} onPress={()=>this.changeUsername()}><Text style={styles.appButtonText}>Change Username</Text></TouchableOpacity> */}




                <Text style={styles.textStyle}>
                    Conditions Info:
                </Text>

                <TouchableOpacity style={styles.opacityStyle} onPress={()=>this.selectConditions(this.state.currentAccountId, this.state.selectedItems)}><Text style={styles.textStyle}>Save Conditions</Text></TouchableOpacity>
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
                <TouchableOpacity style={styles.button} onPress={()=>this.setState({edit_triggers:!this.state.edit_triggers})}>
                     <Image style={styles.image} source={Pencil}></Image>
                </TouchableOpacity>
                </View>
                <View style={{"display": this.state.edit_triggers ? "block":"none",}}>
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
                <TouchableOpacity
                    onPress={ () => {
                        this.setState({triggers:this.state.triggers_edit});
                        this.selectTriggers(1,this.state.triggers_edit);
                    }}>
                     <Text style={styles.submitStyle}>Submit</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.bar}> 
                <Text style={styles.textStyle}>
                    Comforts: {this.state.comforts}
                </Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.setState({edit_comforts:!this.state.edit_comforts})}>
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
                <TouchableOpacity
                    onPress={ () => {
                        this.setState({comforts:this.state.comforts_edit});
                        this.selectComforts(1, this.state.comforts_edit);
                    }}>
                    <Text style={styles.submitStyle}>Submit</Text>
                </TouchableOpacity>
                </View>

            </View>
            </ScrollView>
            </LinearGradient>
            </SafeAreaView>
        );_
    }
    componentDidMount() {

        const params = this.props.route.params;
        this.setState({
        username: params.username,
        first_name: params.first_name,
        last_name: params.last_name,
        currentAccountId : params.currentAccountId,
        email: params.email,
        
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
    submitStyle:{
        fontSize: 18,
        fontFamily:'Cochin',
        color: "#859a9b",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase" 
    },

  });
export default EditProfile; 
