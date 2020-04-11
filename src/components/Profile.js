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
  Button
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modalbox';
import BirthdayPicker from './BirthdayPicker'





export default class Profile extends Component {
  state={
    avatarSource: require("../../assets/images/default_user.png"),
    isModalVisible:false,
    isOpen: false,
    isDisabled: false,
    swipeToClose: true
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

        this.setState({
          avatarSource: source,
        });
      }
    });
  }
  openModal = () =>{
    this.setState({
      isModalVisible:true
    })
  }

  closeModal = () =>{
    this.setState({
      isModalVisible:false
    })
  }

  toggleModal = () =>{
    this.setState({
      isModalVisible:!this.state.isModalVisible
    })
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
              <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
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
            onPress={() => this.props.navigation.navigate('Promotions')}>
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
            onPress={() => this.refs.modal4.open()}
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

          <Modal
            ref={"modal4"}
            isOpen={this.state.isOpen}
            onClosed={() => this.setState({isOpen: false})}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 300
            }}
            position={"bottom"}
            backdropPressToClose={false}
          >
            <BirthdayPicker
              selectedYear={2020}
              selectedMonth={0}
              selectedDay={27}
              yearsBack={120}
              onYearValueChange={(year,i) => console.log("Year was changed to: ", year)}
              onMonthValueChange={(month,i) => console.log("Month was changed to: ", month)}
              onDayValueChange={(day,i) => console.log("Day was changed to: ", day)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log(this.state.isOpen)
                this.refs.modal4.close()
                this.setState({
                  isOpen: false
                })
                console.log(this.state.isOpen)
              }}
            >
              <Text>Save</Text>
            </TouchableOpacity>
          </Modal>


          <ColoredLine color="grey" width="100%" pad={5}/>


          <TouchableOpacity
            style={styles.menuTabs}
            onPress={() => {
              var url = "https://toadsdanceparty.com/contact"
              this.props.navigation.navigate('SettingsBrowser', {url})
            }}
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
