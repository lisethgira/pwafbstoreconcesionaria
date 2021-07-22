import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBX21s2a6EgurkOEqLt4MjOT-tty9z1aFg",
    authDomain: "pryconcecionaria.firebaseapp.com",
    projectId: "pryconcecionaria",
    storageBucket: "pryconcecionaria.appspot.com",
    messagingSenderId: "1027144398877",
    appId: "1:1027144398877:web:06cbc52ca525a8673eaef4",
    measurementId: "G-E90QRK4Y9M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;