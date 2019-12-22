import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import firebase from 'react-native-firebase'
import { db } from '../../Firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default class HomeScreen extends React.Component {
  async componentDidMount() {
      this.checkPermission();
      this.createNotificationListeners();
      console.disableYellowBox = true;
    }

//Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        const {item} = notification._data;
        this.showAlert(title, body, item);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        console.log(notificationOpen)
        const {item} = notificationOpen.notification._data;
        this.showAlert(title, body, item);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        const {item} = notificationOpen.notification._data;
        this.showAlert(title, body, item);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body, item) {
    if(item!=undefined){
      item = JSON.parse(item)
      this.props.navigation.navigate('Details', {item})
    }
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

    //1
  async checkPermission() {
    console.log("Check Permission!")
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }

    //3
  async getToken() {
    await firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        console.log("Get Token Success!")
        if (fcmToken) {
          userId = firebase.auth().currentUser.uid;
          if (userId) {
            //search if current user already exists
            db
              .ref("users/" + userId)
              .once('value')
              .then((dataSnapShot) => {
                var user_data = dataSnapShot
                user_data = JSON.parse(JSON.stringify(dataSnapShot, null, 2))
                console.log(user_data)
                if(user_data == null){
                  //create user if does not exist
                  db.ref('users/' + userId).set({
                    token: fcmToken,
                    email: firebase.auth().currentUser.email,
                    created_at: Date.now(),
                    genrePref:{
                      alternative: false,
                      alternative_rock: false,
                      american_rock: false,
                      classic_rock: false,
                      comedy: false,
                      dance: false,
                      hip_hop: false,
                      funk: false,
                      indie: false,
                      metal: false,
                      musical_theatre: false,
                      pop: false,
                      reggae: false,
                      r_n_b: false,
                      ska: false
                    }
                  })
                }
              })
            .catch((err)=>{
              console.log(err)
            })
          }
        }
      })
      .catch((err) =>{
        console.log("Get Token Error!")
        console.log(err)
      })
  }

    //2
  async requestPermission() {
    try {
        console.log("Request Permission!")
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  handlePhoneCall = () => {
    Linking.openUrl(this.state.phone)
  }

  render() {

    return (
      <ImageBackground
        source={require('../../mobile_mic.jpg')}
        style={{width: '100%', height: '100%'}}
      >
      <View style={styles.container}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => Linking.openURL("tel:+1-203-624-8623")}>
            <Text style={styles.btn}>Call Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.props.navigation.navigate('About')}
          >
            <Text style={styles.btn}>Venue Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => this.props.navigation.navigate('Settings')}>
            <Text style={styles.btn}>Settings</Text>
          </TouchableOpacity>
      </View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50
  },
  item: {
    width: '33%', // is 50% of container width
    borderColor: 'green',
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    textTransform: 'uppercase',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "Merriweather-Bold",
    color: 'white',
    backgroundColor: '#a8d1a936',
    marginLeft: 5,
    marginRight: 5
  },
  btn:{
    color: "#fff",
    textShadowColor: "#66ff66",
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
    fontFamily: "Merriweather-Bold",
    textTransform: 'uppercase',
    padding:10
  }
})
