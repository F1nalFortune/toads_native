import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';





export default class Tickets extends Component {


  render() {
    return (
    <ScrollView style={styles.background}>
      <Text>
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
    </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  background:{
    backgroundColor: 'grey'
  },
  button:{
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  contact: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16
  },
  facebook:{
    color: '#4968ad',
    marginHorizontal: 100
  },
  instagram:{
    color: 'black',
    marginHorizontal: 100
  },
  image: {
      width: 50,
      resizeMode: 'contain',
      height: 50
  },
  imgWrapper:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuTabs:{
    flexDirection: 'row',
    padding: 20
  },
  menuTabText:{
    flexDirection: 'row',
    width: '80%'
  },
  menuTabIcon:{
    flex: 1,
    zIndex: 100000,
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%'
  },
  socialTitle:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  socialIcon:{
    padding: 5
  },
  tabbar:{
    flexDirection: 'row'
  },
  tabBtnActive: {
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    borderBottomColor: 'green',
    borderBottomWidth: 1,
  },
  tabBtnInactive: {
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  toads: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  twitter:{
    color: '#49a1eb',
    marginHorizontal: 100
  },
  wrapper:{
      padding: 15,
      fontSize: 16
  }
})
