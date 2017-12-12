var firebase = require("firebase/app");
  require("firebase/auth");
  require("firebase/database");



  const firebaseApp = firebase.initializeApp({
  // Populate your firebase configuration data here.
    apiKey: "AIzaSyAP08oypfpPnJmm8Mn8ykBLKo8zQxqhJnc",
    authDomain: "cepcm-admin.firebaseapp.com",
    databaseURL: "https://cepcm-admin.firebaseio.com",
    projectId: "cepcm-admin",
    storageBucket: "cepcm-admin.appspot.com",
    messagingSenderId: "65686126645"
  });

const db = firebase.database();
export default {

    obtenerMenu(referencia) {
        db.ref(referencia).on('value', function(snapshot) {
            snapshot.val();
        });
    }
    
    
}