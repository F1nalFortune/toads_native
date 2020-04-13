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

export default class Attendees extends Component {
  state={
    users: []
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
          var email = data[keys[i]].user;
          var avatar = data[keys[i]].avatar;
          var gender = data[keys[i]].gender;
          var name = data[keys[i]].username;
          var userId = data[keys[i]].userId;

          if(event_title==this_event.title&&event_date==this_event.datetime&&img==this_event.img){
            if(email!=firebase.auth().currentUser.email){
              var concertgoer={
                email: email,
                avatar: avatar,
                gender: gender,
                name: name,
                userId: userId
              }
              concertgoers.push(concertgoer)
            }
          }
        }
        this.setState({
          users: concertgoers
        })
      })
      .catch((error) =>{
        console.log("Failed to fetch concertgoers: ", error)
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
    const ListPeople = ({user}) => (
      <View
        style={{
          flex: 1,
          flexDirection: 'row'
        }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.push('PrivateMessage', {user})}
          id={user.userId}>
        {
          user.avatar
          ?
          <Image
            source={{uri: user.avatar}}
            style={styles.avatar}/>
          :
          <Image
            source={require("../../assets/images/default_user.png")}
            style={styles.avatar}/>
        }
        <View>
          {
            user.name
            ?
            <Text>{user.name}{"\n"}{user.email}</Text>
            :
            <Text>{user.email}</Text>
          }
        </View>
        </TouchableOpacity>
      </View>
    );
    return (
    <ScrollView>
      {
        this.state.users.length>0
        ?
        this.state.users.map(user => <ListPeople user={user} key={this.state.users.indexOf(user)}/>)
        :
        <View></View>
      }
    </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  avatar:{
    borderRadius: 50,
    width: 100,
    height: 100
  },
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
