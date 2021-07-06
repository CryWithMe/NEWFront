import * as React from "react";
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, Image, TouchableOpacity, ViewPagerAndroid, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { apiRepository} from '../api/apiRepository';

class Friends extends React.Component{

  apiRepository = new apiRepository();

  state = {
    friend_account:true, 
    textMessage:'',
    username:'',
    accountId: '',
    frows: [],
    prows: [],
  };

  sendRequest(u) {

    var reqInfo = {
      username: u,
      accountId: this.props.route.params.currentAccountId,
    }

    this.apiRepository.sendFriendRequest(reqInfo)
      .then(rep => {
        if(rep.statusText == "OK"){
          console.log("Friend Request Sent");
        }
      })

  }// end sendRequest()

  delFriend(u) {
    var reqInfo = {
      username: u,
      accountId: this.props.route.params.currentAccountId,
    }

    this.apiRepository.deleteFriend(reqInfo)
      .then(rep => {
        if(rep.statusText == "OK"){
          console.log("Friend Deleted");
        }
     })
  }// end delFriend

  acceptFriend(u) {
    var reqInfo = {
      username: u,
      accountId: this.props.route.params.currentAccountId,
    }

    this.apiRepository.acceptFriendRequest(reqInfo)
      .then(rep => {
        if(rep.statusText == "OK"){
          console.log("Friend Accepted");
        }
      })
  }// end acceptFriend

  denyFriend(u) {
    var reqInfo = {
      username: u,
      accountId: this.props.route.params.currentAccountId,
    }

    this.apiRepository.denyFriendRequest(reqInfo)
      .then(rep => {
        if(rep.statusText == "OK"){
          console.log("Friend Denied");
        }
      })

    this.props.navigation.navigate('Friends', {
      currentAccountId: this.state.currentAccountId
    })

  }// end denyFriend

  goToProfile() {
    return <Redirect to={`/Profile/${this.state.profileName}`}/>
  }// end goToProfile

  changeColor = () => {
    let key = 2;
    this.setState(prevState => ({
      todoItems: prevState.todoItems.map(
        el => el.key === key? { ...el, alreadyFriend: true }: el
      )
    }))
  }; // ????


  friendlist = () => {
    if(this.state.frows.length==0){
      return(
        <View style={styles.bar}>
          <Text style={styles.textStyle}>
            No friends currently added. Add some friends above!
          </Text>
        </View>
      );
    }//end of if statement
    else {
      return this.state.frows.map(element => {
        return(
          <View style={styles.bar}>
            <Text style={styles.textStyle}>{element.fname.toString()}</Text>
            <Text style={styles.subtitleStyle}>(@{element.username.toString()})</Text>
            <View style={{
              fontSize: 18,
              fontFamily:'Cochin',
              color: "#859a9b",}}
            >
              <TouchableOpacity
                style={styles.profileButton}
                onPress= { ()=> {
                  this.setState({username:element.fname});
                  this.props.navigation.navigate('FriendProfile', {
                    username: element.username.toString(),
                    screen_name: element.fname.toString() + ' ' + element.lname.toString(),
                  });
                }}
              >
                <Text style={styles.textStyle}>Profile</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={()=>this.delFriend(element.username)}>
              <Text style={styles.removeTextStyle}>X</Text>
            </TouchableOpacity>
          </View>
        );
      });
    }//end of else statement 
  };// end friendsList()
      
  requestlist = () => {
    if(this.state.prows.length==0){
      return(
        <View style={styles.bar}>
          <Text style={styles.textStyle}>
            No new friend requests
          </Text>
        </View>
      );
    }//end of if statement
    else {
      return this.state.prows.map(element => {
        return(
          <View style={styles.bar}>
            <Text style={styles.textStyle}>{element.fname.toString()}</Text>
            <Text style={styles.subtitleStyle}>(@{element.username.toString()})</Text>
            <View style={{
              fontSize: 18,
              fontFamily:'Cochin',
              color: "#859a9b",}}
            >
              <TouchableOpacity
                style={styles.profileButton}
                onPress= { ()=> {
                  this.setState({username: element.fname});
                  this.acceptFriend(element.username.toString());
                  this.props.navigation.navigate('FriendProfile', {
                    currentAccountId: this.props.route.params.currentAccountId,
                    username: element.username.toString(),
                    screen_name: element.fname.toString() + ' ' + element.lname.toString(),
                  })
                }}
              >
                <Text style={styles.textStyle}>Add Friend</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={ ()=>this.denyFriend(element.username.toString())}
            >
              <Text style={styles.textStyle}>Deny</Text>
            </TouchableOpacity>
          </View>
        );
      });
    }//end of else statement 
  };// endRequestList()

  render() {
    const params = this.props.route.params;
    this.state.accountId = params.id;
    return (
      <SafeAreaView style={styles.container}>
      <LinearGradient  colors={['#859a9b', 'white',]}>
      <ScrollView style={styles.scrollView}> 

      <View style={styles.otherStyle}>
        <TouchableOpacity style={styles.backStyle}>
          <TouchableOpacity
            title="Back"
            onPress= {() => this.props.navigation.navigate('Home')}
          >
            <Text style={{fontFamily:"Cochin"}}>
              Back
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.titleStyle}>
          Friends
        </Text>
        <View className="form-group">
          <TouchableOpacity style={styles.linkStyle}>
            <TouchableOpacity 
              title="Add Friends"
              onPress= {() => this.props.navigation.navigate('FriendSearch', {
                currentAccountId: this.props.route.params.currentAccountId
              })}
            >
              <Text style={styles.textStyle}>
                  Add Friends
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.nonbar}>
            {this.friendlist()}
            {this.requestlist()}
          </View>
        </View>
      </View>

      </ScrollView>
      </LinearGradient>
      </SafeAreaView>
    );_
  }// end render

  componentDidMount(){

      this.apiRepository.getFriendList(this.props.route.params.currentAccountId)
        .then( rep => {
          this.setState({
            frows: rep.rows
          })
        });
      
      this.apiRepository.getFriendRequests(this.props.route.params.currentAccountId)
        .then( rep => {     
          this.setState({
            prows: rep.rows
          })
        });

  }

}// end Friends

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
        marginRight:400,
        flexDirection:"row",
        textAlign:"center",
  },

  profileButton:{
   
    fontSize: 18,
    fontFamily:'Cochin',
    backgroundColor: "#859a9b",
    borderRadius:10,
  },

  removeButton:{

    fontSize: 18,
    backgroundColor: "#859a9b",
    borderRadius:10,
    color:"white",
    textAlign:"center",
    padding:2,
  },
  removeTextStyle: {
    fontSize: 20,
    fontWeight:"bold",
    color:"white",
  },
  subtitleStyle:{
 
      padding:6,
      fontSize: 20,
      fontFamily:'Cochin',
      fontStyle:"italic",
      color:"gray",
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

    },
    container: {
      flex: 1,
    },
    scrollView: {
      marginHorizontal: 20,
    },

    

  });
export default Friends; 

