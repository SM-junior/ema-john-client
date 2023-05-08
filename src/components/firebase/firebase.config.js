// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsJctiwsrx2_ACpt7ta6iVLwnY3TRx-Hc",
  authDomain: "ema-john-with-firebase-a-4c45d.firebaseapp.com",
  projectId: "ema-john-with-firebase-a-4c45d",
  storageBucket: "ema-john-with-firebase-a-4c45d.appspot.com",
  messagingSenderId: "660433483901",
  appId: "1:660433483901:web:4aac986fb8b6172d4bd914"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;