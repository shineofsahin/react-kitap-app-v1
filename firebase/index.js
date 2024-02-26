import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBhtNcY7TTUn2ecOTwxxe9emX9ooomiVHY",
    authDomain: "react-project-firebase-eefaa.firebaseapp.com",
    projectId: "react-project-firebase-eefaa",
    storageBucket: "react-project-firebase-eefaa.appspot.com",
    messagingSenderId: "612620268133",
    appId: "1:612620268133:web:93aaf69da2ae9644ec4c8c",
    measurementId: "G-6T7HCY0WPJ"
  };

firebase.initializeApp(firebaseConfig)

  const storage =firebase.storage();

  export {storage, firebase as default};