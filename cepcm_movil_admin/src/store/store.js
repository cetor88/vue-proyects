import Vue from 'vue';
import Vuex from 'vuex';
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

const firebaseApp = firebase.initializeApp({
// Populate your firebase configuration data here.
  /* apiKey: "AIzaSyAP08oypfpPnJmm8Mn8ykBLKo8zQxqhJnc",
  authDomain: "cepcm-admin.firebaseapp.com",
  databaseURL: "https://cepcm-admin.firebaseio.com",
  projectId: "cepcm-admin",
  storageBucket: "cepcm-admin.appspot.com",
  messagingSenderId: "65686126645" */
    apiKey: "AIzaSyCh5fyrqt_djN4OTAI2Rrsej1gdZdI6OII",
    authDomain: "colposgrado-edu-mx.firebaseapp.com",
    databaseURL: "https://colposgrado-edu-mx.firebaseio.com",
    projectId: "colposgrado-edu-mx",
    storageBucket: "colposgrado-edu-mx.appspot.com",
    messagingSenderId: "732616378596"
});


Vue.use(Vuex);


export const store = new Vuex.Store({
    state:{
        cantidad : 0,
        db : firebase.database(),
        auth : firebase.auth(),
        autenticado : false,
        currentUser : null,
        //provide:firebase.auth().GoogleAuthProvider(),
    }
})