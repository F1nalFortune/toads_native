import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native';
import firebase from 'react-native-firebase'


export default class LoadingScreen extends Component {
  render() {
    firebase.analytics().setCurrentScreen('loading');
    return (
      <View style={styles.container}>
        <Image
        source={require('../../assets/images/loading.gif')}/>
        <Text style={{textAlign: 'center'}}>
          Loading ...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})
