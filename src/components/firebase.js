// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlCukqhUJApUR5hIvs2qoz1i6UZmaosz4",
  authDomain: "task-manager-7f2c4.firebaseapp.com",
  projectId: "task-manager-7f2c4",
  storageBucket: "task-manager-7f2c4.firebasestorage.app",
  messagingSenderId: "995546284805",
  appId: "1:995546284805:web:4a7239a0fafe825f962d6c",
  measurementId: "G-JJP09MX534"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };