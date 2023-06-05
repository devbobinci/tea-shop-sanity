// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6GQi8HAZk9Tqh1kKNszB4P65UjQRPgtw",
  authDomain: "tea-shop-740f1.firebaseapp.com",
  databaseURL:
    "https://tea-shop-740f1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tea-shop-740f1",
  storageBucket: "tea-shop-740f1.appspot.com",
  messagingSenderId: "282611545376",
  appId: "1:282611545376:web:d23b2d21066c2a5a7c1345",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// Initialize Databse
export const db = getDatabase(app);
