import firebase from "firebase";
import dotenv from "dotenv";

dotenv.config();

const {
    APP_API_KEY, 
    APP_AUTH_DOMAIN, 
    APP_DATABASE_URL, 
    APP_PROJECT_ID, 
    APP_STORAGE_BUCKET, APP_MESSAGING_SENDER_ID, 
    APP_APP_ID, 
    APP_MEASUREMENT_ID
} = process.env;

const firebaseConfig = {
  apiKey: APP_API_KEY,
  authDomain: APP_AUTH_DOMAIN,
  databaseURL: APP_DATABASE_URL,
  projectId: APP_PROJECT_ID,
  storageBucket: APP_STORAGE_BUCKET,
  messagingSenderId: APP_MESSAGING_SENDER_ID,
  appId: APP_APP_ID,
  measurementId: APP_MEASUREMENT_ID
};

// console.log(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };


// // Firebase App (the core Firebase SDK) is always required and
// // must be listed before other Firebase SDKs
// import firebase from "firebase/app";

// // Add the Firebase services that you want to use
// import "firebase/auth";
// // import "firebase/firestore";

// // TODO: Replace the following with your app's Firebase project configuration
// // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// var firebaseConfig = {
//     // ...
//   };
  
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);