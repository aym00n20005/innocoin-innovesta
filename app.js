const firebaseConfig = {
  apiKey: "AIzaSyCpqIk8H4a6rcm-EMTkbJ9vBCc-ZWZznGU",
  authDomain: "innocoin-fe53a.firebaseapp.com",
  projectId: "innocoin-fe53a",
  storageBucket: "innocoin-fe53a.firebasestorage.app",
  messagingSenderId: "151162681567",
  appId: "1:151162681567:web:b5d255690e9fcf9012916a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
