import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBKHKa1Ne3OgcS0HOze2FtpIrjpL7KuqBk",
  authDomain: "chitchat-9fa8a.firebaseapp.com",
  databaseURL: "https://chitchat-9fa8a.firebaseio.com",
  projectId: "chitchat-9fa8a",
  storageBucket: "chitchat-9fa8a.appspot.com",
  messagingSenderId: "34274733107",
  appId: "1:34274733107:web:c2f6f1ba087df243bf8746",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
