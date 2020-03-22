import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import firebase from 'react-native-firebase';

export default class Refunds extends Component {


  render() {
    firebase.analytics().setCurrentScreen('refunds');
    return (
    <ScrollView style={{backgroundColor: '#c0dfc066'}}>
      <Text style={styles.title}>
        Refund Policy
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>
        All sales are final.  There are no refunds or exchanges.
        {"\n"}{"\n"}
        If a show is postponed or rescheduled, the new date will be posted to
        the website and your ticket for the original show will be honored, or
        you may have a refund at point of purchase.  If a show is canceled,
        refunds will be given at point of purchase.
        {"\n"}{"\n"}
        Toad’s Place is not responsible for the validity of any ticket purchased
        through a third party seller, and also not responsible for refunding
        any tickets from a third party seller.
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
