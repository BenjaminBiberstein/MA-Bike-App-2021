import { createStore } from 'vuex'
//import { ids } from 'webpack';
import {auth, usersCollection, rideCollection, rideDataCollection, 
} from '../inclueds/firebase'
import { query, orderBy, where, getDocs, updateDoc, doc, setDoc, deleteDoc 
} from "firebase/firestore";  
import router from '../router';




export default createStore({
  state: {
    userLoggeIn: false,
    userRiding: false,
    userId: null,
    rideData: [],
    rideDataRides: [],
    userData: {},
    fitnessLevelMultiplikator: [1.2, ],
    rideId: null,
  },
  getters: {
    //getting rideData
    rideData(state) {
      return state.rideData
    },
    ride(state) {
      return (rideId) => {
        //ride.rideId refers to the ride Id in Firebase rideId to the Id from the url
        return state.rideData.find(ride => ride.rideId === rideId)
      };
    },
    //getting RideDataRides
    getRideDataRides(state) {
      return state.rideDataRides
    },
    getUser(state) {
      return state.userData
    }
    
  },
  mutations: {
    toggleAuth(state) {
      state.userLoggeIn = !state.userLoggeIn;
    },
    toggleRideState(state) {
      state.userRiding = !state.userRiding;
    },
    createUserRideId(state) {
      //creates rideId
      state.rideId = 'rideId' + Math.round(Math.random()*100000);
    },
    storeRideData(state, data) {
      state.rideData = data;
    },
    storeRideDataRides(state, data) {
      state.rideDataRides = data;
    },
    storeUserData(state, data) {
      state.userData = data
    },
  },
  actions: {
    /* Login user */
    async login({commit}, payload) {
      await auth.signInWithEmailAndPassword(payload.email,payload.password);

      commit('toggleAuth');
    },
    /* Regestering user Email/Password saving user data */
    async register({commit}, payload) {
      const userCred = await auth.createUserWithEmailAndPassword(
        payload.email, payload.password
      );
      await setDoc(doc(usersCollection, userCred.user.uid), {
        email: payload.email,
        age: payload.age,
        height: payload.height,
        weight: payload.weight,
        fitnessLevel: payload.fitnessLevel,
        uid: userCred.user.uid,
        gender: payload.gender
      })
      commit('toggleAuth');
    },
    /* Keeping user loged in */
    init_login({commit}) {
      const user = auth.currentUser;

      if(user) {
        commit('toggleAuth');
      }
    },
    /* signout */
    async signout({commit}) {
      await auth.signOut();
      commit('toggleAuth');
    },
    async reloadPage() {
      await router.push({path: '/ridingSelector'})
      setTimeout(window.location.reload(true), 5000)
      
    },
    //add ride datat
    async startRide({commit, state}, payload) {

      state.rideDataRides.push({lat: payload.lat, lng: payload.lng})

      //Add UID
      const uid = auth.currentUser.uid
      
      //Create Date from https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
      const d = new Date();
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
      const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
      const date = da + '/' + mo + '/' + ye
      //First time function is called
      if(!state.userRiding) {
        //calls rideId create function
        commit('createUserRideId')
        await setDoc(doc(rideCollection), {
          name: state.rideId,
          date: date,
          user: uid,
          rideId: state.rideId,
          timestamp: payload.timestamp
        })
        await setDoc(doc(rideDataCollection), {
          lat: payload.lat,
          lng: payload.lng,
          speed: payload.speed,
          timestamp: payload.timestamp,
          user: uid,
          rideId: state.rideId
        })
        commit('toggleRideState')        
      }
      //second time function is called
      else {
        await setDoc(doc(rideDataCollection),{
          lat: payload.lat,
          lng: payload.lng,
          speed: payload.speed,
          timestamp: payload.timestamp,
          user: uid,
          rideId: state.rideId
        })
      }

    },
    async endRide({commit, state}) {
      state.rideDataRides = [];
      commit('toggleRideState');
    },
    async getRideData(context) {
      //querying all rides of current user
      const q = await query(rideCollection, orderBy("timestamp", "desc"), where("user", "==", auth.currentUser.uid))
      const querySnapshot = await getDocs(q)
      let rideData = []
      querySnapshot.forEach(doc => {
        const data = {
          date: doc.data().date,
          name: doc.data().name,
          rideId: doc.data().rideId,
          timestamp: doc.data().timestamp,
        }
        rideData.push(data)
        //storing data globbaly
        context.commit('storeRideData', rideData)
      })
    },
    async getRideDataRides({commit}, rideId) {
      //querying all rides of current user
      const q = await query(rideDataCollection, orderBy("timestamp", "desc"), where("rideId", "==", rideId));
      const querySnapshot = await getDocs(q);
      let rideDataRides = [];
      //storing rides in array
      querySnapshot.forEach(doc => {
        const data = {
          lat: doc.data().lat,
          lng: doc.data().lng,
          rideId: doc.data().rideId,
          speed: doc.data().speed,
          timestamp: doc.data().timestamp,
        }
        rideDataRides.push(data)
        //storing data globbaly
        commit('storeRideDataRides', rideDataRides)
      })
    },
    async getUserData({commit}) {
      //querying user
      const q = query(usersCollection, where("uid", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        const data = {
          age: doc.data().age,
          height: doc.data().height,
          gender: doc.data().gender,
          fitnessLevel: doc.data().fitnessLevel,
          weight: doc.data().weight,
        } 
        //storing data globbaly
        commit('storeUserData', data) 
      })
    },
    async updateUserData(state ,payload) {
      //getting the document
      const updateRef = doc(usersCollection, auth.currentUser.uid)
      //updating the document
      await updateDoc(updateRef, {
        age: payload.age,
        height: payload.height,
        weight: payload.weight,
        fitnessLevel: payload.fitnessLevel,
        gender: payload.gender
      })
      state 
    },
    //Deletes ride and rideData documents
    async deletRide({state}, payload) {
      //querying ride document and deleting
      const q1 = await query(rideCollection, where("rideId", "==", payload.rideId))
      const querySnapshot1 = await getDocs(q1);
      querySnapshot1.forEach(docValue => {
        deleteDoc(doc(rideCollection, docValue.id))
      })
      //querying rideData documents and deleting
      const q2 = await query(rideDataCollection, where("rideId", "==", payload.rideId))
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(docValue => {
        deleteDoc(doc(rideDataCollection, docValue.id))
      })
      setTimeout(window.location.reload(true), 500)
      state
    },
    async nameRide({state}, payload) {
      //quering ride 
      const q = await query(rideCollection, where("rideId", "==", payload.rideId))
      const querySnapshot = await getDocs(q);
      let docId = [];
      querySnapshot.forEach(doc => {
        docId.push(doc.id)

      })
      //updating the ride
      const updateRef = doc(rideCollection, docId[0])
      updateDoc(updateRef, {
        name: payload.name
      })
      state      
    }
  },
  modules: {
  }
})


