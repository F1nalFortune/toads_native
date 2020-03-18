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

export default class Payments extends Component {


  render() {
    return (
    <ScrollView>
      <Text style={styles.title}>
        Parking Info
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>
          There are several pay lots in the area, visit ParkNewHaven for
          more information.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL("https://www.ParkNewHaven.com")}>
          <Text style={styles.buttonTxt}>Park{"\n"}NewHaven</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>
          There is also metered parking throughout the city.  All meters in New
          Haven accept coins as payment, as well as the ParkMobile app.  Many
          of the meters throughout the downtown area accept Visa, Mastercard or
          Discover cards.
          {"\n"}
          The meters are in effect until 9pm Monday-Saturday
          (excluding holidays).  After 5pm, there are no time limits associated
          with any meter.  Please check each meter for time and rate.
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
