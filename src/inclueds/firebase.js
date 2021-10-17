import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import { initializeApp } from 'firebase/app';
import { getFirestore, collection,  } from "firebase/firestore"


 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBmmzkxDdFNCnsEk-0LaD7g_iI3UDPeHL0",
    authDomain: "bike-app-2021.firebaseapp.com",
    projectId: "bike-app-2021",
    storageBucket: "bike-app-2021.appspot.com",
    messagingSenderId: "460887948922",
    appId: "1:460887948922:web:1eac63aa165939432cc5c3"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = getFirestore();

const rideCollection = collection(db, 'rides')
const rideDataCollection = collection(db, 'rideData');
const usersCollection = collection(db, 'users');

export {
  auth,
  db,
  usersCollection,
  rideCollection,
  rideDataCollection
}