import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import { initializeApp } from 'firebase/app';
import { getFirestore, collection,  } from "firebase/firestore"


 // Your web app's Firebase configuration
 var firebaseConfig = Your Firebase Configuration;
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
