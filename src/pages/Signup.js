import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
  } from 'react-native';

import {connect} from 'react-redux'
import {compose} from 'redux'
import { Field, reduxForm } from 'redux-form'

import Logo from '../components/Logo'
import LoginForm from '../components/LoginForm'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import {Actions} from 'react-native-router-flux';
import InputText from '../components/InputText';
import firebase from 'react-native-firebase';


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

export default class Signup extends Component {


  login(){
    Actions.login()
  }

  createNewUser = (values) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
      //Do something here. like display message "Sucessfully registered"
    }).cathc(err => {
      //handle erors
    });
  }

  onSubmit = (values) => {
    // this.createNewUser(values);
  }

  renderTextInput = (field) => {
    const { meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
    return (
      <View>
        <InputText
          onChangeText={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          label={label}
          {...restInput} />
        {(touched && error) && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }

  render() {
    const { handleSubmit } = this.props
    return (
    <View style={{ flex: 1, backgroundColor: 'white'  }}>
      <GeneralStatusBarColor backgroundColor="#345f3f"
            barStyle="light-content"/>
      <SafeAreaView style={styles.container}>
        <Logo />
        <LoginForm type="Signup"/>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity
            onPress={this.login}>
            <Text style={styles.signupButton}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if(!values.name) {
    errors.name = "Name is required"
  }
  if(!values.email) {
    errors.email = "Email is required"
  }
  if(!values.password) {
    errors.password = "Password is required"
  }
  return errors
}
