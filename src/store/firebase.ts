import { initializeApp } from "firebase/app"
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// todo: в переменную process.env не передаются значения из файла .env.local
// console.log(process.env)
const REACT_APP_FIREBASE_API_KEY = "AIzaSyDiCPZNN8RXzMYtVqHssKzF2uQq5O5g6Nw"
const REACT_APP_FIREBASE_AUTH_DOMAIN = "todos-5bbd0.firebaseapp.com"
const REACT_APP_FIREBASE_DATABASE_URL = "https://todos-5bbd0-default-rtdb.firebaseio.com"
const REACT_APP_FIREBASE_PROJECT_ID = "todos-5bbd0"
const REACT_APP_FIREBASE_STORAGE_BUCKET = "todos-5bbd0.appspot.com"
const REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "587973643874"
const REACT_APP_FIREBASE_APP_ID = "1:587973643874:web:1510be334bf7955cea0b3b"
const REACT_APP_FIREBASE_MEASUREMENT_ID = "G-51VC3J4JC4"


const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app)