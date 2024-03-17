// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase, ref, onValue, get, set, remove, update, DatabaseReference } from "firebase/database";
import { User } from "../Model/User";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getDatabase(app);

async function writeUserData(user:User) {
  await set(ref(db, user.classID + "/students/" + user.fName + " " + user.lName), {
    DOB : user.DOB,
    score : user.score,
    grade : user.grade
  }).catch((error) => {
    // this is 
    console.log(error.message);
  });

  await update(ref(db, user.classID), {
    className: user.className
  })
}



async function deleteUserData(classid: string, name:string) {
  if (!classid) {
    return;
  }
  await remove(ref(db, classid + "/students/" + name)).catch((error) => {
    console.log(error.message);
  });
}

export { auth, writeUserData, deleteUserData, db};

