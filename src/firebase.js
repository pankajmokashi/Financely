import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, deleteDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnzKji39qdZyg2VEuqL5Mb-DYIuSLzm2w",
  authDomain: "finance-management-2d296.firebaseapp.com",
  projectId: "finance-management-2d296",
  storageBucket: "finance-management-2d296.appspot.com",
  messagingSenderId: "752995105846",
  appId: "1:752995105846:web:55dc416599ede13c3aac97",
  measurementId: "G-20D6PM7N0Q"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc, firestore, deleteDoc};