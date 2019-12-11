import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
  } from 'react-native';


import Routes from './components/Routes';


export default class Main extends Component {
  componentWillMount (){
      console.disableYellowBox = true;
  }


  render() {
    return (
        <Routes />
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex:1
  }
});
