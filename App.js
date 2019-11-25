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
import Application from './src/components/Application'
import GeneralStatusBarColor from './src/components/GeneralStatusBarColor';

import Routes from './src/Routes';
// return <Application />
export default class App extends Component {

  render() {

    return(
      <Routes />
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
