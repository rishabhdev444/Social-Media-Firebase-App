// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3tkhB6q58wxVM3rzWAE5dIzYnp-4rc9c",
  authDomain: "fir-react-app-6bd13.firebaseapp.com",
  projectId: "fir-react-app-6bd13",
  storageBucket: "fir-react-app-6bd13.appspot.com",
  messagingSenderId: "746263950432",
  appId: "1:746263950432:web:10075d532436e827577f05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);

export const provider=new GoogleAuthProvider();

export const db=getFirestore(app);