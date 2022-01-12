import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6c-t1kbf0rNnkqWBZt-jpxCnoqhlHwno",

  authDomain: "familynameexam.firebaseapp.com",

  projectId: "familynameexam",

  storageBucket: "familynameexam.appspot.com",

  messagingSenderId: "789538371913",

  appId: "1:789538371913:web:7db22c8d952096c127c298",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore, app };
