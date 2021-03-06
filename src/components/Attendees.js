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
import LoadingScreen from './LoadingScreen';
import firebase from 'react-native-firebase';
import { db } from '../../Firebase';

export default class Attendees extends Component {
  state={
    users: [],
    loading:true
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
          var email = data[keys[i]].user ? data[keys[i]].user : false;
          var avatar = data[keys[i]].avatar ? data[keys[i]].avatar : false;
          var gender = data[keys[i]].gender ? data[keys[i]].gender : false;
          var name = data[keys[i]].username ? data[keys[i]].username : false;
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
            } else {
              var currentUser = {
                email: email,
                avatar: avatar,
                gender: gender,
                name: name,
                userId: userId
              }
              this.setState({
                currentUser: currentUser,
                loading: false
              })
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
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />
    );
    const ListPeople = ({user}) => (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.push('PrivateMessage', {
            user: user,
            currentUser: this.state.currentUser
          })}
          id={user.userId}
          style={styles.container}>
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
            <Text
              style={styles.text}>{user.name}{"\n"}{user.email}</Text>
            :
            <Text
              style={styles.text}>{user.email}</Text>
          }
        </View>
        </TouchableOpacity>
        <ColoredLine color="green" />
      </View>
    );
    if (this.state.loading){
      return <LoadingScreen />;
    }else {
      return (
        <ScrollView>
            {this.state.users.map(user => <ListPeople user={user} key={this.state.users.indexOf(user)}/>)}
        </ScrollView>
      );
    }
  }
}


const styles = StyleSheet.create({
  avatar:{
    width: 75,
    height: 75,
    borderRadius: 50
  },
  container:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  text:{
    paddingLeft: 15
  }
 })
