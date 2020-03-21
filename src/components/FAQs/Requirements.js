import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default class Requirements extends Component {


  render() {
    return (
    <ScrollView style={{backgroundColor: '#c0dfc066'}}>
      <Text style={styles.title}>
        Age Requirements / Restrictions
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>
          All ages shows are 13 and over.  Anyone under the age of 16 must be
          accompanied by a parent or guardian over the age of 21.
          {"\n"}{"\n"}
          For 18+ shows, anyone under the age of 18 must be accompanied by a
          parent or guardian over the age of 21.
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
