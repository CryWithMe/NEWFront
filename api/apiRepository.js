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
            .then(resp => resolve(resp.data))
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

    delete() {
        console.log("Deleting Account... API Call");
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}deleteAccount`, this.config)
            .then(resp => resolve(resp.data))
            .catch(resp => alert(resp));
        });
    }


    
//     getUser(userId) {
//         return new Promise((resolve, reject) => {
//             axios.get(`${this.url}/user-profile/${userId}`, this.config)
//                 .then(x => resolve(x.data))
//                 .catch(x => alert(x));
//         });
//     }

//     getSearchSitter(date, user_id) {
//         console.log("Searching for Sitters... API Call");
//         return new Promise((resolve, reject) => {
//             axios.get(`${this.url}/search/sitters/${user_id}/${date}`, this.config)
//                 .then(x => resolve(x.data))
//                 .catch(x => alert(x))
//         });
//     }

//     getSearchJob(date, user_id) {
//         console.log("Searching for Jobs... API Call");
//         return new Promise((resolve, reject) => {
//             axios.get(`${this.url}/search/jobs/${user_id}/${date}`, this.config)
//                 .then(x => resolve(x.data))
//                 .catch(x => alert(x))
//         });
//     }

//     loginUser(email, password) {
//         console.log("Login User... API Call");
//         return new Promise((resolve, reject) => {
//         axios
//           .post(`${this.url}/signin`, email, password)
//         .then(resp => resolve(resp.data))
//         .catch(resp => alert(resp));
//         });
//     }

//     registerUser(email, password) {
//         console.log("Register User... API Call");
//         return new Promise((resolve, reject) => {
//         axios
//           .post(`${this.url}/signup`, email, password)
//         .then(resp => resolve(resp.data))
//         .catch(resp => alert(resp));
//         });
//     }

//     setAvailability(userId, availability) {
//         console.log("set availability... API Call");
//         return new Promise((resolve, reject) => {
//             axios.post(`${this.url}/user/${userId}/availability`, availability)
//             .then(resp => resolve(resp.data))
//             .catch(resp => alert(resp));
//         });
//     }



//   updateUser(userID, user) {
//       console.log("Updating User... API Call");
//       return new Promise((resolve, reject) => {
//             axios.post(`${this.url}/user/${userID}/info2`, user)
//             .then(x => resolve(x.data))
//             .catch(x => alert(x));
//       });
//   }

//   addChild(userID, child) {
//     console.log("Adding child... API Call");
//     return new Promise((resolve, reject) => {
//           axios.post(`${this.url}/user/${userID}/child`, child)
//           .then(x => resolve(x.data))
//           .catch(x => alert(x));
//     });
// }


//   getRatings(userID) {
//       console.log("Fetching Ratings... API Call");
//       return new Promise((resolve, rejct) => {
//           axios.get(`${this.url}/allratings/${userID}`, this.config)
//           .then(x => resolve(x.data))
//           .catch(x => alert(x));
//       });
//   }

//   getParentBookings(userID) {
//     console.log("Fetching parent bookings... API Call");
//     return new Promise((resolve, rejct) => {
//         axios.get(`${this.url}/parentbookings/${userID}`)
//         .then(x => resolve(x.data))
//         .catch(x => alert(x));
//     });
// }

// getSitterBookings(userID) {
//     console.log("Fetching sitter bookings... API Call");
//     return new Promise((resolve, rejct) => {
//         axios.get(`${this.url}/sitterbookings/${userID}`)
//         .then(x => resolve(x.data))
//         .catch(x => alert(x));
//     });
// }

//     getApplicants(booking_id) {
//         console.log("Fetching applicants... API Call");
//         return new Promise((resolve, rejct) => {
//             axios.get(`${this.url}/applications/${booking_id}`)
//             .then(x => resolve(x.data))
//             .catch(x => alert(x));
//         });
//     }

//   getBooking(userID) {
//       console.log("Fetching Bookings... API Call");
//       return new Promise((resolve, reject) => {
//           axios.get(`${this.url}/bookings/${userID}`, this.config)
//           .then(x => resolve(x.data))
//           .catch(x => alert(x));
//       });
//   }
  
//   updateUserRating(user_Id, rated_id, is_child, rating, comment){
//     console.log("Updating rating... API Call");
//     console.log(rated_id, is_child, rating, comment);
//     let id = user_Id;
//     return new Promise((resolve, reject) => {
//         axios.post(`${this.url}/${id}/rate`, rated_id, 0, 5, "comment")
//         .then(x => resolve(x.data))
//         .catch(x => alert(x));
//     });
//   }
    
//     blockUser(blocked_id, blocker_id) {
//         console.log("Block user... API Call")
//         console.log(typeof blocker_id, typeof blocker_id);
//         return new Promise((resolve, reject) =>{
//             axios.post(`${this.url}/${blocker_id}/block`, blocked_id, this.config)
//             .then(x => resolve(x.data))
//             .catch(x => alert(x));
//         });
//     }

//     bookingRequest() {
//         console.log("Booking... API Call")
//     }
}
