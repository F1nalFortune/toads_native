import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Alert,
  Linking,
  Share,
  ImageBackground,
  Image,
  Animated,
  Switch,
  Platform
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LoadingScreen from './LoadingScreen';
import Geolocation from '@react-native-community/geolocation';
import { WebView } from 'react-native-webview';

import firebase from 'react-native-firebase';
import { db } from '../../Firebase';

// TODO
// add loading screen from directions button press
// apply to venue info page


const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      },
      {
        "visibility": "on"
      },
      {
        "weight": 8
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }]
const IMAGE_HEIGHT = 400;
export default class ShowDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      buttonText: 'Add Event to Calendar',
      attendance: false
    }
  }
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    const nth = function(d) {
      if (d > 3 && d < 21) return `${d}th`;
      switch (d % 10) {
        case 1:  return `${d} st`;
        case 2:  return `${d} nd`;
        case 3:  return `${d} rd`;
        default: return `${d} th`;
      }
    }
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
    function ordinal_suffix(i) {
      var j = i % 10,
      k = i % 100;
      if (j == 1 && k != 11) {
        return i + "st";
      }
      if (j == 2 && k != 12) {
        return i + "nd";
      }
      if (j == 3 && k != 13) {
        return i + "rd";
      }
      return i + "th";
    }
    function cleanGenreName(genre){
      var genres = {
        acoustic: 'acoustic',
        alternative: 'alternative',
        alternative_rock: 'alternative rock',
        classic_rock: 'classic rock',
        american_rock: 'American rock',
        comedy: 'comedy',
        dance: 'dance',
        dubstep: 'dubstep',
        emo: 'emo',
        hip_hop: 'hip-hop',
        funk: 'funk',
        indie: 'indie',
        metal: 'metal',
        musical_theatre: 'musical theatre',
        pop: 'pop',
        rap: 'rap',
        reggae: 'reggae',
        r_n_b: 'R&B',
        ska: 'ska'
      }
      return genres[genre]
    }
    var current_itemzor = navigation.state.params.item
    return {
      // headerTitle: "Event Info",
      headerRight: <Icon
        style={{
          color:'#fff',
          padding: 10
         }}
        name={'share-square'}
        size={20}
        onPress={async () => {
          uid = firebase.auth().currentUser.uid;

          var fixed_genres = []
          var doors_time =current_itemzor['information'][2].substr(current_itemzor['information'][2].length-5).trim() + ' PM'
          var show_time = current_itemzor['information'][3].substr(current_itemzor['information'][2].length-5).trim() + ' PM'
          var age_limit = current_itemzor['information'][4]
          var title = current_itemzor['title']
          var month = current_itemzor['date'][0]
          var date = current_itemzor['date'][1]
          var day = current_itemzor['date'][2]
          for(a=0;a<current_itemzor['genre'].length;a++){
            var genre = current_itemzor['genre'][a]
            genre = cleanGenreName(genre)
            fixed_genres.push(genre)
          }
          var message = `${title} - live at Toad's Place!\n\n`

          if(fixed_genres.length<2){

            var s = fixed_genres[0]
            var message = message + `Come down for some ${s} music.`
            message = `${message} \n\n ${day}, ${fullMonth(month)} ${ordinal_suffix(parseInt(date))}.`
            message = `${message} \n\n Doors open at ${doors_time}, and the show starts at ${show_time}.\n\n ${age_limit}`

          }else if(fixed_genres.length > 1 && fixed_genres.length < 3){

            var s = fixed_genres[0] + " and " + fixed_genres[1]
            var message = message + `Come check out the show tonight for a blend of ${s} music.`
            message = `${message} \n\n ${day}, ${fullMonth(month)} ${ordinal_suffix(parseInt(date))}.`
            message = `${message} \n\n Doors open at ${doors_time}, and the show starts at ${show_time}.\n\n ${age_limit}`

          }else if(fixed_genres.length > 2){

            var s = fixed_genres.slice(0, fixed_genres.length - 1).join(', ') + ", and " + fixed_genres.slice(-1);
            var message = message + `Come check out the show tonight a blend of ${s} music.`
            message = `${message} \n\n ${day}, ${fullMonth(month)} ${ordinal_suffix(parseInt(date))}.`
            message = `${message} \n\n Doors open at ${doors_time}, and the show starts at ${show_time}.\n\n ${age_limit}`

          }
          function writeNewPost(uid, result, current_itemzor) {
            // A post entry.
            var postData = {
              result: result
            };
            // Get a key for a new Post.
            var newPostKey = db.ref('users/' + uid).child('posts').push().key;

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/posts/' + newPostKey] = postData;

            return db.ref('users/' + uid).update(updates);
          }
          try {
            const result = await Share.share({
              title: current_itemzor.title,
              message: message,
              url: 'http://www.toadsplace.com'
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
                result['createdOn'] = new Date();
                result['show'] = current_itemzor
                // console.log(JSON.stringify(result, null, 2))
                writeNewPost(uid, result, current_itemzor)
              } else {
                // shared
                result['createdOn'] = new Date();
                result['show'] = current_itemzor
                // console.log(JSON.stringify(result, null, 2))
                writeNewPost(uid, result, current_itemzor)
              }
            } else if (result.action === Share.dismissedAction) {
              console.log("Dismissed Action")
            }
          } catch (error) {
            alert(error.message);
          }
        }}/>,
      headerStyle: {
        backgroundColor: "#000000cc",
        opacity: .8
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: "#fff",
        textShadowColor: "#66ff66",
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        shadowOpacity: .58,
        textAlign: 'center',
        fontFamily: "Merriweather-Bold",
        textTransform: 'uppercase',
        fontSize: 24,
        padding: 10
      }
    };
  };



  scrollAnimatedValue = new Animated.Value(0);

  componentDidMount(){
    db.ref(`attendance`).once('value')
      .then((dataSnapShot) => {
        saved_events = []
        var data = JSON.stringify(dataSnapShot, null, 2)
        var data = JSON.parse(data)
        var keys = Object.keys(data)
        var attendees = false;
        for(i=0;i<keys.length;i++){
          var event_title = data[keys[i]].title;
          var event_date = data[keys[i]].date;
          var img = data[keys[i]].img;
          var email = data[keys[i]].user ? data[keys[i]].user : false;
          if(event_title==item.title&&event_date==item.datetime&&img==item.img){
            if(email!=firebase.auth().currentUser.email){
              var attendees=true;
            }
          }
        }
        this.setState({
          attendees: attendees
        })
      })
      .catch((error) =>{
        console.log("Failed to fetch concertgoers: ", error)
      })
    // iOS
    RNCalendarEvents.authorizationStatus()
     .then(status => {
       // if the status was previous accepted, set the authorized status to state
       this.setState({ cal_auth: status })
       if(status === 'undetermined') {
         // if we made it this far, we need to ask the user for access
         RNCalendarEvents.authorizeEventStore()
         .then((out) => {
           if(out == 'authorized') {
             // set the new status to the auth state
             this.setState({ cal_auth: out })
           }
         })
        }
      })
    .catch(error => console.warn('Auth Error: ', error));
    // grab user genre preferences
    var user_id = firebase.auth().currentUser.uid
    var similarArtists = Object.values(this.props.navigation.state.params.item.genre)
    this.setState({
      similarArtists: similarArtists
    })
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
    db.ref('events').once('value')
      .then((dataSnapShot) => {
        saved_shows = []
        dataSnapShot.forEach(function(childSnapshot) {
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          saved_shows.push(childData)
        });
        var items = saved_shows
        var matches = []
        // console.log(JSON.stringify(items, null, 2))
        for(i=0;i<items.length;i++){
          if(myFunction(items[i].title, 'presenter')){
            // console.log("HERE")
            var title = myFunction(items[i].title, 'show')
            var presenter = myFunction(items[i].title, 'presenter')
            items[i].title = title.show
            items[i].presenter = presenter.presenter
          }
          var genres = items[i]['genre']
          genres = Object.values(genres)

          var match = this.state.similarArtists.some(r=> genres.includes(r))
          if(match){
            same_img = (this.props.navigation.state.params.item.img==items[i]['img'])
            same_date = (this.props.navigation.state.params.item.datetime == items[i]['datetime'])
            if(!same_img && !same_date){
              matches.push(items[i])
            }
          }


        }
        // console.log(JSON.stringify(matches, null, 2))
        this.setState({
          similarArtists: matches,
          isLoading: false
        })
      })
    this.setState({
      item: this.props.navigation.state.params.item
    })

    var user_id = firebase.auth().currentUser.uid
    var user_email = firebase.auth().currentUser.email
    var title = this.props.navigation.state.params.item['title']
    var img = this.props.navigation.state.params.item['img']
    var datetime = this.props.navigation.state.params.item['datetime']
    // SET ATTENDANCE SWITCH
    db.ref(`attendance`).once('value')
      .then((dataSnapShot) => {
        saved_events = []
        var data = JSON.stringify(dataSnapShot, null, 2)
        var data = JSON.parse(data)
        var keys = Object.keys(data)
        var attending = false
        for(i=0;i<keys.length;i++){
          var user = data[keys[i]].user
          if(user_email==user && title == data[keys[i]].title && img==data[keys[i]].img && new Date(datetime).getTime()===new Date(data[keys[i]].date).getTime()){
            var attending = true
          }
        }
        this.setState({attendance: attending})
      })
      .catch((error) =>{
        console.log("Failed to delete: ", error)
      })



    const item = this.props.navigation.state.params.item;
    function myFunction(mystring){
        values = ['presented by:', 'presents:', 'present:']
        string_length = mystring.length
        if (mystring.toLowerCase().includes(values[0])){
          var presenter = mystring.toLowerCase().split(values[0])
          presenter[0] = presenter[0].trim() + " " + values[0]
          var show = presenter[1]

          presenter = mystring.substring(0, presenter[0].length)
          show = mystring.substring(presenter.length+1, mystring.length)
          return {
            presenter: presenter,
            show: show
          }
        }else if(mystring.toLowerCase().includes(values[1])){
          var presenter = mystring.toLowerCase().split(values[1])
          presenter[0] = presenter[0].trim() + " " + values[1]
          presenter = mystring.substring(0, presenter[0].length)
          // console.log(presenter)
          show = mystring.substring(presenter.length+1, mystring.length)
          // console.log(show)
          return {
            presenter: presenter,
            show: show
          }
        }else if(mystring.toLowerCase().includes(values[2])){
          var presenter = mystring.toLowerCase().split(values[2])
          presenter[0] = presenter[0].trim() + " " + values[2]

          presenter = mystring.substring(0, presenter[0].length)
          show = mystring.substring(presenter.length+1, mystring.length)
          return {
            presenter: presenter,
            show: show
          }
        }else{
          return false
        }
    }
    var startDate = new Date(item.datetime)
    var endDate = new Date(item.datetime)
    endDate.setHours(endDate.getHours() + 1)


    RNCalendarEvents.fetchAllEvents(startDate.toISOString(), endDate.toISOString())
    .then((promise) => {
      for(i=0;i<promise.length;i++){
        if(promise[i].title == item.title){
          this.setState({
            savedInCalendar: true,
            buttonText: 'Remove Event from Calendar'
          })
          break;
        }
      }
      if(!this.state.savedInCalendar){
        this.setState({
          savedInCalendar: false,
          buttonText: 'Add Event to Calendar'
        })
      }
    })
    .catch(error => {
      console.log("Error: ", error)
      this.setState({
        savedInCalendar: false,
        buttonText: 'Add Event to Calendar'
      })
    })
  }

  handleAddEvent = (item) => {
    // console.log(JSON.stringify(props,0,2))
    if(this.state.cal_auth == 'authorized'){
      var startDate = new Date(item.datetime)
      var endDate = new Date(item.datetime)
      endDate.setHours(endDate.getHours() + 3)
      // console.log("Start Date: " + startDate)
      // console.log("End Date: " + endDate)
      // console.log("Title: " + this.state.item.title)
      if (this.state.savedInCalendar){
        Alert.alert(
          'Confirm',
          'Remove event from calendar?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
              RNCalendarEvents.fetchAllEvents(startDate.toISOString(), endDate.toISOString())
              .then((promise) => {
                var id = promise[0]['id']
                RNCalendarEvents.removeEvent(id)
                .then(() => {
                  Alert.alert(
                    'Event Removed',
                    'Event successfully removed from calendar.',
                    [
                      {text: 'OK', onPress: () => {
                        // remove event from calendar
                        uid = firebase.auth().currentUser.uid;
                        db.ref('users/' + uid + '/events').once('value')
                          .then((dataSnapShot) => {
                            saved_events = []
                            var data = JSON.stringify(dataSnapShot, null, 2)
                            var data = JSON.parse(data)
                            var keys = Object.keys(data)
                            // console.log("Keys: ", keys)
                            // console.log(JSON.stringify(data, null, 2))
                            // console.log("State Item: ", this.state.item)
                            // console.log("Item: ", item)
                            // console.log("Props: ", this.props.navigation.state.params.item)
                            for(i=0;i<keys.length;i++){
                              var current_event = data[keys[i]]
                              if(current_event['title']==item.title && current_event['datetime'] == item.datetime){
                                db.ref('users/' + uid+'/events/'+keys[i]).remove()
                              }
                            }

                          })
                        // console.log('OK Pressed')
                      }},
                    ],
                    {cancelable: false},
                  );
                })
                this.setState({
                  savedInCalendar: false,
                  buttonText: 'Add Event to Calendar'
                })
              })
              .catch(error => {
                Alert.alert(
                  'Error',
                  'Please try again',
                  [
                    {text: 'OK'},
                  ],
                  {cancelable: false},
                );
              })
            }},
          ],
          {cancelable: false},
        );
      }else{
        Alert.alert(
          'Confirm',
          'Add event to calendar?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
              // console.log(JSON.stringify(this.state.item, null, 2))
              RNCalendarEvents.fetchAllEvents(startDate.toISOString(), endDate.toISOString())
              .then((promise) => {
                // console.log("Promise: ", promise)

                for(i=0;i<promise.length;i++){
                  if(promise[i].title == this.state.item.title){
                    Alert.alert(
                      'Woops!',
                      'Event already saved in calendar.',
                      [
                        {text: 'OK'},
                      ],
                      {cancelable: false},
                    );
                    break;
                  }
                }
                //if event is not already inside user's Calendar
                var item_details = this.state.item
                var acts = ""
                if(this.state.item.acts){
                  for(i=0; i<this.state.item.acts.length;i++){
                    acts.concat(this.state.item.acts[i]);
                    acts.concat("\n");
                  }
                }
                RNCalendarEvents.saveEvent(this.state.item.title, {
                  location:"Toad's Place, 300 York St, New Haven CT 06510",
                  notes: "EVENT DETAILS: \n\n" + item_details.information[2] +
                    "\n" + item_details.information[3] + "\n\n" + acts + item_details.information[4] +
                    "\n\n" + "TICKETS: " + "\n" + item_details.information[1] + "\n" + item_details.information[0],
                  description: this.state.item.title + " live at Toad's!",
                  startDate: startDate.toISOString(),
                  endDate: endDate.toISOString(),
                  alarms: [{
                    date: -120
                  }]
                })
                .then(() => {
                  Alert.alert(
                    'Event Added',
                    'Event successfully added to calendar!',
                    [
                      {text: 'OK', onPress: () => {
                        // console.log('OK Pressed')
                        uid = firebase.auth().currentUser.uid;
                        function addEvent(uid, current_itemzor) {
                          // A post entry.
                          var postData = current_itemzor;

                          var postData = {
                            title: current_itemzor['title'],
                            datetime: current_itemzor['datetime'],
                            genre: current_itemzor['genre']
                          }
                          // Get a key for a new Post.
                          var newPostKey = db.ref('users/' + uid).child('events').push().key;

                          // Write the new post's data simultaneously in the posts list and the user's post list.
                          var updates = {};
                          updates['/events/' + newPostKey] = postData;

                          return db.ref('users/' + uid).update(updates);
                        }
                        addEvent(uid, this.state.item)
                      }},
                    ],
                    {cancelable: false},
                  );
                  this.setState({
                    savedInCalendar: true,
                    buttonText: 'Remove Event from Calendar'
                  })
                })
                .catch(error => {
                  console.log("Error: ", error)
                  Alert.alert(
                    'Error',
                    'Please try again.',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
                })
              })
              .catch(error => {
                console.log("Error: ", error)
              })


            }},
          ],
          {cancelable: false},
        );
      }

    } else {
      Alert.alert(
        'Allow Access',
        'To save event please allow access to you calendar.',
        [
          {
            text: 'Cancel',
            // onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
            RNCalendarEvents.authorizationStatus()
             .then(status => {
               // if the status was previous accepted, set the authorized status to state
               this.setState({ cal_auth: status })
               if(status === 'undetermined') {
                 // if we made it this far, we need to ask the user for access
                 RNCalendarEvents.authorizeEventStore()
                 .then((out) => {
                   if(out == 'authorized') {
                     // set the new status to the auth state
                     this.setState({ cal_auth: out })
                   }
                 })
                }
              })
            .catch(error => console.warn('Auth Error: ', error));
          }},
        ],
        {cancelable: false},
      );
    }

    }
  _renderItem = ({item, index}) => {
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
    function ordinal_suffix(i) {
      var j = i % 10,
      k = i % 100;
      if (j == 1 && k != 11) {
        return i + "st";
      }
      if (j == 2 && k != 12) {
        return i + "nd";
      }
      if (j == 3 && k != 13) {
        return i + "rd";
      }
      return i + "th";
    }
    function cleanGenreName(genre){
      var genres = {
        acoustic: 'acoustic',
        alternative: 'alternative',
        alternative_rock: 'alternative rock',
        classic_rock: 'classic rock',
        american_rock: 'American rock',
        comedy: 'comedy',
        dance: 'dance',
        dubstep: 'dubstep',
        emo: 'emo',
        hip_hop: 'hip-hop',
        funk: 'funk',
        indie: 'indie',
        metal: 'metal',
        musical_theatre: 'musical theatre',
        pop: 'pop',
        rap: 'rap',
        reggae: 'reggae',
        r_n_b: 'R&B',
        ska: 'ska'
      }
      return genres[genre]
    }
    var current_itemzor = item

      return (
        <TouchableOpacity
        style={{
          borderWidth: 2,
          borderRadius: 5,
          borderColor: 'green',
          flex: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.51,
          shadowRadius: 13.16,
          elevation: 20,
          marginBottom: 50
        }}
        onPress={() => this.props.navigation.push('Details', {item})}>
          <View>
            <Image
            source={{uri: item.img }}
            style={{width: '100%', height: 250, borderRadius: 5}}>
            </Image>
          </View>

          <View
            style={[styles.similarArtistWrapper]}>
            { item.presenter ?
              <View style={{paddingTop:10}}>
                <Text style={styles.subtitle}>{item.presenter}</Text>
                <Text style={styles.eventTitle}>{item.title}</Text>
              </View> :
              <View style={{paddingTop:10}}>
                <Text style={styles.eventTitle}>{item.title}</Text>
              </View>
            }
            {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : <View></View>}
            <Text
              style={styles.date}>
                {item.date[2]} \\
                <Text style={{fontWeight: 'bold'}}>
                  {' ' + item.date[0] + ' ' + item.date[1]}
                </Text>
            </Text>
            <View style={{borderTopWidth: 2, borderTopColor: 'green'}}>
              <Text>{item.information[2]}</Text>
              <Text>{item.information[3]}</Text>
            </View>
            <Icon
              style={{
                color:'black',
                padding: 10
               }}
              name={'upload'}
              size={20}
              onPress={async () => {
                uid = firebase.auth().currentUser.uid;

                var fixed_genres = []
                var doors_time =current_itemzor['information'][2].substr(current_itemzor['information'][2].length-5).trim() + ' PM'
                var show_time = current_itemzor['information'][3].substr(current_itemzor['information'][2].length-5).trim() + ' PM'
                var age_limit = current_itemzor['information'][4]
                var title = current_itemzor['title']
                var month = current_itemzor['date'][0]
                var date = current_itemzor['date'][1]
                var day = current_itemzor['date'][2]
                for(a=0;a<current_itemzor['genre'].length;a++){
                  var genre = current_itemzor['genre'][a]
                  genre = cleanGenreName(genre)
                  fixed_genres.push(genre)
                }
                var message = `${title} - live at Toad's Place!\n\n`

                if(fixed_genres.length<2){

                  var s = fixed_genres[0]
                  var message = message + `Come down for some ${s} music.`
                  message = `${message} \n\n ${day}, ${fullMonth(month)} ${ordinal_suffix(parseInt(date))}.`
                  message = `${message} \n\n Doors open at ${doors_time}, and the show starts at ${show_time}.\n\n ${age_limit}`

                }else if(fixed_genres.length > 1 && fixed_genres.length < 3){

                  var s = fixed_genres[0] + " and " + fixed_genres[1]
                  var message = message + `Come check out the show tonight for a blend of ${s} music.`
                  message = `${message} \n\n ${day}, ${fullMonth(month)} ${ordinal_suffix(parseInt(date))}.`
                  message = `${message} \n\n Doors open at ${doors_time}, and the show starts at ${show_time}.\n\n ${age_limit}`

                }else if(fixed_genres.length > 2){

                  var s = fixed_genres.slice(0, fixed_genres.length - 1).join(', ') + ", and " + fixed_genres.slice(-1);
                  var message = message + `Come check out the show tonight a blend of ${s} music.`
                  message = `${message} \n\n ${day}, ${fullMonth(month)} ${ordinal_suffix(parseInt(date))}.`
                  message = `${message} \n\n Doors open at ${doors_time}, and the show starts at ${show_time}.\n\n ${age_limit}`

                }
                function writeNewPost(uid, result, current_itemzor) {
                  // A post entry.
                  var postData = {
                    result: result
                  };
                  // Get a key for a new Post.
                  var newPostKey = db.ref('users/' + uid).child('posts').push().key;

                  // Write the new post's data simultaneously in the posts list and the user's post list.
                  var updates = {};
                  updates['/posts/' + newPostKey] = postData;

                  return db.ref('users/' + uid).update(updates);
                }
                try {
                  const result = await Share.share({
                    title: current_itemzor.title,
                    message: message,
                    url: 'http://www.toadsplace.com'
                  });
                  if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                      // shared with activity type of result.activityType
                      result['createdOn'] = new Date();
                      result['show'] = current_itemzor
                      // console.log(JSON.stringify(result, null, 2))
                      writeNewPost(uid, result, current_itemzor)
                    } else {
                      // shared
                      result['createdOn'] = new Date();
                      result['show'] = current_itemzor
                      // console.log(JSON.stringify(result, null, 2))
                      writeNewPost(uid, result, current_itemzor)
                    }
                  } else if (result.action === Share.dismissedAction) {
                    console.log("Dismissed Action")
                  }
                } catch (error) {
                  alert(error.message);
                }
              }}/>
          </View>
        </TouchableOpacity>
      );
  }

  updateAttendance = () => {
    // ATTENDANCE STATE HAS JUST BEEN TOGGLED
    var attendance = this.state.attendance;
    var user_id = firebase.auth().currentUser.uid
    var user_email = firebase.auth().currentUser.email
    var title = this.props.navigation.state.params.item['title']
    var img = this.props.navigation.state.params.item['img']
    var datetime = this.props.navigation.state.params.item['datetime']
    // A post entry.
    if(this.state.attendance==false){
      db.ref(`attendance`).once('value')
        .then((dataSnapShot) => {
          saved_events = []
          var data = JSON.stringify(dataSnapShot, null, 2)
          console.log("Data: ")
          console.log(data)
          var data = JSON.parse(data)
          var keys = Object.keys(data)
          console.log("keys: ", keys)
          for(i=0;i<keys.length;i++){
            var user = data[keys[i]].user
            if(user_email==user && title == data[keys[i]].title && img==data[keys[i]].img && new Date(datetime).getTime()===new Date(data[keys[i]].date).getTime()){
              var delete_key = Object.keys(data)[Object.values(data).indexOf(data[keys[i]])];
            }
          }
          db.ref(`attendance/${delete_key}`).remove()
        })
        .catch((error) =>{
          console.log("Failed to delete: ", error)
        })
    }else{
      // grab user's avatar + gender
      db.ref(`users/${user_id}`).once('value')
        .then((dataSnapShot) => {
          saved_events = []
          var data = JSON.stringify(dataSnapShot, null, 2)
          console.log("Data: ")
          console.log(data)
          var data = JSON.parse(data)
          if(data.info.name){
            var username = data.info.name
          } else {
            var username = false
          }
          if(data.info.avatar){
            var avatar = data.info.avatar
          } else {
            var avatar = false
          }
          if(data.info.gender){
            var gender = data.info.gender
          } else {
            var gender = false
          }
          var postData = {
            title: title,
            date: this.props.navigation.state.params.item['datetime'],
            img: this.props.navigation.state.params.item['img'],
            userId: user_id,
            user: user_email,
            username: username,
            avatar: avatar,
            gender: gender
          };
          var newPostKey = db.ref(`attendance`).push().key;
          return db.ref(`attendance/${newPostKey}`).update(postData);
        })
        .catch((error) =>{
          console.log("Failed to delete: ", error)
        })
    }
  }
  toggle_attendance = (value)=>{this.setState({attendance: value}, ()=>{this.updateAttendance()})}

  render(){
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    var currentDate = formatDate(this.props.navigation.state.params.item['datetime'])
    var title = this.props.navigation.state.params.item['title']
    firebase.analytics().setCurrentScreen(`${title}(${currentDate})`);
    const ColoredLine = ({ color, width, padding }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
          width: width,
          paddingTop: padding,
          marginBottom: padding,
          marginLeft: 'auto',
          marginRight: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      />
    );

    const item = this.props.navigation.state.params.item;
    const url = item.ticket
    console.log(JSON.stringify(this.state, null, 2))

    // console.log("ACTS")
    // console.log(item['acts'])

    if (this.state.isLoading) {
      return <LoadingScreen />;
    }
    const { attendees } = this.state;
    return(
      <View style={styles.container}>
        <Animated.Image
          source={{uri: item.img}}
          style={[styles.catImage, {
          transform: [
            {translateY: this.scrollAnimatedValue.interpolate({
              inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
              outputRange: [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT / 2],
              extrapolateRight: 'clamp',
            })},
            {scale: this.scrollAnimatedValue.interpolate({
              inputRange: [-IMAGE_HEIGHT, 0],
              outputRange: [2, 1],
              extrapolateRight: 'clamp',
            })},
          ],
          zIndex:-1
        }]}
        blurRadius={6}/>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollAnimatedValue }} }],
            { useNativeDriver: true },
          )}
          contentContainerStyle={styles.scrollViewContentContainer}
          scrollEventThrottle={8}
          showsVerticalScrollIndicator={false}
        >
        <View style={{
          maxWidth: Dimensions.get('window').width*.75,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          flex: 1,
          marginTop: -175,
          zIndex: 20000
        }}>
          <TouchableOpacity
            onPress={() => this.handleAddEvent(this.state.item)}
          >
            <View>
              <Image
              source={{uri: item.img }}
              style={{
                width: Dimensions.get('window').width*.75,
                height: 250,
                borderRadius: 5
              }}>
              </Image>
            </View>
          </TouchableOpacity>
          <View
            style={styles.dateWrapper}>
            { this.state.item.presenter ?
              <View style={{paddingTop:10}}>
                <Text style={styles.subtitle}>{this.state.item.presenter}</Text>
                <Text style={styles.eventTitle}>{this.state.item.title}</Text>
              </View> :
              <View style={{paddingTop:10}}>
                <Text style={styles.eventTitle}>{this.state.item.title}</Text>
              </View>
            }
            {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : <View></View>}
            <Text
              style={styles.date}>
                {item.date[2]} \\
                <Text style={{fontWeight: 'bold'}}>
                  {' ' + item.date[0] + ' ' + item.date[1]}
                </Text>
            </Text>
            <View style={{borderTopWidth: 2, borderTopColor: 'green'}}>
              <Text>{item.information[2]}</Text>
              <Text>{item.information[3]}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Browser', {url})}
        >
          <Text style={{color: 'white', fontWeight: 'bold'}}>GET TIX</Text>
        </TouchableOpacity>
        <ColoredLine color="green" width="90%" padding={10}/>

                <View style={styles.wrapper}>
                  <View style={{
                    width: '100%',
                    padding: '2.5%'
                  }}>
                    <Text style={{
                      fontSize: 18,
                      textAlign: 'center',
                      fontFamily: "Merriweather-Regular",
                      paddingBottom: '2.5%'
                    }}>Opening Acts</Text>
                    {(item.acts.length > 0) && item.acts[0].length > 0  ? item.acts.map(act => <Text key={item.acts.indexOf(act)} style={{textAlign: 'justify'}}>{act}</Text>) : <Text>TBA</Text>}
                  </View>
                </View>
                <View>
                  <Text style={styles.starDetail}>{item.starInfo}</Text>
                </View>

                <View style={styles.footer}>
                  <Text>{item.information[4]}</Text>
                </View>

                <View style={styles.starDetail}>
                  {item.infoLinks ? item.infoLinks.map(infoLink =>
                    <Text
                      key={item.infoLinks.indexOf(infoLink)}
                      style={styles.infoLink}
                    >
                      {infoLink.text}**
                    </Text>) : <Text></Text>}
                </View>
                <ColoredLine color="green" width="100%" padding={10}/>
                <TouchableOpacity
                  style={[styles.menuTabs, {
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }]}>
                  <View style={styles.menuTabText}>
                    <Text>
                      Attending Event
                    </Text>
                  </View>
                  <View style={styles.menuTabIcon}>
                    <Switch
                      onValueChange= {this.toggle_attendance}
                      value = {this.state.attendance}
                      trackColor = {{true: '#008000b3'}}/>
                  </View>
                </TouchableOpacity>
                <ColoredLine color="green" width="100%" padding={10}/>
                {attendees ?
                  <TouchableOpacity
                    style={styles.menuTabs}
                    onPress={() => {
                      this.props.navigation.navigate('Attendees', {item})
                    }}
                  >
                    <View style={styles.menuTabText}>
                      <Text>
                        Attendees
                      </Text>
                    </View>
                    <View style={styles.menuTabIcon}>
                      <Icon
                         style={styles.menuTabIcon}
                        name={'chevron-right'}
                        size={20}
                        style={{
                          width:20,
                          height:20
                        }}/>
                    </View>
                  </TouchableOpacity>
                :
                <View></View> }
                {attendees ? <ColoredLine color="green" width="100%" padding={1}/> : <View></View>}
                <TouchableOpacity
                  style={styles.menuTabs}
                  onPress={() => this.handleAddEvent(this.state.item)}>
                  <View style={styles.menuTabText}>
                    <Text>
                      {this.state.buttonText}
                    </Text>
                  </View>
                  <View style={styles.menuTabIcon}>
                    <Icon
                       style={styles.menuTabIcon}
                      name={'chevron-right'}
                      size={20}
                      style={{
                        width:20,
                        height:20
                      }}/>
                  </View>
                </TouchableOpacity>
                <ColoredLine color="green" width="100%" padding={10}/>
                <TouchableOpacity
                  style={styles.menuTabs}
                  onPress={() => {
                    this.props.navigation.navigate('About', {info: 'tab'})
                  }}>
                  <View style={styles.menuTabText}>
                    <Text style={styles.addressTitle}>Venue Information</Text>
                    <Text style={styles.address}>300 York Street{"\n"}New Haven, CT 06510</Text>
                  </View>
                  <View style={styles.menuTabIcon}>
                    <Icon
                       style={styles.menuTabIcon}
                      name={'chevron-right'}
                      size={20}
                      style={{
                        width:20,
                        height:20
                      }}/>
                  </View>
                </TouchableOpacity>
                  <MapView
                    style={{
                      height: 250,
                      width: '100%'
                    }}
                    provider={PROVIDER_GOOGLE}
                    region={{
                      latitude: 41.304560,
                      longitude: -72.934500,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                    }}
                    customMapStyle={mapStyle}
                    scrollEnabled={false}
                  >
                    <MapView.Marker
                      coordinate={{
                        latitude: 41.304560,
                        longitude: -72.934500,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                      }}>
                      <Image source={require('../../assets/images/custom_marker.png')}/>
                    </MapView.Marker>
                  </MapView>
                <ColoredLine color="green" width="100%" padding={1}/>
                <View style={{flexDirection:'row', justifyContent: 'center', flex:1, paddingTop: 10}}>
                  <View style={{padding: 8}}>
                    <Icon name={'blind'} size={25} style={{color: 'green', textAlign: 'center'}}/>
                    <Text style={{textAlign: 'center',fontFamily: "Merriweather-Light", fontSize: 10}}>Walking</Text>
                  </View>
                  <View style={{padding: 8}}>
                    <Icon name={'car'} size={25} style={{color: 'green', textAlign: 'center'}}/>
                    <Text style={{textAlign: 'center',fontFamily: "Merriweather-Light", fontSize: 10}}>Driving</Text>
                  </View>
                  <View style={{padding: 8}}>
                    <Icon name={'bicycle'} size={25} style={{color: 'green', textAlign: 'center'}}/>
                    <Text style={{textAlign: 'center',fontFamily: "Merriweather-Light", fontSize: 10}}>Bicycling</Text>
                  </View>
                  <View style={{padding: 8}}>
                    <Icon name={'subway'} size={25} style={{color: 'green', textAlign: 'center'}}/>
                    <Text style={{textAlign: 'center',fontFamily: "Merriweather-Light", fontSize: 10}}>Transit</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Get Directions',
                      'Choose your travel method.',
                      [
                        {
                          text: 'Driving',
                          onPress: () => {
                            try {
                              var navDemo = NativeModules.NavDemo;
                              navDemo.renderNaviDemo(
                                (originLat = this.state.latitude),
                                (originLon = this.state.longitude),
                                (originName = 'Current Location'),
                                (destinationLat = 41.311587),
                                (destinationLon = -72.929541),
                                (destinationName = "Toad's Place"),
                              );
                            } catch (error) {
                              console.log("Error: ", error)
                              try{
                                Linking.openURL("https://www.google.com/maps/dir/?api=1&destination=Toad's+Place,+300+York+St,+New+Haven,+CT+06511&travelmode=driving&dir_action=navigate")
                              }catch(error){
                                alert("Check internet connection and try again.")
                              }
                            }

                          }
                        },
                        {text: 'Walking', onPress: () => {
                          Linking.openURL("https://www.google.com/maps/dir/?api=1&destination=Toad's+Place,+300+York+St,+New+Haven,+CT+06511&travelmode=walking")
                        }},
                        {text: 'Bicycling', onPress: () => {
                          Linking.openURL("https://www.google.com/maps/dir/?api=1&destination=Toad's+Place,+300+York+St,+New+Haven,+CT+06511&travelmode=bicycling")
                        }},
                        {text: 'Transit', onPress: () => {
                          Linking.openURL("https://www.google.com/maps/dir/?api=1&destination=Toad's+Place,+300+York+St,+New+Haven,+CT+06511&travelmode=transit")
                        }},
                        {text: 'Cancel'}
                      ]
                    );
                  }}>
                  <Text style={{
                    borderColor: 'green',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    padding: 15,
                    textTransform: 'uppercase',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: 'green',
                    fontWeight: 'bold',
                    margin: 15
                  }}>DIRECTIONS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    padding: 20
                  }}
                  onPress={() => Linking.openURL("https://m.uber.com/ul/?action=setPickup&client_id=cshc49dbbtH5MDBojbHt1KGGjc47pCmw&pickup=my_location&dropoff[formatted_address]=300%20York%20Street%2C%20New%20Haven%2C%20CT%2C%20USA&dropoff[latitude]=41.311553&dropoff[longitude]=-72.929597")}>
                  <View style={{
                    flexDirection: 'row',
                    width: '80%'
                  }}>
                    <Icon
                      name={'car'}
                      size={20}
                      style={{paddingRight: 20}}/>
                    <Text>
                      Ride w/ Uber to the show
                    </Text>
                  </View>
                  <View style={{
                    flex: 1,
                    zIndex: 100000,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20%'
                  }}>
                    <Icon
                       style={styles.menuTabIcon}
                      name={'chevron-right'}
                      size={20}
                      style={{
                        width:20,
                        height:20
                      }}/>
                  </View>
                </TouchableOpacity>

                {this.state.similarArtists.length > 0 ? <View style={[styles.wrapper,{paddingBottom: 300}]}>
                  <View style={{
                    width: '100%',
                  }}>
                    <Text style={{
                      fontSize: 18,
                      fontFamily: "Merriweather-Regular",
                      paddingBottom: '2.5%'
                    }}>Similar Artists</Text>
                  </View>
                  <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.similarArtists}
                    renderItem={this._renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width*.8}
                  />
                </View> : <View></View>}
        </Animated.ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create ({
  act:{
    width: '45%',
    marginRight: '2.5%'
  },
  address:{
    paddingTop: 0
  },
  addressTitle:{
    fontWeight: 'bold',
    fontSize: 18
  },
  bold:{
    fontWeight: 'bold'
  },
  button:{
    borderColor: 'green',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 15,
    textTransform: 'uppercase',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 20,
    backgroundColor: 'green',
    fontWeight: 'bold',
    width: '75%'
  },
  delButton:{
    borderColor: '#b53838',
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
  center:{
    textAlign: 'center'
  },
  date:{
    fontSize: 18,
    textTransform: 'uppercase'
  },
  dateWrapper:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventTitle:{
    fontSize:26,
    fontFamily: "Merriweather-Bold",
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  footer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  glow:{
    color: "#fff",
    textShadowColor: "#66ff66",
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    padding: 10
  },
  infoLink:{
    textAlign: 'center',
    paddingTop: 10
  },
  info:{
    width: '45%',
    marginLeft: '2.5%'
  },
  icon:{

  },
  imgWrapper:{
    width: '100%',
    borderBottomColor: 'green',
    borderBottomWidth: 1,
    flex: 1
  },
  image: {
      flex: 1,
      alignSelf: 'stretch',
      borderRadius: 5
  },
  link:{
    color: 'blue',
    zIndex: 100
  },
  menuTabs:{
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center'
  },
  menuTabText:{
    width: '80%'
  },
  menuTabIcon:{
    flex: 1,
    zIndex: 100000,
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    textAlign: 'center'
  },
  similarArtistWrapper:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  starDetail:{
    textAlign: 'center',
    paddingBottom: 10,
    position: 'relative'
  },
  subtitle:{
    textAlign: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    color: "#fff",
    textShadowColor: "#66ff66",
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
    fontFamily: "Merriweather-Bold",
    textTransform: 'uppercase',
    padding:10
  },
  titleWrapper:{
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  facebook:{
    color: '#4968ad',
    marginHorizontal: 100
  },
  instagram:{
    color: 'black',
    marginHorizontal: 100
  },
  twitter:{
    color: '#49a1eb',
    marginHorizontal: 100
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollViewContentContainer: {
    marginTop: IMAGE_HEIGHT-50,
    backgroundColor: '#d3e6d7',
    paddingTop: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  catImage: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: IMAGE_HEIGHT,
    alignSelf: 'center',
  }
})
