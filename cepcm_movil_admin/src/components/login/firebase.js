import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  // Populate your firebase configuration data here.
  apiKey: "AIzaSyAP08oypfpPnJmm8Mn8ykBLKo8zQxqhJnc",
    authDomain: "cepcm-admin.firebaseapp.com",
    databaseURL: "https://cepcm-admin.firebaseio.com",
    projectId: "cepcm-admin",
    storageBucket: "cepcm-admin.appspot.com",
    messagingSenderId: "65686126645"
});

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
export const auth = firebaseApp.auth();