import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking
} from 'react-native';
import firebase from 'react-native-firebase'

export default class HomeScreen extends React.Component {
  state = { currentUser: null }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }
  handlePhoneCall = () => {
    Linking.openUrl(this.state.phone)
  }
  render() {
    const { currentUser } = this.state
    return (
      <ImageBackground
        source={require('../../mobile_mic.jpg')}
        style={{width: '100%', height: '100%'}}
      >
      <View style={styles.container}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => Linking.openURL("tel:+1-203-624-8623")}>
            <Text style={styles.btn}>Call Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.props.navigation.navigate('About')}
          >
            <Text style={styles.btn}>Venue Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.props.navigation.navigate('Settings')}>
            <Text style={styles.btn}>Settings</Text>
          </TouchableOpacity>
      </View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50
  },
  item: {
    width: '33%', // is 50% of container width
    borderColor: 'green',
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    textTransform: 'uppercase',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "Merriweather-Bold",
    color: 'white',
    backgroundColor: '#a8d1a936',
    marginLeft: 5,
    marginRight: 5
  },
  btn:{
    color: "#fff",
    textShadowColor: "#66ff66",
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
    fontFamily: "Merriweather-Bold",
    textTransform: 'uppercase',
    padding:10
  }
})
