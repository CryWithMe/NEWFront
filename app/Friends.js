import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, ViewPagerAndroid, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { apiRepository} from '../api/apiRepository';
import { CurrentRenderContext } from "@react-navigation/native";

class Friends extends React.Component{

  apiRepository = new apiRepository();

    state = {
        friend_account:true, 
        textMessage:'',
        username:'',
        // will be part of a list
        array:[
          {
          name:'Melissa',
          alreadyFriend:true,
          },
        {
          name:'Tyler',
          alreadyFriend:false,
        },
      {
          name:'Chris',
          alreadyFriend:false,
      },
      {
          name:'Hannah',
          alreadyFriend:true,
      },

        ],
      
      accountId: '',
      

    };

    sendRequest(u) {
      var reqInfo = {
        username: u,
        accountId: this.state.accountId,
      }
      return reqInfo;
    
    }


    goToProfile(){
        return <Redirect to={`/Profile/${this.state.profileName}`}/>
    }

    changeColor = () => {
      let key = 2;
  this.setState(prevState => ({
  todoItems: prevState.todoItems.map(
    el => el.key === key? { ...el, alreadyFriend: true }: el
  )
}))
};

      list = () => {
        return this.state.array.map(element => {
          return (
            <View style={styles.bar}>
              <Text style={styles.textStyle}>{element.name}</Text>
              <TouchableOpacity style={
                {"display": element.alreadyFriend ? "none":"block",
                'backgroundColor-color':element.alreadyFriend ? "gray":"#859a9b" , 
                "border-radius":10, padding:2,margin:4,
              }}>
                <View style={
                  {"display": element.alreadyFriend ? "none":"block",
                  fontSize: 18,
                  fontFamily:'Cochin',
                  backgroundColor: "#859a9b",
                  borderRadius:10,
                  padding:2,
                  }}>
                  <Text style={styles.textStyle}>Add Friend</Text>
                  </View>
                  </TouchableOpacity>
              <TouchableOpacity 
              onPress={() =>this.setState({profileName:element.name})}
              
              style={
                {"display": element.alreadyFriend ? "block":"none",
                'backgroundColor':element.alreadyFriend ? "gray":"#859a9b" , 
                "border-radius":10,
                 padding:2,
                 margin:4,
                 }}>
                   <View style={{
                     "display": element.alreadyFriend ? "block":"none",
                     fontSize: 18,
                     fontFamily:'Cochin',
                     color: "#859a9b",}}>
                      <TouchableOpacity
                        style={styles.profileButton}
                        onPress= {() =>this.setState({username:element.name}),()=>this.props.navigation.navigate('FriendProfile', {
                          username:element.name})}
                      >
                <Text style={styles.textStyle}>Profile</Text>
                </TouchableOpacity>  

                       </View>
                       </TouchableOpacity>
              {/* <Button onClick={ () => this.changeColor()} title = "Add Friend" style= {{"display": element.alreadyFriend ? "none" : "inline"}} color = {element.alreadyFriend ? "#859a9b": "gray"} ></Button>*/}  
              </View> 
          );
        });
      };
      
    render() {

      const params = this.props.route.params;
        this.state.accountId = params.id;

        return (
          <SafeAreaView style={styles.container}>
          <LinearGradient  colors={['#859a9b', 'white',]}>
       <ScrollView style={styles.scrollView}> 
            <View style={styles.otherStyle}>
               <TouchableOpacity
                    style={styles.backStyle}
                    onPress= {() => this.props.navigation.navigate('Home')}
                >
                 <Text style={styles.textStyle}>Back</Text>   
                </TouchableOpacity>  

                <Text style={styles.titleStyle}>
                    Friends
                </Text>
               
                <View className="form-group">

                <TouchableOpacity style={styles.linkStyle}>
                <TouchableOpacity 
                    title="Add Friends"
                    onPress= {() => this.props.navigation.navigate('FriendSearch')}
                ><Text style={styles.textStyle}>Add Friends</Text></TouchableOpacity>
                </TouchableOpacity>

                <View style={styles.nonbar}>

               {this.list()}

                </View>
            </View>
            </View>
            </ScrollView>
            </LinearGradient>
            </SafeAreaView>
        );_
    }
    componentDidMount(){
      
      //console.log(this.state.info);
      this.apiRepository.getFriendList(this.state.accountId)
          .then(console.log("YO"));
      
      this.apiRepository.getFriendRequests(this.state.accountId)
        .then(rep => {
          console.log(rep);
        });
      
      
        this.apiRepository.acceptFriendRequest(this.sendRequest('b'))
          .then(console.log("YO"));
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

  linkStyle:{
    fontFamily:'Cochin',
        backgroundColor: '#859a9b',
        borderRadius: 60,
        padding: 10,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
        marginHorizontal:160,
        //justifyContent:"center",
        textAlign:"center", 
  },


  appButtonText: {
    fontSize: 18,
    fontFamily:'Cochin',
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

  // addButton:{
  //   color:'gray,'
  // },

  titleStyle:{
    borderWidth:4,

    backgroundColor:"rgba(255, 255, 255, 0.53)",
    borderColor:"#859a9b",
    margin:10,
    marginHorizontal:60,
    borderRadius:20,
    padding:6,
    fontSize: 20,
    fontFamily:'Cochin',
    textAlign:"center",
  },

  bar:{
    margin:10,
    flexDirection: 'row', 
    flexWrap:'wrap',
},

nonbar:{
  borderWidth:4,
  backgroundColor:"rgba(255, 255, 255, 0.53)",
  borderColor:"#859a9b",
  margin:10,
  marginHorizontal:60,
  borderRadius:20,
  alignItems:"center",
  flexDirection: 'column', 
  flexWrap:'nowrap',
  

},
    textStyle: {
      padding:6,
      fontSize: 20,
      fontFamily:'Cochin',
    },
    otherStyle: {
      //justifyContent: 'center',
      //backgroundColor: "#859a9b",
      //backgroundColor: 'linear-gradient(#95afb4,white)',
    },
    container: {
      flex: 1,
     // marginTop: Constants.statusBarHeight,
    },
    scrollView: {
      marginHorizontal: 20,
    },
  });
export default Friends; 

