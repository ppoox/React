import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyBFVLbEjslNGhOU5-uX5K-U8_UnaaHFseE",
    authDomain: "react-redux-firebase-55b61.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-55b61.firebaseio.com",
    projectId: "react-redux-firebase-55b61",
    storageBucket: "react-redux-firebase-55b61.appspot.com",
    messagingSenderId: "402934812119"
};

firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

export default firestore;