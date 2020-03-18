import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Payments extends Component {


  render() {
    return (
    <ScrollView>
      <Text style={styles.title}>
        Accepted Payments
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>
        The box office & ticket window accept cash, Visa, Mastercard, Amex & Discover cards.

        The bars at Toad’s accept cash, Visa, Mastercard, Amex & Discover cards.  Additionally, there is an ATM near the front door, and another outside of the Rock Shop.
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
    paddingLeft:10,
    paddingTop:10,
    fontSize: 24,
    color: 'grey',
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 16
  }
})
