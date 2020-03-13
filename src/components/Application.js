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

  render() {

    const HomeStack = createStackNavigator({
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          title: "Toad's Place",
          headerStyle: {
            backgroundColor: "#000000cc",
            opacity: .8,
            borderBottomColor: 'green',
            borderBottomWidth: 1
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
            opacity: .8,
            borderBottomColor: 'green',
            borderBottomWidth: 1
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
            opacity: .8,
            borderBottomColor: 'green',
            borderBottomWidth: 1
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
            opacity: .8,
            borderBottomColor: 'green',
            borderBottomWidth: 1
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
            opacity: .8,
            borderBottomColor: 'green',
            borderBottomWidth: 1
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
            opacity: .8,
            borderBottomColor: 'green',
            borderBottomWidth: 1
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
            opacity: .8,
            borderBottomColor: 'green',
            borderBottomWidth: 1
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
            opacity: .8,
            borderBottomColor: 'green',
            borderBottomWidth: 1
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
            opacity: .8,
            borderBottomColor: 'green',
            borderBottomWidth: 1
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

    const MainTabs = createBottomTabNavigator({
        Home: { screen: HomeStack },
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
          if (routeName === 'Home') {
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
    });

    const Application = createAppContainer(createSwitchNavigator({
      Loading: {
        screen: Loading,
      },
      SignUp: {
        screen: SignUp,
      },
      Login: {
        screen: Login,
      },
      App: {
        screen: MainTabs
      }
    },
    {
      initialRouteName: 'Loading'
    }
  ));
    return <Application />;
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
