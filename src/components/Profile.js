import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  Button,
  TextInput,
  Picker
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modalbox';
import BirthdayPicker from './BirthdayPicker'
import EditName from './EditName'
import { db } from '../../Firebase';


export default class Profile extends Component {
  state={
    avatar: require("../../assets/images/default_user.png"),
    isModalVisible:false,
    isOpen: false,
    isDisabled: false,
    swipeToClose: true,
    name: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
    gender: null
  }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var user_id = firebase.auth().currentUser.uid
    console.log("Reading Info Preferences...")
    db.ref(`users/${user_id}/info`).once('value')
      .then((dataSnapShot) => {
        var string = JSON.stringify(dataSnapShot, null, 2)
        var object = JSON.parse(string)
        console.log(string)
        this.setState({
          name: object.name,
          year: object.birthday.year,
          month: object.birthday.month,
          day: object.birthday.day,
          gender: object.gender,
          avatar: object.avatar,
        })
      })
    //Pull Notification Settings from Database

  }


  updateName = (name) => {
    var user_id = firebase.auth().currentUser.uid
    db.ref(`users/${user_id}/info/name`).set(name)
      .then(() => {
        console.log("Name updated: ", name)
        this.setState({
          isOpen: false
        })
      })
      .catch(error => console.log("Error when creating new data.", error));
    this.refs.name.close()
  }
  updateBirthday = (birthday) => {
    var user_id = firebase.auth().currentUser.uid
    db.ref(`users/${user_id}/info/birthday/month`).set(birthday.month)
      .then(() => {
        console.log("Month updated: ", birthday.month)
        this.setState({
          isOpen: false,
          month: month
        })
      })
      .catch(error => console.log("Error when creating new data.", error));
    db.ref(`users/${user_id}/info/birthday/year`).set(birthday.year)
      .then(() => {
        console.log("Year updated: ", birthday.year)
        this.setState({
          isOpen: false,
          year: year
        })
      })
      .catch(error => console.log("Error when creating new data.", error));
    db.ref(`users/${user_id}/info/birthday/day`).set(birthday.day)
      .then(() => {
        console.log("Day updated: ", birthday.day)
        this.setState({
          isOpen: false,
          day: day
        })
      })
      .catch(error => console.log("Error when creating new data.", error));
    this.refs.birthday.close()
  }
  updateGender = (gender) => {
     var user_id = firebase.auth().currentUser.uid
     db.ref(`users/${user_id}/info/gender`).set(gender)
       .then(() => {
         console.log("Gender updated: ", gender)
         this.setState({
           isOpen: false,
           gender: gender
         })
       })
       .catch(error => console.log("Error when creating new data.", error));
     this.refs.gender.close()
  }
  updatePhoto = (avatar) => {
    var user_id = firebase.auth().currentUser.uid
    db.ref(`users/${user_id}/info/avatar`).set(avatar.uri)
      .then(() => {
        console.log("Photo updated: ", avatar)
        this.setState({
          isOpen: false,
          avatar: avatar.uri
        })
      })
      .catch(error => console.log("Error when creating new data.", error));
  }
  handleChangeText = (text, type) => {
    this.setState({
      [type]: text
    });
  }
  _imagePicker = () =>{
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.updatePhoto(source)
      }
    });
  }

  render() {
    const { currentUser } = firebase.auth()
    firebase.analytics().setCurrentScreen('profile');
    const ColoredLine = ({ color }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
          width: '90%',
          paddingTop: 10,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />
    );
    return (
        <View style={styles.container}>
          <View style={{
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 25
            }}
            onPress={() => this._imagePicker()}>
              <Image source={this.state.avatar} style={styles.uploadAvatar} />
              <Text style={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                Logged in as: {currentUser && currentUser.email}
              </Text>
          </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.menuTabs}
            onPress={() => this.refs.name.open()}>
            <View style={styles.menuTabText}>
              <Text>
                Name
              </Text>
            </View>
            <View style={styles.menuTabIcon}>
              <Icon
                 style={styles.menuTabIcon}
                name={'chevron-right'}
                size={20}/>
            </View>
          </TouchableOpacity>
          <ColoredLine color="grey" width="100%" pad={5}/>

          <TouchableOpacity
            style={styles.menuTabs}
            onPress={() => this.refs.birthday.open()}
          >
            <View style={styles.menuTabText}>
              <Text>
                Birthday
              </Text>
            </View>
            <View style={styles.menuTabIcon}>
              <Icon
                 style={styles.menuTabIcon}
                name={'chevron-right'}
                size={20}/>
            </View>
          </TouchableOpacity>
          <ColoredLine color="grey" width="100%" pad={5}/>


          <TouchableOpacity
            style={styles.menuTabs}
            onPress={() => this.refs.gender.open()}
          >
            <View style={styles.menuTabText}>
              <Text>
                Gender
              </Text>
            </View>
            <View style={styles.menuTabIcon}>
              <Icon
                 style={styles.menuTabIcon}
                name={'chevron-right'}
                size={20}/>
            </View>
          </TouchableOpacity>
          <Modal
            ref={"birthday"}
            isOpen={this.state.isOpen}
            onClosed={() => this.setState({isOpen: false})}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 300
            }}
            position={"bottom"}
            backdropPressToClose={true}
          >
            <Text>
              Birthday{"\n"}
              Get notified for all age shows.
            </Text>
            <BirthdayPicker
              selectedYear={this.state.year}
              selectedMonth={this.state.month}
              selectedDay={this.state.day}
              yearsBack={120}
              onYearValueChange={(year,i) => this.setState({year: year})}
              onMonthValueChange={(month,i) => this.setState({month: month})}
              onDayValueChange={(day,i) => this.setState({day: day})}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateBirthday({
                  year: this.state.year,
                  month: this.state.month,
                  day: this.state.day
                })
              }}
            >
              <Text>Save</Text>
            </TouchableOpacity>
          </Modal>
          <Modal
            ref={"name"}
            isOpen={this.state.isOpen}
            onClosed={() => this.setState({isOpen: false})}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 300
            }}
            position={"bottom"}
            backdropPressToClose={true}
          >
            <Text>
              Name{"\n"}
              Let others see your name on your profile.
            </Text>
            <EditName
              changeText={(text, type) => this.handleChangeText(text, type)} // Added new props here & also removed the type props
              value={this.state.name}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateName(this.state.name)
              }}
            >
              <Text>Save</Text>
            </TouchableOpacity>
          </Modal>
          <Modal
            ref={"gender"}
            isOpen={this.state.isOpen}
            onClosed={() => this.setState({isOpen: false})}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 300
            }}
            position={"bottom"}
            backdropPressToClose={true}
          >
            <View style={styles.container}>
              <Text>
                Gender{"\n"}
                Indicating your gender lets Toad's know how to refer to you.{"\n"}
                Learn more
              </Text>


              <Picker
                selectedValue={this.state.gender}
                style={{ height: 50, width: 150 }}
                onValueChange={(gender) => {
                  this.setState({gender: gender});
                }}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Rather Not Say" value="null" />
              </Picker>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateGender(this.state.gender)
              }}
            >
              <Text>Save</Text>
            </TouchableOpacity>
          </Modal>
        </View>
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
    padding: 10,
    height: '100%'
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
  },
  uploadAvatar:{
    borderRadius: 50,
    width: 100,
    height: 100
  }
})
