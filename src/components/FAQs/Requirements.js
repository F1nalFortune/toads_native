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

export default class Requirements extends Component {


  render() {
    return (
    <ScrollView>
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
