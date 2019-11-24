import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image
  } from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <Image
        style={{width:200, height:400, resizeMode:'contain'}}
        source={require("../../assets/images/toad_logo.jpg")}/>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText:{
    fontSize: 18,
    color: 'white'
  }
})
