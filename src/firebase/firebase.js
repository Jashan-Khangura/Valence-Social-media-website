import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCbiHH-zpob5AytooHMxrB_oncIz5wAcgg",
    authDomain: "expresate-react.firebaseapp.com",
    databaseURL: "https://expresate-react-default-rtdb.firebaseio.com",
    projectId: "expresate-react",
    storageBucket: "expresate-react.appspot.com",
    messagingSenderId: "400618187775",
    appId: "1:400618187775:web:d78270044e4b1d464215ca"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export const auth = firebase.auth();
export { storage, firebase as default };