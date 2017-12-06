//import firebase from 'firebase';

export default {


    login(value, cb) {
        return new Promise(function (resolve, reject) {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
            .then(function (res) {
                resolve(res);
                debugger;
            })
            .catch(function (err) {
                reject(err.response.data)
            })
        }); 
      

    }


}