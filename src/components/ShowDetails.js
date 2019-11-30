import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Linking
} from 'react-native';
import Image from 'react-native-scalable-image';
import RNCalendarEvents from 'react-native-calendar-events';


export default class ShowDetails extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
      title: "Event Info",
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
      },
      headerBackTitle: "Back"
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
    handleCreateDate = (date) => {
      var month = date[0];
      var year = new Date().getFullYear();
      var day = date[1];
      var eventDate = day + " " + month + " " + year;
      return eventDate;
    }
    handleCreateTime = (time) => {
      //ADD 0 PLACEHOLDER
      var showtime = time.replace("SHOW STARTS @ ", "");
      var minutes = showtime.substring(showtime.length - 3)
      showtime = showtime.substring(0, showtime.length - 3)
      showtime = parseInt(showtime) + 12
      showtime = showtime.toString();
      showtime = showtime + minutes
      return showtime
    }
    // console.log(this.state.item.information[3])

    var eventDate = handleCreateDate(item.date);
    var eventTime = handleCreateTime(item.information[3])
    var fullDate = eventDate + " " + eventTime + " GMT-0400 (Eastern Daylight Time)";
    var startDate = new Date(fullDate)
    var endDate = eventDate + " " + eventTime + " GMT-0400 (Eastern Daylight Time)";
    endDate = new Date(endDate)
    endDate.setHours(endDate.getHours() + 1)

    RNCalendarEvents.fetchAllEvents(startDate.toISOString(), endDate.toISOString())
    .then((promise) => {
      if (promise[0].title == item.title){
        this.setState({
          savedInCalendar: true,
          buttonText: 'REMOVE EVENT FROM CALENDAR'
        })
      }
    })
    .catch(error => {
      this.setState({
        savedInCalendar: false,
        buttonText: 'ADD EVENT TO CALENDAR'
      })
    })
  }
  handleAddEvent = () => {
    // console.log(JSON.stringify(props,0,2))
    if(this.state.cal_auth == 'authorized'){
      handleCreateDate = (date) => {
        var month = date[0];
        var year = new Date().getFullYear();
        var day = date[1];
        var eventDate = day + " " + month + " " + year;
        return eventDate;
      }
      handleCreateTime = (time) => {
        //ADD 0 PLACEHOLDER
        var showtime = time.replace("SHOW STARTS @ ", "");
        var minutes = showtime.substring(showtime.length - 3)
        showtime = showtime.substring(0, showtime.length - 3)
        showtime = parseInt(showtime) + 12
        showtime = showtime.toString();
        showtime = showtime + minutes
        return showtime
      }
      // console.log(this.state.item.information[3])

      var eventDate = handleCreateDate(this.state.item.date);
      var eventTime = handleCreateTime(this.state.item.information[3])
      var fullDate = eventDate + " " + eventTime + " GMT-0400 (Eastern Daylight Time)";
      var startDate = new Date(fullDate)

      var endDate = eventDate + " " + eventTime + " GMT-0400 (Eastern Daylight Time)";
      endDate = new Date(endDate)
      endDate.setHours(endDate.getHours() + 1)
      // console.log("Start Date: " + startDate)
      // console.log("End Date: " + endDate)
      // console.log("Title: " + this.state.item.title)
      if (this.state.savedInCalendar){
        Alert.alert(
          'Confirm',
          'Remove event to calendar?',
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
                        console.log('OK Pressed')
                      }},
                    ],
                    {cancelable: false},
                  );
                })
                this.setState({
                  savedInCalendar: false,
                  buttonText: 'ADD EVENT TO CALENDAR'
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
              console.log(JSON.stringify(this.state.item, null, 2))
              RNCalendarEvents.fetchAllEvents(startDate.toISOString(), endDate.toISOString())
              .then((promise) => {
                if (promise[0].title == this.state.item.title){
                  Alert.alert(
                    'Woops!',
                    'Event already saved in calendar.',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
                }

              })
              .catch(error => {
                var item_details = this.state.item
                var acts = ""
                for(i=0; i<this.state.item.acts.length;i++){
                  acts.concat(this.state.item.acts[i]);
                  acts.concat("\n");
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
                      }},
                    ],
                    {cancelable: false},
                  );
                  this.setState({
                    savedInCalendar: true,
                    buttonText: 'REMOVE EVENT FROM CALENDAR'
                  })
                })
                .catch(error => {
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
    const item = this.props.navigation.state.params.item;

    return(
      <ScrollView>
        <TouchableOpacity
          onPress={() => this.handleAddEvent()}
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
          <Text style={styles.eventTitle}>{this.state.item.title}</Text>
          <ColoredLine color="green" />
          <Text
            style={styles.date}>
              {item.date[2]} \\
              <Text style={{fontWeight: 'bold'}}>
                {item.date[0] + ' ' + item.date[1]}
              </Text>
          </Text>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.act}>
            {item.acts.map(act => <Text key={item.acts.indexOf(act)}>{act}</Text>)}
          </View>
          <View style={styles.info}>
            <Text>{item.information[0]}</Text>
            <Text>{item.information[1]}</Text>
            <Text>{item.information[2]}</Text>
            <Text>{item.information[3]}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.starDetail}>{item.starInfo}</Text>
        </View>
        <View style={styles.starDetail}>
          {item.infoLinks.map(infoLink =>
            <Text
              key={item.infoLinks.indexOf(infoLink)}
              style={styles.infoLink}
            >
              {infoLink.text}**
            </Text>)}
        </View>
        <View style={styles.footer}>
          <Text>{item.information[4]}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(item.ticket)}
          >
            <Text>GET TIX</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={this.state.savedInCalendar ? styles.delButton : styles.button}
            onPress={() => this.handleAddEvent()}
          >
            <Text>{this.state.buttonText}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create ({
  act:{
    width: '50%'
  },
  bold:{
    fontWeight: 'bold'
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
    fontSize: 24,
    textTransform: 'uppercase'
  },
  dateWrapper:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventTitle:{
    paddingTop: 10,
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
    width: '50%'
  },
  icon:{

  },
  imgWrapper:{
    width: '100%'
  },
  image: {
      flex: 1,
      alignSelf: 'stretch'
  },
  link:{
    color: 'blue',
    zIndex: 100
  },
  starDetail:{
    textAlign: 'center',
    paddingTop: 10,
    position: 'relative'
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
    // width: 100,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
})
