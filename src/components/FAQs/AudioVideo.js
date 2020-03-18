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

export default class AudioVideo extends Component {


  render() {
    return (
    <ScrollView>
      <Text style={styles.title}>
        Audio / Video / Photo Policy
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.subtitle}>
        Photo policy is determined on a per show basis, as directed by each
        artist’s specifications.  Please call the box office to find out about
        the show you are interested in.
        {"\n"}{"\n"}
        Toad’s Place does not offer press or photo/audio/video passes, but we
        can potentially forward you to the management of the artist.
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
