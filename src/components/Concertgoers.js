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
import { db } from '../../Firebase';

export default class Concertgoers extends Component {
  state={

  }
  componentDidMount(){
    const this_event = this.props.navigation.state.params.item
    db.ref(`attendance`).once('value')
      .then((dataSnapShot) => {
        saved_events = []
        var data = JSON.stringify(dataSnapShot, null, 2)
        console.log("Data: ")
        console.log(data)
        var data = JSON.parse(data)
        var keys = Object.keys(data)
        console.log("keys: ", keys)
        var concertgoers = []
        for(i=0;i<keys.length;i++){
          var event_title = data[keys[i]].title;
          var event_date = data[keys[i]].date;
          var img = data[keys[i]].img;
          var user = data[keys[i]].user;
          if(event_title==this_event.title&&event_date==this_event.date&&img==this_event.img){
            concertgoers.append()
          }
          if(user_email==user && title == data[keys[i]].title && img==data[keys[i]].img && new Date(datetime).getTime()===new Date(data[keys[i]].date).getTime()){
            var delete_key = Object.keys(data)[Object.values(data).indexOf(data[keys[i]])];
          }
        }
        db.ref(`attendance/${delete_key}`).remove()
      })
      .catch((error) =>{
        console.log("Failed to delete: ", error)
      })
  }

  render() {
    firebase.analytics().setCurrentScreen('concertgoers');
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
