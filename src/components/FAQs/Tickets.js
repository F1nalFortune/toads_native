import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Tickets extends Component {


  render() {
    return (
    <ScrollView style={{backgroundColor: '#c0dfc066'}}>
      <Text style={styles.title}>
        Ticket Information
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>
          Our box office is located at Toad’s Place and is open Monday-Friday,
          from 11am-6pm.  Tickets for our shows can be purchased in person or over
          the phone during these hours, and can also be purchased during other shows.
          {"\n"}{"\n"}
          Tickets can also be purchased through etix.com (links are located on each show page), and the following FYE locations:  Meriden - Milford –
            Trumbull – Waterbury - Waterford.
            {"\n"}
        </Text>
      </View>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>
          Service charges for tickets:
          {"\n"}
        </Text>
        <Text style={styles.subtitle}>
          Box office:
          {"\n"}{"\t"}There is no service charge for tickets
          purchased in person at the box office.  There is a small fee for phone orders
          through the box office, $2.00-$2.50 per ticket, depending on the ticket price.
          {"\n"}{"\n"}
          FYE:{"\n"}{"\t"}$4.75 per ticket.
          {"\n"}{"\n"}
          Etix:{"\n"}{"\t"}Service charges vary depending on the ticket price.
        </Text>
      </View>
      <View style={{flexDirection:'row'}}>
          <Image
          source={require("../../../assets/images/etix_logo.png")}
          style={{
            resizeMode: 'contain',
            flex:1,
            width: Dimensions.get('window').width/2,
            height: Dimensions.get('window').width/2,
            margin: 15
          }}/>
          <Image
          source={require("../../../assets/images/fye_logo.png")}
          style={{
            resizeMode: 'contain',
            flex:1,
            width: Dimensions.get('window').width/2,
            height: Dimensions.get('window').width/2,
            margin: 15
          }}/>
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
