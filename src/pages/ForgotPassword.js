import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert
  } from 'react-native';


import Logo from '../components/Logo'
import LoginForm from '../components/LoginForm'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import KeyboardShift from '../components/KeyboardShift';

import InputText from '../components/InputText';
import firebase from 'react-native-firebase';
import { db } from '../../Firebase';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signupText:{
    color: 'rgba(0,0,0,.7)',
    fontSize:16
  },
  signupTextCont:{
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 15,
    flexDirection: 'row'
  },
  signupButton:{
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  button:{
    backgroundColor: "#345f3f",
    borderColor: 'green',
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop:0,
    width: 300
  },
  buttonText:{
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  error:{
    color: 'red',
    padding: 12,
    paddingHorizontal: 10,
    paddingBottom: 10
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

export default class ForgotPassword extends Component {
    // Initialize empty state here
  state = {
    email: '',
    errorMsg: ''
  };

// Add this method here, type will be either email or password and the text will be whatever you type

  resetPassword = (props) => {
    const {email} = this.state
    firebase.auth().sendPasswordResetEmail(email)
       .then(function (user) {
         Alert.alert(
         "Success",
         "Please check your email for further instructions.",
         [
           {text: 'OK', onPress: () => {
             props.navigation.navigate('Login')
           }},
         ],
         {cancelable: false},
         );
       }).catch(function (e) {
         Alert.alert('Please check your internet connection and try again.')
       })
   }



  render() {
    firebase.analytics().setCurrentScreen('forgotPw');
    return (
      <KeyboardShift>
        {() => (
          <View style={{ flex: 1, backgroundColor: 'white'  }}>
          <GeneralStatusBarColor backgroundColor="#345f3f"
                barStyle="light-content"/>
          <SafeAreaView style={styles.container}>
            <Logo />
            <View style={styles.container}>
              <TextInput
                style={styles.inputBox}
                placeholder="Email"
                placeholderTextColor="white"
                selectionColor="#345f3f"
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                blurOnSubmit={false}
                />
            </View>
            <TouchableOpacity
                onPress={() => this.resetPassword(this.props)}
                style={styles.button}>
                <Text style={styles.buttonText}> Reset Password</Text>
            </TouchableOpacity>
            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.signupButton}> Sign in</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      )}
      </KeyboardShift>

    );
  }
}
