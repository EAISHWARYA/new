import * as firebase from "firebase"
var firebaseConfig = {
    apiKey: "AIzaSyDN-o0pIEqefolVZlaz0DiV8EcgzUPU1GU",
    authDomain: "book-santa-c7c84.firebaseapp.com",
    databaseURL: "https://book-santa-c7c84.firebaseio.com",
    projectId: "book-santa-c7c84",
    storageBucket: "book-santa-c7c84.appspot.com",
    messagingSenderId: "495126489866",
    appId: "1:495126489866:web:0d604520109b692ff2e8f3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()