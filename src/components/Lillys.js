import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import firebase from 'react-native-firebase';

export default class Lillys extends Component {
  render() {
    firebase.analytics().setCurrentScreen('privateParties');
    const ColoredLine = ({ color }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
          width: '90%',
          paddingTop: 10,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />
    );
    return (
    <ImageBackground
      source={require('../../assets/images/toad_logo.jpg')}
      style={{flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
      }}
      imageStyle= {{opacity:0.05}}
      >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>Looking for a place to have your next party?</Text>
          <ColoredLine color="green" />
          <Text style={styles.subhead}>Available for Private Parties (21+)</Text>
          <Text style={styles.info}>
            Whether you're planning a graduation, meeting, anniversery, fundraiser,
            cocktail party, or special event, Toad's has you covered.
            {"\n"}{"\n"}
            For information regarding rentals, please contact Kayla at kayla@toadsplace.com.
            {"\n"}{"\n"}
            Please include a call back number you can be reached at or call (203) 562 - 5589 x10.
          </Text>

          <View style={styles.privateContainer}>
            <Text style={styles.privateHeader}>
              Lilly's Pad
            </Text>
            <Image
            source={require("../../assets/images/lillys_pic.png")}
            />
            <Text>
              Great choice for any private party!
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('LillysScreen')}
            >
              <Text>View Lilly's Pad Gallery</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.privateContainer}>
            <Text style={styles.privateHeader}>
              Rainforest Room
            </Text>
              <Image
              source={require("../../assets/images/rainforest_pic.png")}
              />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('RainforestScreen')}
            >
              <Text>View Rainforest Gallery</Text>
            </TouchableOpacity>
          </View>



        </View>
      </ScrollView>
    </ImageBackground>
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
    paddingTop: 10
  },
  container:{
    paddingTop:20
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
  imgWrapper:{
    width: '100%'
  },
  info:{
    padding: 25,
    lineHeight: 20,
    fontSize: 18,
    textAlign: 'justify'
  },
  privateContainer:{
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  privateHeader:{
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: "Merriweather-Bold",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
})
