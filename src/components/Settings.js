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
import { db } from '../../Firebase';


export default class Dance extends Component {
  componentWillMount(){
    //Authorize Calendar Events
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
    alternative: false,
    location:false,
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
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })

    //Pull Genre Prefs from Database
    var user_id = firebase.auth().currentUser.uid
    db.ref(`users/${user_id}/genrePref`).once('value')
      .then((dataSnapShot) => {


        var string = JSON.stringify(dataSnapShot, null, 2)
        var object = JSON.parse(string)
        this.setState(object)
      })

  }


  updatePrefs = () => {
    genrePref = {
      alternative: this.state.alternative,
      alternative_rock: this.state.alternative_rock,
      american_rock: this.state.american_rock,
      classic_rock: this.state.classic_rock,
      comedy: this.state.comedy,
      dance: this.state.dance,
      hip_hop: this.state.hip_hop,
      funk: this.state.funk,
      indie: this.state.indie,
      metal: this.state.metal,
      musical_theatre: this.state.musical_theatre,
      pop: this.state.pop,
      reggae: this.state.reggae,
      r_n_b: this.state.r_n_b,
      ska: this.state.ska
    }
    var user_id = firebase.auth().currentUser.uid
    db.ref(`users/${user_id}/genrePref`).set(genrePref)
      .then(() => {
        console.log("New data sent!")
      })
      .catch(error => console.log("Error when creating new data.", error));
  }

  toggleAlternative = (value)=>{
    this.setState({alternative: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleAlternative_rock = (value)=>{
    this.setState({alternative_rock: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleClassic_rock = (value)=>{
    this.setState({classic_rock: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleAmerican_rock = (value)=>{
    this.setState({american_rock: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleComedy = (value)=>{
    this.setState({comedy: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleDance = (value)=>{
    this.setState({dance: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleHip = (value)=>{
    this.setState({hip_hop: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleFunk = (value)=>{
    this.setState({funk: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleIndie = (value)=>{
    this.setState({indie: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleMetal = (value)=>{
    this.setState({metal: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleMusical_theatre = (value)=>{
    this.setState({musical_theatre: value}, () =>{
      this.updatePrefs()
    })
  }
  togglePop = (value)=>{
    this.setState({pop: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleReggae = (value)=>{
    this.setState({reggae: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleR_n_b = (value)=>{
    this.setState({r_n_b: value}, () =>{
      this.updatePrefs()
    })
  }
  toggleSka = (value)=>{
    this.setState({ska: value}, () =>{
      this.updatePrefs()
    })
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
              onValueChange = {this.toggleAlternative}
              value = {this.state.alternative}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Alternative</Text>
          </View>

          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleAlternative_rock}
              value = {this.state.alternative_rock}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Alternative Rock</Text>
          </View>

          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleAmerican_rock}
              value = {this.state.american_rock}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>American Rock</Text>
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
              onValueChange = {this.toggleClassic_rock}
              value = {this.state.classic_rock}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Classic Rock</Text>
          </View>

          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.toggleComedy}
              value = {this.state.comedy}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Comedy</Text>
          </View>

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
              onValueChange = {this.toggleIndie}
              value = {this.state.indie}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Indie</Text>
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
              onValueChange = {this.toggleMusical_theatre}
              value = {this.state.musical_theatre}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Musical Theatre</Text>
          </View>

          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange = {this.togglePop}
              value = {this.state.pop}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>Pop</Text>
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
              onValueChange = {this.toggleR_n_b}
              value = {this.state.r_n_b}
              trackColor={{true: '#008000b3'}}/>
            <Text style={styles.genre}>R & B</Text>
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
