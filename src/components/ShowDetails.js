import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Linking,
  Share
} from 'react-native';
import Image from 'react-native-scalable-image';
import RNCalendarEvents from 'react-native-calendar-events';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import firebase from 'react-native-firebase';
import { db } from '../../Firebase';

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

export default class ShowDetails extends Component {
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
                console.log(JSON.stringify(result, null, 2))
                writeNewPost(uid, result, current_itemzor)
              } else {
                // shared
                result['createdOn'] = new Date();
                result['show'] = current_itemzor
                console.log(JSON.stringify(result, null, 2))
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

  componentWillMount(){
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
    this.setState({
      item: this.props.navigation.state.params.item
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
          console.log(presenter)
          show = mystring.substring(presenter.length+1, mystring.length)
          console.log(show)
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
                            console.log("Keys: ", keys)
                            console.log(JSON.stringify(data, null, 2))
                            // console.log("State Item: ", this.state.item)
                            console.log("Item: ", item)
                            // console.log("Props: ", this.props.navigation.state.params.item)
                            for(i=0;i<keys.length;i++){
                              var current_event = data[keys[i]]
                              if(current_event['title']==item.title && current_event['datetime'] == item.datetime){
                                db.ref('users/' + uid+'/events/'+keys[i]).remove()
                              }
                            }

                          })
                        console.log('OK Pressed')
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
                console.log("Promise: ", promise)

                for(i=0;i<promise.length;i++){
                  if(promise[i].title == this.state.item.title){
                    Alert.alert(
                      'Woops!',
                      'Event already saved in calendar.',
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
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
                        console.log('OK Pressed')
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
    const ColoredLine = ({ color, width }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
          width: width,
          paddingTop: 10,
          marginBottom: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      />
    );
    const item = this.props.navigation.state.params.item;
    return(
      <ScrollView style={{backgroundColor: '#c0dfc066'}}>
        <TouchableOpacity
          onPress={() => this.handleAddEvent(this.state.item)}
        >
          <View style={styles.imgWrapper}>
            <Image
               width={Dimensions.get('window').width}
               style={styles.image}
               resizeMode={'contain'}   /* <= changed  */
               source={{uri: item.img }}/>
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(item.ticket)}
        >
          <Text style={{color: 'white', fontWeight: 'bold'}}>GET TIX</Text>
        </TouchableOpacity>
        <ColoredLine color="green" width="90%" />

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
            {item.acts ? item.acts.map(act => <Text key={item.acts.indexOf(act)} style={{textAlign: 'justify'}}>{act}</Text>) : <Text></Text>}

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
        <ColoredLine color="green" width="90%" />
        <View>
          <Text style={styles.addressTitle}>Location</Text>
          <Text style={styles.address}>300 York Street{"\n"}New Haven, CT 06510</Text>
        </View>
        <TouchableOpacity>
          <MapView
            style={{height: 250, width: '100%'}}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: 41.304560,
              longitude: -72.934500,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            customMapStyle={mapStyle}
          >
            <MapView.Marker
              coordinate={{        latitude: 41.304560,
                      longitude: -72.934500,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421}}>
                      <Image source={require('../../assets/images/custom_marker.png')}/>
            </MapView.Marker>
          </MapView>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuTabs}
          onPress={() => {
            this.props.navigation.navigate('About', {info: 'tab'})
          }}>
          <View style={styles.menuTabText}>
            <Text>
              Venue Information
            </Text>
          </View>
          <View style={styles.menuTabIcon}>
            <Icon
               style={styles.menuTabIcon}
              name={'chevron-right'}
              size={20}/>
          </View>
        </TouchableOpacity>
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
              size={20}/>
          </View>
        </TouchableOpacity>
        <View style={styles.wrapper}>
          <View style={{
            width: '100%',
            padding: '2.5%'
          }}>
            <Text style={{
              fontSize: 18,
              fontFamily: "Merriweather-Regular",
              paddingBottom: '2.5%'
            }}>Suggestions for you</Text>
          </View>
        </View>

        <View>

        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create ({

  act:{
    width: '45%',
    marginRight: '2.5%'
  },
  address:{
    paddingTop: 0,
    paddingLeft: 20,
    paddingBottom: 20
  },
  addressTitle:{
    paddingLeft:20,
    paddingTop:10,
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
    fontWeight: 'bold'
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
    borderBottomWidth: 1
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
    flexDirection: 'row',
    padding: 20
  },
  menuTabText:{
    flexDirection: 'row',
    width: '80%'
  },
  menuTabIcon:{
    flex: 1,
    zIndex: 100000,
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%'
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
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10
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
  }
})
