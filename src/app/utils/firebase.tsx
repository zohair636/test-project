// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuwhjQ9HC_AMGxgVaP0GZb7CsvyK3mBrg",
  authDomain: "test-project-db5ed.firebaseapp.com",
  projectId: "test-project-db5ed",
  storageBucket: "test-project-db5ed.firebasestorage.app",
  messagingSenderId: "242866506720",
  appId: "1:242866506720:web:38e84b15f8975a3cdff985",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
