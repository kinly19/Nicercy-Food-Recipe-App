import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYvsVYh5RMNRubQ-pYXtwd6b4itWEZxok",
  authDomain: "nicercy-recipe-app.firebaseapp.com",
  projectId: "nicercy-recipe-app",
  storageBucket: "nicercy-recipe-app.appspot.com",
  messagingSenderId: "1019319478973",
  appId: "1:1019319478973:web:77c2cfd4fcd9265b6d65d4",
  measurementId: "G-1XLEYE834L"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);