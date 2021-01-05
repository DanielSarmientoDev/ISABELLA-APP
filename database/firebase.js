
import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYjYgeHu7gsdjq7w7I1nyvTtrmPGYI7bE",
  authDomain: "isabella-4db56.firebaseapp.com",
  databaseURL: "https://isabella-4db56-default-rtdb.firebaseio.com",
  projectId: "isabella-4db56",
  storageBucket: "isabella-4db56.appspot.com",
  messagingSenderId: "923053221749",
  appId: "1:923053221749:web:4f0be33da3eb155a2d953c",
  measurementId: "G-G8DBXTF42M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};