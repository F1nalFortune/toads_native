import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Refunds extends Component {


  render() {
    return (
    <ScrollView>
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
  button:{
    width: '50%', // is 50% of container width
    borderColor: '#0079c1',
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    flex: 1,
    backgroundColor: '#0079c1c4',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin:25
  },
  buttonTxt:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: "Merriweather-Bold",
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding:5
  },
  infoContainer:{
    padding:15
  },
  link:{
    color: 'blue'
  },
  title:{
    paddingLeft:10,
    paddingTop:10,
    fontSize: 24,
    color: 'grey',
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 16,
    fontFamily: "Merriweather-Regular",
    lineHeight: 30,
  }
})
