import firebase from 'react-native-firebase';

const config = {
  apiKey: "AIzaSyAE64IVmC9y5PNDV1ST1gBKaQ68DFSUaS4",
  authDomain: "toads-react.firebaseapp.com",
  databaseURL: "https://toads-react.firebaseio.com",
  projectId: "toads-react",
  storageBucket: "toads-react.appspot.com",
  messagingSenderId: "419843575607",
  persistence: true
};

let app = firebase.initializeApp(config);

export const db = app.database();
