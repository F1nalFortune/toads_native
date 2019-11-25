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


import Logo from '../components/Logo'
import LoginForm from '../components/LoginForm'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';

import {Actions} from 'react-native-router-flux';
export default class Login extends Component {
  componentWillMount (){
      console.disableYellowBox = true;
  }

  signup(){
    Actions.signup()
  }

  render() {
    return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <GeneralStatusBarColor backgroundColor="#345f3f"
            barStyle="light-content"/>
      <SafeAreaView style={styles.container}>
        <Logo />
        <LoginForm type="Login"/>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity
            onPress={this.signup}
          >
            <Text style={styles.signupButton}> Signup</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
    );
  }

}


const styles = StyleSheet.create({
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
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  logo:{
    width:250,
    height:250,
    resizeMode:'contain'
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
  }
})
