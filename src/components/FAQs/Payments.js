import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default class Payments extends Component {


  render() {
    return (
    <ScrollView style={{backgroundColor: '#c0dfc066'}}>
      <Text style={styles.title}>
        Accepted Payments
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>
          The box office & ticket window accept cash, Visa, Mastercard, Amex &
          Discover cards.
          {"\n"}{"\n"}
          The bars at Toad’s accept cash, Visa, Mastercard, Amex & Discover cards.
          Additionally, there is an ATM near the front door, and another outside
          of the Rock Shop.
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
