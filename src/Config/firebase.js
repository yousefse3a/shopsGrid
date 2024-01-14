import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAfThulNpix4RaOacFPkkaFz57fpO0FHJ0",
  authDomain: "shopsgrid.firebaseapp.com",
  projectId: "shopsgrid",
  storageBucket: "shopsgrid.appspot.com",
  messagingSenderId: "309332294011",
  appId: "1:309332294011:web:91bdea9eb25f41ca28a5de",
  measurementId: "G-WXQCT34KG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)