import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import firebase from 'react-native-firebase';

export default class AudioVideo extends Component {


  render() {
    firebase.analytics().setCurrentScreen('audioVideo');
    return (
    <ScrollView style={{backgroundColor: '#c0dfc066'}}>
      <Text style={styles.title}>
        Audio / Video / Photo Policy
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>
        Photo policy is determined on a per show basis, as directed by each
        artist’s specifications.  Please call the box office to find out about
        the show you are interested in.
        {"\n"}{"\n"}
        Toad’s Place does not offer press or photo/audio/video passes, but we
        can potentially forward you to the management of the artist.
        </Text>
      </View>
    </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  infoContainer:{
    padding:15
  },
  title:{
    textAlign: 'center',
    fontFamily: "Merriweather-Bold",
    textTransform: 'uppercase',
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 0
  },
  serviceInfo:{
    paddingLeft: 25,
    paddingRight: 25,
    lineHeight: 20,
    fontSize: 16
  },
  serviceTitle:{
    textAlign: 'center',
    fontFamily: "Merriweather-Regular",
    textTransform: 'uppercase',
    fontSize: 18,
  },
  subtitle:{
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 20
  }
})
