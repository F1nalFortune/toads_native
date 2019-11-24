import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity
  } from 'react-native';

import LoginForm from './LoginForm'
export default class Login extends Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Image
            style={{width:200, height:200, resizeMode:'contain'}}
            source={require("../../assets/images/toad_logo.jpg")}/>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Email"
            placeholderTextColor="white"/>
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            placeholderTextColor="white"/>
          <TouchableOpacity
            style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  button:{
    borderColor: 'green',
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 300
  },
  buttonText:{
    fontSize: 16
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 18,
    marginVertical: 15
  },
  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10
  }
})
