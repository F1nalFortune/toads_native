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
import HomeScreen from './HomeScreen';
import Lillys from './Lillys';
import Settings from './Settings';
import LillysCarousel from './galleries/LillysCarousel';
import RainforestCarousel from './galleries/RainforestCarousel'
import About from './About';
import ShowDetails from './ShowDetails';
import PhotoGallery from './galleries/PhotoGallery';
import Tickets from './FAQs/Tickets'
import Payments from './FAQs/Payments'
import Parking from './FAQs/Parking'
import Requirements from './FAQs/Requirements'
import SmokingPolicy from './FAQs/SmokingPolicy'
import AudioVideo from './FAQs/AudioVideo'
import Refunds from './FAQs/Refunds'
import CoatCheck from './FAQs/CoatCheck'
import Hotels from './FAQs/Hotels'
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
    const SettingsStack = createStackNavigator({
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
          }
        }
      },
    })

    const VenueStack = createStackNavigator({
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
          }
        }
      },
      Tickets: {
        screen: Tickets,
        navigationOptions: {
          title: "Tickets",
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
          }
        }
      },
      Payments: {
        screen: Payments,
        navigationOptions: {
          title: "Payments",
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
          }
        }
      },
      Parking: {
        screen: Parking,
        navigationOptions: {
          title: "Parking",
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
          }
        }
      },
      Requirements: {
        screen: Requirements,
        navigationOptions: {
          title: "Parking",
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
          }
        }
      },
      SmokingPolicy: {
        screen: SmokingPolicy,
        navigationOptions: {
          title: "Parking",
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
          }
        }
      },
      AudioVideo: {
        screen: AudioVideo,
        navigationOptions: {
          title: "Parking",
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
          }
        }
      },
      Refunds: {
        screen: Refunds,
        navigationOptions: {
          title: "Parking",
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
          }
        }
      },
      CoatCheck: {
        screen: CoatCheck,
        navigationOptions: {
          title: "Parking",
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
          }
        }
      },
      Hotels: {
        screen: Hotels,
        navigationOptions: {
          title: "Area Hotels",
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
          }
        }
      },
    });

    const CalendarStack = createStackNavigator({
      Calendar: {
        screen: Calendar,
        navigationOptions: {
          title: "Upcoming Shows",
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
      },
      Tickets: {
        screen: Tickets,
        navigationOptions: {
          title: "Tickets",
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
          }
        }
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
        Music: { screen: CalendarStack },
        Venue: { screen: VenueStack },
        Private: { screen: LillyStack},
        Gallery: { screen: GalleryStack},
        Settings: { screen: SettingsStack }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Venue') {
            iconName = 'building';
            icon = <Icon name={iconName} size={30} style={styles.glow}/>
            // We want to add badges to home tab icon
            // IconComponent = HomeIconWithBadge;
          } else if (routeName === 'Music') {
            iconName = 'music'
            icon = <Icon name={iconName} size={30} style={styles.glow}/>
          } else if (routeName ==='Private'){
            iconName = 'glass-cheers';
            icon = <Icon name={iconName} size={30} style={styles.glow}/>
          } else if(routeName ==='Gallery'){
            iconName= 'camera-retro';
            icon = <Icon name={iconName} size={30} style={styles.glow}/>
          } else if (routeName === 'Settings'){
            iconName = 'user';
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
