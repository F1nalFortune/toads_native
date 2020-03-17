import firebase from 'react-native-firebase';

const config = {
  apiKey: "AIzaSyBzBA2XGA6t2bDcSgWF_IOqY-DPg9HRaeo",
  authDomain: "toads-react.firebaseapp.com",
  databaseURL: "https://toads-react.firebaseio.com",
  projectId: "toads-react",
  storageBucket: "toads-react.appspot.com",
  messagingSenderId: "419843575607",
};

let app = firebase.initializeApp(config);

export const db = app.database();
