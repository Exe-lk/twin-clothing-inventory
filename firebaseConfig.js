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
  apiKey: "AIzaSyAvyoRkeqnKXXoLpwxRKF-5etrbHtpjzH0",
  authDomain: "exelk-pos.firebaseapp.com",
  projectId: "exelk-pos",
  storageBucket: "exelk-pos.appspot.com",
  messagingSenderId: "798417359656",
  appId: "1:798417359656:web:c303e409fb7d5a35da761d",
  measurementId: "G-M675QRMR8G"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
export {app, auth, firestore, storage,database};