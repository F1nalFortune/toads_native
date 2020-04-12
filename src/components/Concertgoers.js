import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import firebase from 'react-native-firebase';

export default class Concertgoers extends Component {
  render() {
    firebase.analytics().setCurrentScreen('concertgoers');
    const ColoredLine = ({ color }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
          width: '90%',
          paddingTop: 10,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />
    );
    return (
    <ImageBackground
      source={require('../../assets/images/toad_logo.jpg')}
      style={{flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
      }}
      imageStyle= {{opacity:0.05}}
      >
      
    </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  header:{
    fontSize: 24,
    textAlign: 'center',
    fontFamily: "Merriweather-Light"
  },
  subhead:{
    textAlign: 'center',
    fontFamily: "Merriweather-Light",
    color: 'red',
    paddingTop: 10
  },
  container:{
    paddingTop:20
  },
  button:{
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  imgWrapper:{
    width: '100%'
  },
  info:{
    padding: 25,
    lineHeight: 20,
    fontSize: 18,
    textAlign: 'justify'
  },
  privateContainer:{
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  privateHeader:{
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: "Merriweather-Bold",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
})
