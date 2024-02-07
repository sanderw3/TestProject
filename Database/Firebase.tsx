// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQzUW-1hs1g0KAS3zIx8muKoZ1wgoCj-k",
  authDomain: "testproject-3d570.firebaseapp.com",
  projectId: "testproject-3d570",
  storageBucket: "testproject-3d570.appspot.com",
  messagingSenderId: "880541326271",
  appId: "1:880541326271:web:bf2649024799ea4ba89f0a",
  measurementId: "G-7WW7QERY9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

export default auth