"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var firebase_1 = __importDefault(require("firebase"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, APP_API_KEY = _a.APP_API_KEY, APP_AUTH_DOMAIN = _a.APP_AUTH_DOMAIN, APP_DATABASE_URL = _a.APP_DATABASE_URL, APP_PROJECT_ID = _a.APP_PROJECT_ID, APP_STORAGE_BUCKET = _a.APP_STORAGE_BUCKET, APP_MESSAGING_SENDER_ID = _a.APP_MESSAGING_SENDER_ID, APP_APP_ID = _a.APP_APP_ID, APP_MEASUREMENT_ID = _a.APP_MEASUREMENT_ID;
var firebaseConfig = {
    apiKey: APP_API_KEY,
    authDomain: APP_AUTH_DOMAIN,
    databaseURL: APP_DATABASE_URL,
    projectId: APP_PROJECT_ID,
    storageBucket: APP_STORAGE_BUCKET,
    messagingSenderId: APP_MESSAGING_SENDER_ID,
    appId: APP_APP_ID,
    measurementId: APP_MEASUREMENT_ID,
};
// console.log(firebaseConfig);
var firebaseApp = firebase_1.default.initializeApp(firebaseConfig);
var auth = firebase_1.default.auth();
exports.auth = auth;
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
