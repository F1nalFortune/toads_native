import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';

export default class Lillys extends Component {
  render() {
    const ColoredLine = ({ color }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
          width: '90%',
          paddingTop: 10,
          marginBottom: 10
        }}
      />
    );
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.subhead}>Available for Private Parties (21+)</Text>
          <ColoredLine color="green" />
          <Text style={{fontSize: 18}}>Looking for a place to have your next party?</Text>
          <Text style={styles.info}>
            For information regarding rentals, please fill out our contact form
            or call (203) 562 - 5589 x10.
          </Text>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LillysScreen')}
            >
              <Text>Lilly's Pad</Text>
            </TouchableOpacity>
          </View>
          <Text> We also have our Rainforest Room Available to Rent!</Text>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('RainforestScreen')}
            >
              <Text>Rainforest Room</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  header:{
    fontSize: 24,
    textAlign: 'center',
    fontFamily: "Merriweather-Light"
  },
  subhead:{
    textAlign: 'center',
    fontFamily: "Merriweather-Light",
    color: 'red',
    paddingTop: 5
  },
  container:{
     flex: 1,
     // justifyContent: "center",
     alignItems: "center",
     marginTop: 10
  },
  button:{
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    textTransform: 'uppercase',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  imgWrapper:{
    width: '100%'
  },
  info:{
    paddingTop: 10
  }
})
