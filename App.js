import React, {Fragment, Component} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  Alert,
  SafeAreaView,
  NativeModules
} from 'react-native';
// import Application from './src/components/Application'
import GeneralStatusBarColor from './src/components/GeneralStatusBarColor';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Application from './src/components/Application'

// import Main from './src/Main';

export default class App extends Component {

  render() {
    var Config = {
        apiKey: "<API_KEY>",
        authDomain: "<PROJECT_ID>.firebaseapp.com",
        databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
        projectId: "<PROJECT_ID>",
        storageBucket: "<BUCKET>.appspot.com",
        messagingSenderId: "<SENDER_ID>",
      };
    return(
          <Application />
    )
  }
}

const styles = StyleSheet.create ({
  container:{
    backgroundColor: '#FAFAFA',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
