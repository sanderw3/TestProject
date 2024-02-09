// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getAuth } from "firebase/auth";
import { getDatabase, ref, set, remove } from "firebase/database";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQzUW-1hs1g0KAS3zIx8muKoZ1wgoCj-k",
  authDomain: "testproject-3d570.firebaseapp.com",
  databaseURL: "https://testproject-3d570-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "testproject-3d570",
  storageBucket: "testproject-3d570.appspot.com",
  messagingSenderId: "880541326271",
  appId: "1:880541326271:web:bf2649024799ea4ba89f0a",
  measurementId: "G-7WW7QERY9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const auth = initializeAuth(app, {
//   // to add persistance (for like "remember me")
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
const auth = getAuth(app);
const database = getDatabase(app);


function writeUserData(username: string, id: string) {

  const db = getDatabase();
  set(ref(db, 'users/' + id), {
    username: username
  }).catch((error) => {
    console.log(error.message);
  });
}


function readUserData(userId: string) {
  return ref(getDatabase(), 'users/' + userId);
}


function deleteUserData(userId: string) {
  if (!userId) {
    return;
  }
  const db = getDatabase();
  remove(ref(db, 'users/' + userId)).catch((error) => {
    console.log(error.message);
  });
}

export { auth, writeUserData, readUserData, deleteUserData };

