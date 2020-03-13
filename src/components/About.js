import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const width = '40%';
const height = '20%';

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      },
      {
        "visibility": "on"
      },
      {
        "weight": 8
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }]


const ColoredLine = ({ color }) => (
  <View
    style={{
      borderBottomColor: color,
      borderBottomWidth: 1
    }}
  />
);
const AboutTab = () => {
  return <View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.wrapper}>
                Toad's Place has been hoppin' since 1975, establishing itself as one
                of the premier music halls in the country. Virtually every major
                touring act has appeared on Toad's stage in the past twenty years.
                {"\n"}{"\n"}
                Toad's place remains a favorite venue for many of the megastars when
                they wish to perform in a smaller, more intimate atmosphere where they
                can be closer to their fans. For this very reason, The Rolling Stones
                chose to kick off their 1989 "Steel Wheels" tour at Toad's Place!
                {"\n"}{"\n"}
                How has Toad's managed to stay on top for all of these years? It's
                simple... We at Toad's Place realize that everyone doesn't like the
                same kind of music! In any given month, Toad's features a broad
                spectrum of live performers, as well as some of the most talented DJs
                on the East Coast. Rock and Roll, Blues, Reggae, Techno... We have it
                all, from classic favorites to the most exciting new talent!
                {"\n"}{"\n"}
                Check out our calendar !!! There is something for everyone. If you are
                under 21, don't despair...come in and kick it with us on our All Ages nights.
                Toad's Place...where the legends play!
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 50
            }}>
              <Text style={styles.socialIcon}>
                <Icon
                  onPress={() => Linking.openURL("https://www.facebook.com/toadsplaceofficial/")}
                  name={'facebook-square'}
                  size={40}
                  style={styles.facebook}/>
              </Text>
              <Text style={styles.socialIcon}>
                <Icon
                  onPress={() => Linking.openURL("https://www.instagram.com/toadsplace/")}
                  name={'instagram'}
                  size={40}
                  style={styles.instagram}/>
              </Text>
              <Text style={styles.socialIcon}>
                <Icon
                  onPress={() => Linking.openURL("https://twitter.com/toadsplace")}
                  name={'twitter'}
                  size={40}
                  style={styles.twitter}/>
              </Text>
            </View>
            <View>
              <Text style={styles.toads}>Toad's Place</Text>
              <Text  style={styles.contact}>
                300 York St, New Haven, CT 06511{"\n"}
                203-624-8623{"\n"}
                toadsplac@aol.com
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL("https://www.toadsplacemerch.com/")}>
                <Text style={{color:'black'}}>Official Merchandise</Text>
              </TouchableOpacity>
            </View>
         </View>
};

const InfoTab = () => {
  var markers = [
    {
      latitude: 41.304560,
      longitude: -72.934500,
      title: "Toad's Place",
      subtitle: '300 York Street'
    }
  ];

  return (
    <MapView
      style={{height: '100%', width: '100%'}}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: 41.304560,
        longitude: -72.934500,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      customMapStyle={mapStyle}
    >
      <MapView.Marker
        coordinate={{        latitude: 41.304560,
                longitude: -72.934500,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421}}>
                <Image source={require('../../assets/images/custom_marker.png')}/>
      </MapView.Marker>
    </MapView>
  )
}
export default class About extends Component {
  constructor(){
    super();
    this.state = {
      tab: 'info'
    }
  }

  render() {
    return (
    <ScrollView style={styles.background}>
      <View style={styles.imgWrapper}>
          <Image
            source={require("../../assets/images/toads_banner.png")}/>
      </View>
      <View>
        <View style={styles.tabbar}>
          <TouchableOpacity
            onPress={() => this.setState({tab: 'info'})}
            style={this.state.tab=='info' ? styles.tabBtnActive : styles.tabBtnInactive}>
              <Text>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({tab: 'about'})}
            style={this.state.tab=='about' ? styles.tabBtnActive : styles.tabBtnInactive}>
              <Text>About</Text>
          </TouchableOpacity>
        </View>
      </View>
      {this.state.tab=='about' ? <AboutTab /> : <InfoTab />}


    </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  background:{
    backgroundColor: '#c0dfc066'
  },
  box:{
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3D1B0',
  },
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
  contact: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16
  },
  facebook:{
    color: '#4968ad',
    marginHorizontal: 100
  },
  instagram:{
    color: 'black',
    marginHorizontal: 100
  },
  image: {
      width: 50,
      resizeMode: 'contain',
      height: 50
  },
  imgWrapper:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  socialTitle:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  socialIcon:{
    padding: 5
  },
  tabbar:{
    flexDirection: 'row'
  },
  tabBtnActive: {
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    borderBottomColor: 'green',
    borderBottomWidth: 1,
  },
  tabBtnInactive: {
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  toads: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  twitter:{
    color: '#49a1eb',
    marginHorizontal: 100
  },
  wrapper:{
      padding: 15,
      fontSize: 16
  }
})
