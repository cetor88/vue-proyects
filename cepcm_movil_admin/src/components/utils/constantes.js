var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");


export default {
    urlGetToken:'http://201.145.132.255/CEPCM_MOVIL/oauth/token?grant_type=password&client_id=restapp&client_secret=restapp&username=2&password=yhTo7LRvI2dvFxReUqzAxspzZi02',
    urlRefreshToken : 'http://201.145.132.255/CEPCM_MOVIL/oauth/token?grant_type=refresh_token&client_id=restapp&client_secret=restapp&refresh_token=',
    firebaseApp : firebase.initializeApp({
                    apiKey: "AIzaSyCh5fyrqt_djN4OTAI2Rrsej1gdZdI6OII",
                    authDomain: "colposgrado-edu-mx.firebaseapp.com",
                    databaseURL: "https://colposgrado-edu-mx.firebaseio.com",
                    projectId: "colposgrado-edu-mx",
                    storageBucket: "colposgrado-edu-mx.appspot.com",
                    messagingSenderId: "732616378596"
                }),
    db : firebase.database(),
    auth : firebase.auth(),
    
}