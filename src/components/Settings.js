import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView
} from 'react-native';
import firebase from 'react-native-firebase';
import RNCalendarEvents from 'react-native-calendar-events';

export default class Dance extends Component {
  componentWillMount(){
    RNCalendarEvents.authorizationStatus()
    .then(status => {
       // if the status was previous accepted, set the authorized status to state
       this.setState({ cal_auth: status })
       if (status === 'authorized'){
         this.setState({ calendar: true })
       } else {
         this.setState({ calendar: false })
       }
       console.log("Status: ", status)
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

  }
  state = {
    currentUser: null,
    funk:false,
    hip_hop:false,
    metal: false,
    dance:false,
    reggae:false,
    blues:false,
    jazz:false,
    rock:false,
    ska:false,
    location:false
  }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  toggleFunk = (value) => {
    this.setState({funk: value})
    console.log(value)
  }

  toggleHip = (value) => {
    this.setState({hip_hop: value})
    console.log(value)
  }

  toggleMetal = (value) => {
    this.setState({metal: value})
    console.log(value)
  }

  toggleDance = (value) => {
    this.setState({dance: value})
    console.log(value)
  }

  toggleReggae = (value) => {
    this.setState({reggae: value})
    console.log(value)
  }

  toggleBlues = (value) => {
    this.setState({blues: value})
    console.log(value)
  }

  toggleJazz = (value) => {
    this.setState({jazz: value})
    console.log(value)
  }

  toggleRock = (value) => {
    this.setState({rock: value})
    console.log(value)
  }

  toggleSka = (value) => {
    this.setState({ska: value})
    console.log(value)
  }

  toggleLocation = (value) => {
    this.setState({location: value})
    console.log(value)
  }

  toggleCalendar = (value) => {
    this.setState({calendar: value})
    console.log(value)
  }


  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        this.props.navigation.navigate('Login')
    } catch (e) {
        console.log(e);
    }
  }


  render() {


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

    const { currentUser } = this.state
    return (
    <ScrollView>
      <View style={styles.container}>

        <View>
          <Text style={styles.title}>
            Genres
          </Text>
          <ColoredLine color="green" />
          <Text>Please select your musical preferences to receive notifications
          when your favorite genre is on our stage!</Text>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleFunk}
              value = {this.state.funk}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Funk</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleHip}
              value = {this.state.hip_hop}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Hip-Hop</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleMetal}
              value = {this.state.metal}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Metal</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleDance}
              value = {this.state.dance}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Dance</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleReggae}
              value = {this.state.reggae}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Reggae</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleBlues}
              value = {this.state.blues}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Blues</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleJazz}
              value = {this.state.jazz}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Jazz</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleRock}
              value = {this.state.rock}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Rock</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleSka}
              value = {this.state.ska}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Ska</Text>
          </View>
        </View>



        <View>
          <Text style={styles.title}>
            Location
          </Text>
          <ColoredLine color="green" />
          <Text>Turn on location services to use our built-in GPS feature for navigation
          to our front doors.</Text>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleLocation}
              value = {this.state.location}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Location</Text>
          </View>
        </View>

        <View>
          <Text style={styles.title}>
            Calendar
          </Text>
          <ColoredLine color="green" />
          <Text>Allow access to your calendar to add an events with the click of a button.</Text>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleCalendar}
              value = {this.state.calendar}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Calendar</Text>
          </View>
        </View>



        <View style={styles.bottomFooter}>
          <Text style={styles.currentUser}>
            Logged in as: {currentUser && currentUser.email}
          </Text>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signOutUser()}
            >
              <Text>Signout</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  bottomFooter:{
    marginTop: 25
  },
  container:{
    flex: 1,
    padding: 10
  },
  currentUser:{
    textAlign: 'right'
  },
  genre: {
    fontSize: 18,
    padding: 5
  },
  switchContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15
  }
})
