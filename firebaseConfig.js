import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCio3bKDF184Zw8QaCugMuHsfcz_97H0V8",
  authDomain: "twin-clothing-a0c4d.firebaseapp.com",
  projectId: "twin-clothing-a0c4d",
  storageBucket: "twin-clothing-a0c4d.appspot.com",
  messagingSenderId: "396009247464",
  appId: "1:396009247464:web:8247a236e0eae83c172f5d",
  measurementId: "G-9CTYY1RLZ7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
export {app, auth, firestore, storage,database};