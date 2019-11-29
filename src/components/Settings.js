import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase';

export default class Dance extends Component {

  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        this.props.navigation.navigate('Login')
    } catch (e) {
        console.log(e);
    }
  }

  render() {

    return (
      <View style={{ flex: 1}}>
        <Text>Please select your musical preferences to receive notifications
        when your favorite genre is on our stage!</Text>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.signOutUser()}
          >
            <Text>Signout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    textTransform: 'uppercase',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }
})
