import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { setPersistence, browserSessionPersistence } from 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyDSf8PRDeMmwM35BhsEASc-wi0XbrgbeOw",
  authDomain: "irctc-clone-9048a.firebaseapp.com",
  projectId: "irctc-clone-9048a",
  storageBucket: "irctc-clone-9048a.appspot.com",
  messagingSenderId: "793883702573",
  appId: "1:793883702573:web:49772c1da6a676b6f68fa4",
  measurementId: "G-V3RB6N7Q97"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
setPersistence(auth, browserSessionPersistence);

