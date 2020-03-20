import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  Button,
  Alert
} from 'react-native';
import LoadingScreen from './LoadingScreen';
import GallerySwiper from "react-native-gallery-swiper";
import { SliderBox } from "react-native-image-slider-box";
import cio from 'cheerio-without-node-native';
import {useNetInfo} from "@react-native-community/netinfo";
import firebase from 'react-native-firebase';
import { db } from '../../Firebase';



export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      items: [],
      isLoading: true
    }
  }
  async componentDidMount() {
    const fullDay = function(day) {
      switch (day) {
        case 'Fri': return "Friday";
        case 'Sat': return "Saturday";
        case 'Sun': return "Sunday";
        case 'Mon': return "Monday";
        case 'Tue': return "Tuesday";
        case 'Wed': return "Wednesday";
        case 'Thu': return "Thursday"
      }
    }
    const fullMonth = function(month){
      switch(month) {
        case 'Jan': return "January";
        case 'Feb': return "February";
        case 'Mar': return "March";
        case 'Apr': return "April";
        case 'May': return "May";
        case 'Jun': return "June";
        case 'Jul': return "July";
        case 'Aug': return "August";
        case 'Sep': return "September";
        case 'Oct': return "October";
        case 'Nov': return "November";
        case 'Dec': return "December"
      }
    }
    function myFunction(mystring, variable){
        values = ['presented by:', 'presents:', 'present:']
        string_length = mystring.length
        if (mystring.toLowerCase().includes(values[0])){
          var presenter = mystring.toLowerCase().split(values[0])
          presenter[0] = presenter[0].trim() + " " + values[0]
          var show = presenter[1]

          presenter = mystring.substring(0, presenter[0].length)
          show = mystring.substring(presenter.length+1, mystring.length)
          if(variable=='presenter'){
            return presenter
          }else if(variable=='show'){
            return show
          }
        }else if(mystring.toLowerCase().includes(values[1])){
          var presenter = mystring.toLowerCase().split(values[1])
          presenter[0] = presenter[0].trim() + " " + values[1]
          presenter = mystring.substring(0, presenter[0].length)
          // console.log(presenter)
          show = mystring.substring(presenter.length+1, mystring.length)
          // console.log(show)
          if(variable=='presenter'){
            return presenter
          }else if(variable=='show'){
            return show
          }
        }else if(mystring.toLowerCase().includes(values[2])){
          var presenter = mystring.toLowerCase().split(values[2])
          presenter[0] = presenter[0].trim() + " " + values[2]

          presenter = mystring.substring(0, presenter[0].length)
          show = mystring.substring(presenter.length+1, mystring.length)
          if(variable=='presenter'){
            return presenter
          }else if(variable=='show'){
            return show
          }
        }else{
          return false
        }
    }
    uid = firebase.auth().currentUser.uid;
    this.setState({
      uid: uid
    })
    function writeNotification(uid, postData) {
      // A post entry.
      // postData = {
      //   show: 'show',
      //   date: 'date',
      //   location: 'foreround/background/closed',
      //   opened: true
      // }
      // Get a key for a new Post.
      var newPostKey = db.ref('users/' + uid).child('notifications').push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/notifications/' + newPostKey] = postData;

      return db.ref('users/' + uid).update(updates);
    }
      this.checkPermission();
      this.createNotificationListeners();
      console.disableYellowBox = true;
      db.ref('events').once('value')
        .then((dataSnapShot) => {
          saved_shows = []
          dataSnapShot.forEach(function(childSnapshot) {
            // childData will be the actual contents of the child
            var childData = childSnapshot.val();
            saved_shows.push(childData)
          });
          var items = saved_shows
          for(i=0;i<items.length;i++){
            if(myFunction(items[i].title, 'presenter')){
              var title = myFunction(items[i].title, 'show')
              var presenter = myFunction(items[i].title, 'presenter')
              items[i].title = title
              items[i].presenter = presenter
            }
          }
          var features = items[0]['slides']
          this.setState({
            items: items,
            isLoading: false,
            features: features
          })
        })
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
        var app_location = 'foreground'
        const { title, body } = notification;
        const {item} = notification._data;
        this.showAlert(title, body, item, app_location);
        console.log(JSON.stringify(item))
        // writeNotifications(uid, {
        //   show: title,
        //   date: 'date',
        //   location: 'foreground/background/closed',
        //   opened: true
        // })
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        var app_location = 'background'
        const { title, body } = notificationOpen.notification;
        const {item} = notificationOpen.notification._data;
        this.showAlert(title, body, item, app_location);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        var app_location = 'closed'
        const { title, body } = notificationOpen.notification;
        const {item} = notificationOpen.notification._data;
        this.showAlert(title, body, item, app_location);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log("Data only payload. Notification clicked, app in background")
    });
  }

  showAlert(title, body, item, app_location) {
    if(item!=undefined){
      item = JSON.parse(item)
      this.props.navigation.navigate('Details', {item})
    }
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log(app_location) },
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


  async getToken() {
    await firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        console.log("Get Token Success!")
        if (fcmToken) {
          userId = firebase.auth().currentUser.uid;
          if (userId) {
            //search if currents user already exists
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
                      acoustic: false,
                      alternative: false,
                      alternative_rock: false,
                      classic_rock: false,
                      american_rock: false,
                      comedy: false,
                      dance: false,
                      dubstep: false,
                      emo: false,
                      hip_hop: false,
                      funk: false,
                      indie: false,
                      metal: false,
                      musical_theatre: false,
                      pop: false,
                      rap: false,
                      reggae: false,
                      r_n_b: false,
                      ska: false
                    },
                    posts: {
                      post: false
                    },
                    notifications: {
                      notification: false
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


  render(){


    const ColoredLine = ({ color }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1
        }}
      />
    );
    if (this.state.isLoading) {
      return <LoadingScreen />;
    }

    return(
      <ScrollView style={{backgroundColor: '#c0dfc066'}}>
        <View>
          <SliderBox
            images={this.state.features}
            ImageComponentStyle={{borderRadius: 15, width: '95%', marginTop: 5, marginBottom: 5}}
            dotColor='#008000'
            autoplay
            circleLoop />

        </View>
        {this.state.items.map(item =>
          <View key={this.state.items.indexOf(item)}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => this.props.navigation.navigate('Details', {item})}
            >
              <View style={styles.imgWrapper}>
                <Image style={styles.img} source={{uri: item.img}}/>
              </View>
              <View style = {styles.wrapper}>
                <View style={styles.dateWrapper}>
                  <Text style= {styles.date}>{item.date[0]}</Text>
                  <Text style= {styles.dateNumber}>{item.date[1]}</Text>
                  <ColoredLine color="green" />
                  <Text style= {styles.date}>{item.date[2]}</Text>
                </View>
                <View style={styles.titleWrapper}>

                    {
                        item.presenter ?
                        <View>
                          <Text style={styles.subTitle}>
                            {item.presenter}
                          </Text>
                          <Text style={styles.title}>
                            {item.title}
                          </Text>
                        </View> :
                        <View>
                          <Text style={styles.title}>
                            {item.title}
                          </Text>
                        </View>
                    }

                  {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}{"\n"}</Text> : <Text></Text>}
                  <Text style={styles.info}>{item.information[2]}</Text>
                  <Text style={styles.info}>{item.information[3]}</Text>
                </View>
              </View>
              <View style={styles.footer}>
                <Text style={styles.info}>{item.information[4]}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Details', {item})}
              >
                <Text style={styles.buttonTxt}>EVENT DETAILS</Text>
              </TouchableOpacity>
            </View>
          </View>)}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create ({
 touchable:{
   // justifyContent: 'center',
   // alignItems: 'center',
   borderTopColor: 'green',
   borderStyle: 'solid',
   borderTopWidth: 2,
 },
 wrapper: {
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'flex-start',
   flexWrap: 'wrap',
   // width: 100,
   paddingTop: 10
 },
 dateWrapper:{
   paddingTop: 10,
   width: '20%',
   marginLeft: 10,
   paddingRight: 10,
 },
 date:{
   height: 30,
   lineHeight: 30,
   textAlign: 'center',
   textTransform: 'uppercase',
   fontSize: 14,
   fontWeight: 'bold'
 },
 dateNumber:{
   height: 30,
   lineHeight: 30,
   textAlign: 'center',
   textTransform: 'uppercase',
   fontSize: 32
 },
 imgWrapper:{
   width: '90%'
 },
 img:{
   width: '100%',
   height: 200,
   marginTop: 10,
   marginLeft: '5%',
   borderRadius: 5
 },
 subTitle:{
   fontSize: 16
 },
 titleWrapper:{
   width: '65%'
 },
 title:{
   paddingTop: 5,
   fontWeight: 'bold',
   fontSize: 24
 },
 footer:{
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   marginVertical: 10
 },
 info:{

 },
 buttonContainer:{
   flexDirection:'row',
   justifyContent: 'center',
   flex:1,
   alignItems: 'center',
   width: '75%',
   marginLeft: 'auto',
   marginRight: 'auto'
 },
 button:{
   borderColor: 'green',
   backgroundColor: 'darkgreen',
   borderRadius: 10,
   borderWidth: 1,
   borderStyle: 'solid',
   padding: 10,
   textTransform: 'uppercase',
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   margin: 10,
   width: '75%'
 },
 buttonTxt:{
   color: 'white',
   fontWeight: 'bold'
 }
})
