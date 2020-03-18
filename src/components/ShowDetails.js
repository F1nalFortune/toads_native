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
import Icon from 'react-native-vector-icons/FontAwesome5';
import ShareButton from './ShareButton'


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
    var current_itemzor = navigation.state.params.item
    return {
      headerTitle: "Event Info",
      headerRight: <Icon
        style={{
          color:'#fff',
          padding: 10
         }}
        name={'share-square'}
        size={20}
        onPress={async () => {
          try {
            const result = await Share.share({
              title: current_itemzor.title,
              message:`${fullDay(current_itemzor.date[2])}, ${fullMonth(current_itemzor.date[0])} ${nth(current_itemzor.date[1])} at Toad's Place!`,
              url: 'http://www.toadsplace.com'
            });

            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
                console.log("Activity Type: ", result.activityType)
              } else {
                // shared
                console.log("Shared Result: ")
                console.log(JSON.stringify(result, null, 2))
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
    this.setState({
      show: false,
      presenter: false
    })
    if(myFunction(this.props.navigation.state.params.item.title)){
      var result = myFunction(this.props.navigation.state.params.item.title);
      var presenter = result.presenter;
      var show = result.show;
      console.log("Presenter: ", presenter)
      console.log("Show: ", show)
      this.setState({
        show: show,
        presenter: presenter
      })
    }
    // console.log(this.state.item.information[3])
    console.log("Item: ", item)
    var eventDate = handleCreateDate(item.date);
    var eventTime = handleCreateTime(item.information[3])
    var fullDate = eventDate + " " + eventTime + " GMT-0400 (Eastern Daylight Time)";
    var startDate = new Date(fullDate)
    var endDate = eventDate + " " + eventTime + " GMT-0400 (Eastern Daylight Time)";
    endDate = new Date(endDate)
    endDate.setHours(endDate.getHours() + 1)

    RNCalendarEvents.fetchAllEvents(startDate.toISOString(), endDate.toISOString())
    .then((promise) => {
      for(i=0;i<promise.length;i++){
        if(promise[i].title == item.title){
          this.setState({
            savedInCalendar: true,
            buttonText: 'REMOVE FROM CALENDAR'
          })
          break;
        }
      }
      if(!this.state.savedInCalendar){
        this.setState({
          savedInCalendar: false,
          buttonText: 'ADD TO CALENDAR'
        })
      }
    })
    .catch(error => {
      console.log("Error: ", error)
      this.setState({
        savedInCalendar: false,
        buttonText: 'ADD TO CALENDAR'
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
                        console.log('OK Pressed')
                      }},
                    ],
                    {cancelable: false},
                  );
                })
                this.setState({
                  savedInCalendar: false,
                  buttonText: 'ADD TO CALENDAR'
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
                      }},
                    ],
                    {cancelable: false},
                  );
                  this.setState({
                    savedInCalendar: true,
                    buttonText: 'REMOVE FROM CALENDAR'
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
          { this.state.show ?
            <View>
              <Text style={styles.subtitle}>{this.state.presenter}</Text>
              <Text style={styles.eventTitle}>{this.state.show}</Text>
            </View> :
            <Text style={styles.eventTitle}>{this.state.item.title}</Text>
          }
          {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : <View></View>}
          <Text
            style={styles.date}>
              {item.date[2]} \\
              <Text style={{fontWeight: 'bold'}}>
                {item.date[0] + ' ' + item.date[1]}
              </Text>
          </Text>
          <ColoredLine color="green" />
        </View>

        <View style={styles.wrapper}>
          <View style={styles.info}>
            <Text>Opening Acts</Text>
            <ColoredLine color="green" />
            {item.acts ? item.acts.map(act => <Text key={item.acts.indexOf(act)}>{act}</Text>) : <Text></Text>}
          </View>
          <View style={styles.info}>
            <Text>Showtime</Text>
            <ColoredLine color="green" />
            <Text>{item.information[2]}</Text>
            <Text>{item.information[3]}</Text>
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL(item.ticket)}
        >
          <Text style={{color: 'white', fontWeight: 'bold'}}>GET TIX</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuTabs}
          onPress={() => this.props.navigation.push('Tickets')}>
          <View style={styles.menuTabText}>
            <Text>
              Ticket Information
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
          onPress={() => this.props.navigation.push('Venue')}>
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
          onPress={() => this.handleAddEvent()}>
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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create ({
  act:{
    width: '45%',
    marginRight: '2.5%'
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
    margin: 10,
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
    width: '45%',
    marginLeft: '2.5%'
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
    paddingTop: 10,
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
    // width: 100,
    paddingTop: 10,
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
