import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Linking
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { db } from '../../Firebase';



export default class Promotions extends Component {
  state = {
    currentUser: null,
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
    promotions: false,
    rap: false,
    reggae: false,
    r_n_b: false,
    ska: false
  }
  componentDidMount() {
    console.disableYellowBox = true;
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    //Pull Genre Prefs from Database
    var user_id = firebase.auth().currentUser.uid
    console.log("Reading Genre Preferences...")
    db.ref(`users/${user_id}/genrePref`).once('value')
      .then((dataSnapShot) => {
        var string = JSON.stringify(dataSnapShot, null, 2)
        var object = JSON.parse(string)
        this.setState(object)
      })
    //Pull Notification Settings from Database

    console.log("Trying to read Promototions....")
    var user_id = firebase.auth().currentUser.uid
    db.ref(`users/${user_id}/promotions`).once('value')
      .then((dataSnapShot) => {
        console.log("Succesfully read promotions: ")
        this.setState({
          promotions: dataSnapShot._value
        })
        console.log(this.state.promotions)
      })
      .catch((err)=>{
        console.log("Error reading promotions")
        console.log(err)
      })

  }
  updatePromotions = () => {
    promotions = this.state.promotions;
    var user_id = firebase.auth().currentUser.uid
    db.ref(`users/${user_id}/promotions`).set(promotions)
      .then(() => {
        console.log("New data sent!")
      })
      .catch(error => console.log("Error when creating new data.", error));
  }
  toggle_promotions = (value)=>{this.setState({promotions: value}, ()=>{this.updatePromotions()})}


  updatePrefs = () => {
    genrePref = {
      acoustic: this.state.acoustic,
      alternative: this.state.alternative,
      alternative_rock: this.state.alternative_rock,
      classic_rock: this.state.classic_rock,
      american_rock: this.state.american_rock,
      comedy: this.state.comedy,
      dance: this.state.dance,
      dubstep: this.state.dubstep,
      emo: this.state.emo,
      hip_hop: this.state.hip_hop,
      funk: this.state.funk,
      indie: this.state.indie,
      metal: this.state.metal,
      musical_theatre: this.state.musical_theatre,
      pop: this.state.pop,
      rap: this.state.rap,
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
  toggle_acoustic = (value)=>{this.setState({acoustic: value}, ()=>{this.updatePrefs()})}
  toggle_alternative = (value)=>{this.setState({alternative: value}, ()=>{this.updatePrefs()})}
  toggle_alternative_rock = (value)=>{this.setState({alternative_rock: value}, ()=>{this.updatePrefs()})}
  toggle_classic_rock = (value)=>{this.setState({classic_rock: value}, ()=>{this.updatePrefs()})}
  toggle_american_rock = (value)=>{this.setState({american_rock: value}, ()=>{this.updatePrefs()})}
  toggle_comedy = (value)=>{this.setState({comedy: value}, ()=>{this.updatePrefs()})}
  toggle_dance = (value)=>{this.setState({dance: value}, ()=>{this.updatePrefs()})}
  toggle_dubstep = (value)=>{this.setState({dubstep: value}, ()=>{this.updatePrefs()})}
  toggle_emo = (value)=>{this.setState({emo: value}, ()=>{this.updatePrefs()})}
  toggle_hip_hop = (value)=>{this.setState({hip_hop: value}, ()=>{this.updatePrefs()})}
  toggle_funk = (value)=>{this.setState({funk: value}, ()=>{this.updatePrefs()})}
  toggle_indie = (value)=>{this.setState({indie: value}, ()=>{this.updatePrefs()})}
  toggle_metal = (value)=>{this.setState({metal: value}, ()=>{this.updatePrefs()})}
  toggle_musical_theatre = (value)=>{this.setState({musical_theatre: value}, ()=>{this.updatePrefs()})}
  toggle_pop = (value)=>{this.setState({pop: value}, ()=>{this.updatePrefs()})}
  toggle_rap = (value)=>{this.setState({rap: value}, ()=>{this.updatePrefs()})}
  toggle_reggae = (value)=>{this.setState({reggae: value}, ()=>{this.updatePrefs()})}
  toggle_r_n_b = (value)=>{this.setState({r_n_b: value}, ()=>{this.updatePrefs()})}
  toggle_ska = (value)=>{this.setState({ska: value}, ()=>{this.updatePrefs()})}
  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
  }
  render() {
    firebase.analytics().setCurrentScreen('promotions');
    const ColoredLine = ({ color, width, pad }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
          width: width,
          paddingTop: pad,
          marginBottom: pad
        }}
      />
    );
    const { currentUser } = this.state
    return (
    <ScrollView>
      <View style={styles.container}>
      <Text>Turn your push notification settings on or off.</Text>
      <ColoredLine color="green" width="90%" pad={10}/>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <View style={styles.menuTabText}>
            <Text>
              Promotions
            </Text>
          </View>
          <View style={styles.menuTabIcon}>
            <Switch
              onValueChange= {this.toggle_promotions}
              value = {this.state.promotions}
              trackColor = {{true: '#008000b3'}}/>
          </View>
        </TouchableOpacity>

          <ColoredLine color="green" width="90%" pad={10}/>
          <Text>Please select your musical preferences to receive live notifications
          when your favorite genre is on our stage!</Text>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_acoustic}
              value = {this.state.acoustic}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Acoustic</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_alternative}
              value = {this.state.alternative}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Alternative</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_alternative_rock}
              value = {this.state.alternative_rock}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Alternative Rock</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_classic_rock}
              value = {this.state.classic_rock}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Classic Rock</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_american_rock}
              value = {this.state.american_rock}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>American Rock</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_comedy}
              value = {this.state.comedy}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Comedy</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_dance}
              value = {this.state.dance}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Dance</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_dubstep}
              value = {this.state.dubstep}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Dubstep</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_emo}
              value = {this.state.emo}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Emo</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_hip_hop}
              value = {this.state.hip_hop}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Hip-Hop</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_funk}
              value = {this.state.funk}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Funk</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_indie}
              value = {this.state.indie}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Indie</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_metal}
              value = {this.state.metal}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Metal</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_musical_theatre}
              value = {this.state.musical_theatre}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Musical Theatre</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_pop}
              value = {this.state.pop}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Pop</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_rap}
              value = {this.state.rap}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Rap</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_reggae}
              value = {this.state.reggae}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Reggae</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_r_n_b}
              value = {this.state.r_n_b}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>R&B</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginTop:30}}
              onValueChange= {this.toggle_ska}
              value = {this.state.ska}
              trackColor = {{true: '#008000b3'}}/>
            <Text style={styles.genre}>Ska</Text>
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
  },
  menuTabs:{
    flexDirection: 'row',
    padding: 20
  },
  menuTabText:{
    flexDirection: 'row',
    width: '80%',
    fontSize: 18
  },
  menuTabIcon:{
    flex: 1,
    zIndex: 100000,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '20%'
  }
})
