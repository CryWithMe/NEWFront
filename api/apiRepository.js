import axios from "axios";

export class apiRepository {
    //url = "http://localhost:3003";
    url = "http://3.14.51.76/";


    getTest() {
        return new Promise((resolve, reject) => {
            console.log("Establishing Connection");
            axios.get(`${this.url}`, this.config )
                .then(x => resolve(x.data))
                .catch(x => alert(x));
        });
    }

    registerUser(body) {
        console.log("Registering User... API Call");
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}createAccount`, body)
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
        });
    }

    login(info) {
        console.log("Logging in User... API Call");
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}login`, info)
            .then(resp => resolve(resp))
            .catch(resp => alert(resp));
        });
    }

    logout() {
        console.log("Logging Out... API Call");
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}logout`, this.config)
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
        });
    }

    delete(info) {
        console.log("Deleting Account... API Call");
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}deleteAccount`, info)
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
        });
    }

    getFriendList(info) {
        console.log("Getting Friends List... API Call");
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}friendList/${info}`, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));    
            });
    }

    getFriendRequests(info) {
        console.log("Getting Friend Requests... API Call");
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}friendRequests/${info}`, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));    
            });
    }

    sendFriendRequest(info) {
        console.log("Sending Friend Request... API Call");
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}friendRequest`, info)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));    
            });
    }

    acceptFriendRequest(info) {
        console.log("Accepting Friend Request... API Call");
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}acceptFriendRequest`, info)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));    
            });
    }

    denyFriendRequest(info) {
        console.log("Denying Friend Request... API Call");
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}denyFriendRequest`, info)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));    
            });
    }

    getUser(info) {
        console.log("Getting User... API Call");
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}accountInfo/${info}`, this.config)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));    
            });
    }

    deleteFriend(info) {
        console.log("Getting User... API Call");
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}deleteFriend`, info)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));    
            });
    }


    searchAccount(info) {
        console.log("Search for an account... API Call");
        console.log(info);
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}searchAccount/${info}`, this.config)
                .then(resp => resolve(resp))
                .catch(resp => alert(resp));    
            });
    }
    
    postToken(info){
        console.log("Sending token... API Call");
        console.log(info);
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}token`, info)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));    
            });
    }

    postCondition(info){
        console.log("Sending conditions... API Call");
        console.log(info);
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}condition`, info)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });

    }

    doesExist(info) {
        console.log("Checking if they exist... API Call");
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}doesExist/${info}`, this.config)

                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));    
            });
    }

    postResponse(info){
        console.log("Sending an event response... API Call");
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}eventResponse`, info)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));    
            });
    }

    getEventList(info){
        console.log("Search for eventlist... API Call");
        console.log(info);
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}eventList/${info}`, this.config)
                .then(resp => resolve(resp))
                .catch(resp => alert(resp));    
            });
    }
    

    postEvent(info){
        console.log(info);
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}event`, info)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));    
            });
    }

    updateAccount(info){
        console.log("Updating Account... API Call");
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}updateAccount`, info)
                .then(resp => resolve(resp.data))
                .catch(resp => alert(resp));
        });
    }

    updatePassword(info){
        console.log("Updating Password... API Call");
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}changePassword`, info)
                .then(resp => resolve(resp))
                .catch(resp => alert(resp));
        });
    }

}
