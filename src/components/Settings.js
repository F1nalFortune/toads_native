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

export default class Dance extends Component {
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
    ska:false
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

  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        this.props.navigation.navigate('Login')
    } catch (e) {
        console.log(e);
    }
  }


  render() {


    const SwitchContainer = ({ genre }) => {
        <View style={styles.switchContainer}>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleSwitch}
            value = {this.state.switchValue}/>
          <Text style={styles.genre}>Genre</Text>
        </View>
    }

    const { currentUser } = this.state
    return (
    <ScrollView>
      <View style={styles.container}>
        <Text>
          Current User: {currentUser && currentUser.email}
        </Text>
        <Text>Please select your musical preferences to receive notifications
        when your favorite genre is on our stage!</Text>

        <View style={styles.switchContainer}>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleFunk}
            value = {this.state.funk}/>
          <Text style={styles.genre}>Funk</Text>
        </View>

        <View style={styles.switchContainer}>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleHip}
            value = {this.state.hip_hop}/>
          <Text style={styles.genre}>Hip-Hop</Text>
        </View>

        <View style={styles.switchContainer}>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleMetal}
            value = {this.state.metal}/>
          <Text style={styles.genre}>Metal</Text>
        </View>

        <View style={styles.switchContainer}>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleDance}
            value = {this.state.dance}/>
          <Text style={styles.genre}>Dance</Text>
        </View>

        <View style={styles.switchContainer}>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleReggae}
            value = {this.state.reggae}/>
          <Text style={styles.genre}>Reggae</Text>
        </View>

        <View style={styles.switchContainer}>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleBlues}
            value = {this.state.blues}/>
          <Text style={styles.genre}>Blues</Text>
        </View>

        <View style={styles.switchContainer}>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleJazz}
            value = {this.state.jazz}/>
          <Text style={styles.genre}>Jazz</Text>
        </View>

        <View style={styles.switchContainer}>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleRock}
            value = {this.state.rock}/>
          <Text style={styles.genre}>Rock</Text>
        </View>

        <View style={styles.switchContainer}>
          <Switch
            style={{marginTop:30}}
            onValueChange = {this.toggleSka}
            value = {this.state.ska}/>
          <Text style={styles.genre}>Ska</Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.signOutUser()}
          >
            <Text>Signout</Text>
          </TouchableOpacity>
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
  container:{
    flex: 1,
    padding: 10
  },
  genre: {
    fontSize: 18,
    padding: 5
  },
  switchContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
})
