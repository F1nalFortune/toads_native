import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
  } from 'react-native';

import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";

import Routes from './components/Routes';


export default class Main extends Component {
  componentWillMount (){
      console.disableYellowBox = true;
  }

  goBack(){
    Actions.pop()
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
