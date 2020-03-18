import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Tickets extends Component {


  render() {
    return (
    <ScrollView>
      <Text style={styles.title}>
        Ticket Information
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>
          Our box office is located at Toad’s Place and is open Monday-Friday,
          from 11am-6pm.  Tickets for our shows can be purchased in person or over
          the phone during these hours, and can also be purchased during other shows.
          {"\n"}{"\n"}
          Tickets can also be purchased through etix.com (links are located next
            to each show), and the following FYE locations:  Meriden - Milford –
            Trumbull – Waterbury - Waterford.
          {"\n"}{"\n"}
          Service charges for tickets:
          {"\n"}{"\n"}
          {"\t"}Box office:  There is no service charge for tickets purchased in person at the box office.  There is a small fee for phone orders through the box office, $2.00-$2.50 per ticket, depending on the ticket price.
          {"\n"}{"\n"}
          {"\t"}FYE:  $4.75 per ticket.
          {"\n"}{"\n"}
          {"\t"}Etix.com:  Service charges vary depending on the ticket price.
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
