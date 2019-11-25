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
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/toad_logo.jpg")}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  logoContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  logo:{
    width:250,
    height:250,
    resizeMode:'contain'
  }
})
