import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0f-epIqdx5eYBFDwv4XStSr3AIRspFbs",
  authDomain: "devlinks-42cbf.firebaseapp.com",
  projectId: "devlinks-42cbf",
  storageBucket: "devlinks-42cbf.firebasestorage.app",
  messagingSenderId: "860398063936",
  appId: "1:860398063936:web:989bb52feceb345b5b6aa5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }