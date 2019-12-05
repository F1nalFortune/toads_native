import React, {Fragment, Component} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  Alert,
  SafeAreaView,
  NativeModules
} from 'react-native';
import Image from 'react-native-scalable-image';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Calendar from './Calendar';
import Directions from './Directions';
import HomeScreen from './HomeScreen';
import Lillys from './Lillys';
import Settings from './Settings';
import LillysCarousel from './galleries/LillysCarousel';
import RainforestCarousel from './galleries/RainforestCarousel'
import About from './About';
import Tickets from './Tickets';
import AddressScreen from './AddressScreen';
import ShowDetails from './ShowDetails';
import PhotoGallery from './galleries/PhotoGallery';
import cio from 'cheerio-without-node-native';
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';

import Loading from './Loading'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'

import BottomTabBar from 'react-navigation-selective-tab-bar';

export default class Application extends Component {
  constructor(){
    super();
    this.state = {
      cal_auth: ''
    }
  }
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
    console.disableYellowBox = true;
  }
//Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

    //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }

    //3
  async getToken() {
    const fcmToken = await firebase.messaging().getToken()
    if (fcmToken) {
      console.log(fcmToken);
      this.showAlert('Your Firebase Token is:', fcmToken);
    } else {
      this.showAlert('Failed', 'No token received');
    }
  }

    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  render() {


    const HomeStack = createStackNavigator({
      HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
          title: "Toad's Place",
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
        }
      },
      About: {
        screen: About,
        navigationOptions: {
          title: "Venue Info",
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
        }
      },
      Settings: {
        screen: Settings,
        navigationOptions: {
          title: "Settings",
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
        }
      }
    });

    const CalendarStack = createStackNavigator({
      Calendar: {
        screen: Calendar,
        navigationOptions: {
          title: "Calendar",
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
          headerBackTitle: "Events"
        }
      },
      Details: {
        screen: ShowDetails
      }
    });

    const LillyStack = createStackNavigator({
      Lillys: {
        screen: Lillys,
        navigationOptions: {
          title: "Lilly's Pad",
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
        }
      },
      LillysScreen: {
        screen: LillysCarousel,
        navigationOptions: {
          title: "Lilly's Pad",
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
        }
       },
      RainforestScreen: {
        screen: RainforestCarousel,
        navigationOptions: {
          title: "Rainforest Room",
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
        }
      }
    });

    const DirectionStack = createStackNavigator({
      Directions: { screen: Directions,
        navigationOptions: {
          title: "Directions",
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
        }
      },
      Address: { screen: AddressScreen }
    })

    const GalleryStack = createStackNavigator({
      Gallery: {
        screen: PhotoGallery,
        navigationOptions: {
          title: "Gallery",
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
        }
      }
    })

    const AppContainer = createAppContainer(createBottomTabNavigator(
        {
          Loading: {
            screen: Loading,
            navigationOptions: {
              tabBarVisible: false
            }
           },
          SignUp: { screen: SignUp,
            navigationOptions: {
              tabBarVisible: false
            }
          },
          Login: {
            screen: Login,
            navigationOptions: {
              tabBarVisible: false
            }
          },
          HomeScreen: {
            screen: HomeStack,
            navigationOptions: {
              title: "Toad's Place",
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
                textAlign: 'center',
                fontFamily: "Merriweather-Bold",
                textTransform: 'uppercase',
                fontSize: 24,
                padding: 10
              }
            }
           },
          Calendar: { screen: CalendarStack },
          Directions: { screen: DirectionStack},
          Lillys: { screen: LillyStack},
          Gallery: { screen: GalleryStack}
        },
        {
          defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
              const { routeName } = navigation.state;
              let iconName;
              if (routeName === 'HomeScreen') {
                iconName = 'home';
                icon = <Icon name={iconName} size={30} style={styles.glow}/>
                // We want to add badges to home tab icon
                // IconComponent = HomeIconWithBadge;
              } else if (routeName === 'Calendar') {
                iconName = 'calendar-alt'
                icon = <Icon name={iconName} size={30} style={styles.glow}/>
              } else if (routeName === 'Directions'){
                iconName = 'location-arrow';
                icon = <Icon name={iconName} size={30} style={styles.glow}/>
              } else if (routeName ==='Lillys'){
                iconName = 'glass-martini';
                icon = <Icon name={iconName} size={30} style={styles.glow}/>
              } else if(routeName ==='Tickets'){
                iconName= 'ticket-alt';
                icon = <Icon name={iconName} size={30} style={styles.glow}/>
              } else if(routeName ==='Gallery'){
                iconName= 'camera-retro';
                icon = <Icon name={iconName} size={30} style={styles.glow}/>
              } else{
                iconName= 'camera-retro';
                icon = <Icon name={iconName} size={30} style={{display: 'none'}}/>
              }
              return icon;
            },
          }),
          tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            inactiveBackgroundColor: 'black',
            activeBackgroundColor: '#272727',
            style:{
              height: 65,
              zIndex: 1000
            }
          }
        },
        {
          tabBarComponent: props => {
            return (
              <BottomTabBar
                {...props}
                display={["HomeScreen", "Calendar", "Directions", "Lillys", "Gallery"]} // Required
              />
            );
          }
        },
        {
          initialRouteName: 'Loading'
        }
      ));
    return <AppContainer />;
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
