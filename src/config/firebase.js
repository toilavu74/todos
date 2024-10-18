import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4F0y1rToXZa33cxAUuRsPcV_M8gQRGG0",
  authDomain: "todo-354f8.firebaseapp.com",
  projectId: "todo-354f8",
  storageBucket: "todo-354f8.appspot.com",
  messagingSenderId: "274936784374",
  appId: "1:274936784374:web:61775fa97a51c1ebcf93d7",
  measurementId: "G-WJRSMLGXKC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
