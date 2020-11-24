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
      //   array:[
      //     {
      //     name:'Melissa',
      //     alreadyFriend:true,
      //     },
      //   {
      //     name:'Tyler',
      //     alreadyFriend:false,
      //   },
      // {
      //     name:'Chris',
      //     alreadyFriend:false,
      // },
      // {
      //     name:'Hannah',
      //     alreadyFriend:true,
      // },

      //   ],
      
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
    }

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
    }

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
      this.props.navigation.navigate('Friends', {
          currentAccountId: this.state.currentAccountId
      })
    }

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


      friendlist = () => {
        console.log('Friends is', this.state.frows[0]);
        console.log('Pending is', this.state.prows);
        if(this.state.frows.length==0){
          return(
            <View style={styles.bar}>
              <Text style={styles.textStyle}>
                No friends currently added. Add some friends above!
              </Text>
            </View>
          );
        }//end of if statement
        else{
          console.log(this.state.frows.length)
        for (var i = 0; i < this.state.frows.length; i++) {
          console.log(i);
          return(
            <View style={styles.bar}>
              <Text style={styles.textStyle}>{this.state.frows[i].fname.toString()}</Text>
              <Text style={styles.subtitleStyle}>(@{this.state.frows[i].username.toString()})</Text>
                   <View style={{
                     fontSize: 18,
                     fontFamily:'Cochin',
                     color: "#859a9b",}}>
                       
                      <TouchableOpacity
                        style={styles.profileButton}
                        onPress= { ()=> {
                          this.setState({username:this.state.frows[i].fname});
                          this.props.navigation.navigate('FriendProfile', {
                            username: this.state.frows[i].username.toString(),
                            screen_name: this.state.frows[i].fname.toString()
                          });
                        }}>
                <Text style={styles.textStyle}>Profile</Text>
                </TouchableOpacity>
                 
                </View>
                <TouchableOpacity style={styles.removeButton} onPress={()=>this.delFriend(this.state.frows[i].username)}>
                   <Text style={styles.removeTextStyle}>X</Text>
                 </TouchableOpacity>
            </View>
          );
        }
      }//end of else statement 
      };
      
      requestlist = () => {
        console.log('Friends is', this.state.frows[0]);
        console.log('Pending is', this.state.prows[0]);
        if(this.state.prows.length==0){
          return(
            <View style={styles.bar}>
              <Text style={styles.textStyle}>
                No new friend requests
              </Text>
            </View>
          );
        }//end of if statement
        else{
        for (var i = 0; i < this.state.prows.length; i++) {
          return(
            <View style={styles.bar}>
              <Text style={styles.textStyle}>{this.state.prows[i].fname.toString()}</Text>
              <Text style={styles.subtitleStyle}>(@{this.state.prows[i].username.toString()})</Text>
                   <View style={{
                     fontSize: 18,
                     fontFamily:'Cochin',
                     color: "#859a9b",}}>
                       
                      <TouchableOpacity
                        style={styles.profileButton}
                        onPress= { ()=> {
                          this.setState({username:this.state.prows[i].fname});
                          this.acceptFriend(this.state.prows[i].username.toString());
                        }}>
                <Text style={styles.textStyle}>Add Friend</Text>
                </TouchableOpacity>
                 
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={
                      ()=>this.denyFriend(this.state.prows[i].username.toString())
                      }>
                   <Text style={styles.textStyle}>Deny</Text>
                 </TouchableOpacity>
            </View>
          );
        }
      }//end of else statement 
      };

    render() {

      const params = this.props.route.params;
        this.state.accountId = params.id;

        console.log('Object is', this.state.frows[0]);

        return (
          <SafeAreaView style={styles.container}>
          <LinearGradient  colors={['#859a9b', 'white',]}>
       <ScrollView style={styles.scrollView}> 
            <View style={styles.otherStyle}>

            <TouchableOpacity style={styles.backStyle}>
            <TouchableOpacity
                    title="Back"
                    onPress= {() => this.props.navigation.navigate('Home')}
                ><Text style={{fontFamily:"Cochin"}}>Back</Text></TouchableOpacity>
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
                ><Text style={styles.textStyle}>Add Friends</Text></TouchableOpacity>
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
    }
    componentDidMount(){
      
      //console.log(this.state.info);
      this.apiRepository.getFriendList(this.props.route.params.currentAccountId)
          .then( rep => {
            
            this.setState({
              frows: rep.rows
            })
            console.log(rep);
          });
      
      this.apiRepository.getFriendRequests(this.props.route.params.currentAccountId)

      .then( rep => {
            
        console.log(rep.rows);
        this.setState({
          prows: rep.rows
        })
      });

      
      //this.apiRepository.denyFriendRequest(this.state.accountId,this.state.username);
      // .then( rep => {
            
      //   console.log(rep.rows);
      //   this.setState({
      //     prows: rep.rows
      //   })
      //   console.log(this.state.rows);
      // });

      // this.apiRepository.deleteFriend(this.delFriend('b'))
      //   .then(rep => {
      //     console.log("goodbye!");
      //   })
      

  //     this.apiRepository.sendFriendRequest(this.sendRequest('b'))
  //       .then( rep => {
  //           console.log(rep);
  //       });

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
    //fontFamily:'Cochin',
    backgroundColor: "#859a9b",
    borderRadius:10,
    color:"white",
    textAlign:"center",
    padding:2,
  },
  removeTextStyle: {
   // padding:6,
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

