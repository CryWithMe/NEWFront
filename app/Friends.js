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
        accountId: this.state.accountId,
      }
      return reqInfo;
    
    }
    delFriend(u) {
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
        console.log('Friends is', this.state.frows[0]);
        console.log('Pending is', this.state.prows);

        for (var i = 0; i < this.state.frows.length; i++) {
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
                        onPress= {() =>this.setState({username:element.name}),()=>this.props.navigation.navigate('FriendProfile', {
                          username:this.state.frows[i].fname})}
                      >
                <Text style={styles.textStyle}>Profile</Text>
                </TouchableOpacity>
                 
                </View>
                <TouchableOpacity style={styles.removeButton}>
                   <Text style={styles.removeTextStyle}>X</Text>
                 </TouchableOpacity>
            </View>
          );
        }
        // this.state.rows.forEach((row)=>{
        //   console.log(row);
        //   return (
        //     <View style={styles.nonbar}>
        //    {/* <Text style={styles.textStyle}>Hello</Text> */}
        //   <Text style={styles.textStyle}>{row}</Text>
        //   </View>
        // );
         // });
        // for(var key in this.state.rows){
        // return(
        
          
        // <Text>{this.state.rows[key]}</Text>
        //   );
       // }
        
        // return this.state.rows.map(element => {
        //   return (
        //     <View style={styles.bar}>
        //        <Text style={styles.textStyle}>{fname[element]}</Text> 
        //       <TouchableOpacity style={
        //         //{"display": element.alreadyFriend ? "none":"block",
        //         //'backgroundColor-color':element.alreadyFriend ? "gray":"#859a9b" , 
        //         {"border-radius":10, padding:2,margin:4,
        //       }}>
        //         {/* <View style={
        //           {"display": element.alreadyFriend ? "none":"block",
        //           fontSize: 18,
        //           fontFamily:'Cochin',
        //           backgroundColor: "#859a9b",
        //           borderRadius:10,
        //           padding:2,
        //           }}>
        //           <Text style={styles.textStyle}>Add Friend</Text>
        //           </View>
        //           </TouchableOpacity>
        //       <TouchableOpacity 
        //       onPress={() =>this.setState({profileName:element.name})}
              
        //       style={
        //         {"display": element.alreadyFriend ? "block":"none",
        //         'backgroundColor':element.alreadyFriend ? "gray":"#859a9b" , 
        //         "border-radius":10,
        //          padding:2,
        //          margin:4,
        //          }}>
        //            <View style={{
        //              "display": element.alreadyFriend ? "block":"none",
        //              fontSize: 18,
        //              fontFamily:'Cochin',
        //              color: "#859a9b",}}>
        //               <TouchableOpacity
        //                 style={styles.profileButton}
        //                 onPress= {() =>this.setState({username:element.name}),()=>this.props.navigation.navigate('FriendProfile', {
        //                   username:element.name})}
        //               >
        //         <Text style={styles.textStyle}>Profile</Text>
        //         </TouchableOpacity>   

        //                </View>*/}
        //                </TouchableOpacity>
        //       </View> 
        //   );
        // });
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
          .then( rep => {
            
            this.setState({
              frows: rep.rows
            })
            console.log(rep);
          });
      
      this.apiRepository.getFriendRequests(this.state.accountId)

      .then( rep => {
            
        console.log(rep.rows);
        this.setState({
          prows: rep.rows
        })
        console.log(this.state.rows);
      });

      
      //this.apiRepository.denyFriendRequest(this.state.accountId,this.state.username);
      // .then( rep => {
            
      //   console.log(rep.rows);
      //   this.setState({
      //     prows: rep.rows
      //   })
      //   console.log(this.state.rows);
      // });

      this.apiRepository.deleteFriend(this.delFriend('b'))
        .then(rep => {
          console.log("goodbye!");
        })
      

      // this.apiRepository.sendFriendRequest(this.sendRequest('b'))
      // .then( rep => {
            
      //   console.log(rep);
      // });

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
    display:"inline",
    fontSize: 18,
    fontFamily:'Cochin',
    backgroundColor: "#859a9b",
    borderRadius:10,
  },

  removeButton:{
    display:"inline",
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
      display:"inline",
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

