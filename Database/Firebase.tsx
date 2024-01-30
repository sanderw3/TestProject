// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove} from "firebase/database";
import { User } from "../Model/User";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ5_eBIAKm5VGB4RHqSB42elJoDBm7in0",
  authDomain: "myfirstapp-858ad.firebaseapp.com",
  databaseURL: "https://myfirstapp-858ad-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myfirstapp-858ad",
  storageBucket: "myfirstapp-858ad.appspot.com",
  messagingSenderId: "389922398932",
  appId: "1:389922398932:web:b4a1320e7a9609f311d141"
};


// Initialize Firebase
const DBapp = initializeApp(firebaseConfig);

// write data to the database
export function writeUserData(user: User) {
  const db = getDatabase(DBapp);
  set(ref(db, 'Users/' + user.userId), {
    username: user.name,
    email: user.email,
    profile_picture : user.imageUrl
  });
}

// read data from the database
export function readUserData(userId: number) {
  const db = getDatabase(DBapp);
  const starCountRef = ref(db, 'Users/' + userId);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

// delete data from the database
export function deleteUserData(userId: number) {
  const db = getDatabase(DBapp);
  remove(ref(db, 'Users/' + userId));
}
