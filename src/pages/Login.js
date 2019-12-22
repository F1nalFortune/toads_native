import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert // add this here
  } from 'react-native';
import firebase from 'react-native-firebase'; // import firebase


import Logo from '../components/Logo'
import LoginForm from '../components/LoginForm'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';

import {Actions} from 'react-native-router-flux';
export default class Login extends Component {
  // Initialize empty state here
   state = {
    email: '',
    password: '',
    errorMsg: ''
  };

// Add this method here, type will be either email or password and the text will be whatever you type
  handleChangeText = (text, type) => {
    this.setState({
      [type]: text
    });
  }

  handleSignIn = () => {
    const { email, password } = this.state
    console.log("Email: ", email)
    console.log("Password; ", password)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('HomeScreen'))
      .catch(error => {
        console.log(error)
        console.log(JSON.stringify(error, null, 2))
        switch(error.code){
          case "auth/invalid-email":
            Alert.alert("Invalid Email", "Email format is invalid.");
            break;

          case "auth/wrong-password":
            Alert.alert("Incorrect Password", "Please try another password.");
            break;

          default:
            Alert.alert("Error", "Invalid email and password combination.");
        }
      })
  }


  render() {
    return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <GeneralStatusBarColor backgroundColor="#345f3f"
            barStyle="light-content"/>
      <SafeAreaView style={styles.container}>
        <Logo />
        <LoginForm
          changeText={(text, type) => this.handleChangeText(text, type)} // Added new props here & also removed the type props
        />
        <TouchableOpacity
            onPress={() => this.handleSignIn()}
            style={styles.button}>
            <Text style={styles.buttonText}> Sign In</Text>
          </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUp')}
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
