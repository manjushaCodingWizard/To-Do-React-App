import firebase from "firebase";

const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyDNtJrAIgZpf3yTjUt9prWrmugUtrbIJSY",
  authDomain: "todo-react-app-564d4.firebaseapp.com",
  projectId: "todo-react-app-564d4",
  storageBucket: "todo-react-app-564d4.appspot.com",
  messagingSenderId: "414454559118",
  appId: "1:414454559118:web:8e0aa59457932717bfb4df",
  measurementId: "G-3SHW13X6V1"
});

const db = firebaseApp.firestore();

export default db ;