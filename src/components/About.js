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
import VenueInfoRouter from './VenueInfoRouter';
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
  return (
    <View>
              <TouchableOpacity
                style={styles.menuTabs}
                onPress={() => Linking.openURL("https://m.uber.com/ul/?action=setPickup&client_id=cshc49dbbtH5MDBojbHt1KGGjc47pCmw&pickup=my_location&dropoff[formatted_address]=300%20York%20Street%2C%20New%20Haven%2C%20CT%2C%20USA&dropoff[latitude]=41.311553&dropoff[longitude]=-72.929597")}>
                <View
                  style={styles.menuTabText}>
                  <Icon
                    name={'car'}
                    size={20}
                    style={{paddingRight: 20}}/>
                  <Text>
                    Ride w/ Uber to the show
                  </Text>
                </View>
                <View style={styles.menuTabIcon}>
                  <Icon
                     style={styles.menuTabIcon}
                    name={'chevron-right'}
                    size={20}/>
                </View>
              </TouchableOpacity>
              <View style={styles.menuTabs}>
                <View style={styles.menuTabText}>
                  <Icon
                    name={'hotel'}
                    size={20}
                    style={{paddingRight: 20}}/>
                  <Text>
                    Stay at a hotel after the show
                  </Text>
                </View>
                <View style={styles.menuTabIcon}>
                  <Icon
                     style={styles.menuTabIcon}
                    name={'chevron-right'}
                    size={20}/>
                </View>
              </View>
              <ColoredLine color="green" />
              <View>
                <Text style={styles.addressTitle}>Venue Location</Text>
                <Text style={styles.address}>300 York Street{"\n"}{"\n"}New Haven, CT 06510</Text>
              </View>
              <MapView
                style={{height: 250, width: '100%'}}
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
              <ColoredLine color="green" />
              <TouchableOpacity>
                <Text style={styles.button}>DIRECTIONS</Text>
              </TouchableOpacity>
              <ColoredLine color="green" />
              <TouchableOpacity
                style={styles.menuTabs}
                onPress={() => this.props.navigation.navigate('Tickets')}>
                <View style={styles.menuTabText}>
                  <Text>
                    Ticket Information
                  </Text>
                </View>
                <View style={styles.menuTabIcon}>
                  <Icon
                     style={styles.menuTabIcon}
                    name={'chevron-right'}
                    size={20}/>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuTabs}
                onPress={() => this.props.navigation.navigate('Tickets')}>
                <View style={styles.menuTabText}>
                  <Text>
                    Accepted Payments
                  </Text>
                </View>
                <View style={styles.menuTabIcon}>
                  <Icon
                     style={styles.menuTabIcon}
                    name={'chevron-right'}
                    size={20}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuTabs}
                onPress={() => this.props.navigation.navigate('Tickets')}>
                <View style={styles.menuTabText}>
                  <Text>
                    Accessability Seating
                  </Text>
                </View>
                <View style={styles.menuTabIcon}>
                  <Icon
                     style={styles.menuTabIcon}
                    name={'chevron-right'}
                    size={20}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuTabs}
                onPress={() => this.props.navigation.navigate('Tickets')}>
                <View style={styles.menuTabText}>
                  <Text>
                    Parking Information
                  </Text>
                </View>
                <View style={styles.menuTabIcon}>
                  <Icon
                     style={styles.menuTabIcon}
                    name={'chevron-right'}
                    size={20}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuTabs}
                onPress={() => this.props.navigation.navigate('Tickets')}>
                <View style={styles.menuTabText}>
                  <Text>
                    Age Requirements / Restrictions
                  </Text>
                </View>
                <View style={styles.menuTabIcon}>
                  <Icon
                     style={styles.menuTabIcon}
                    name={'chevron-right'}
                    size={20}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuTabs}
                onPress={() => this.props.navigation.navigate('Tickets')}>
                <View style={styles.menuTabText}>
                  <Text>
                    Smoking Policy
                  </Text>
                </View>
                <View style={styles.menuTabIcon}>
                  <Icon
                     style={styles.menuTabIcon}
                    name={'chevron-right'}
                    size={20}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuTabs}
                onPress={() => this.props.navigation.navigate('Tickets')}>
                <View style={styles.menuTabText}>
                  <Text>
                    Audio / Video / Photo Policy
                  </Text>
                </View>
                <View style={styles.menuTabIcon}>
                  <Icon
                     style={styles.menuTabIcon}
                    name={'chevron-right'}
                    size={20}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuTabs}
                onPress={() => this.props.navigation.navigate('Tickets')}>
                <View style={styles.menuTabText}>
                  <Text>
                    Refund Policy
                  </Text>
                </View>
                <View style={styles.menuTabIcon}>
                  <Icon
                     style={styles.menuTabIcon}
                    name={'chevron-right'}
                    size={20}/>
                </View>
              </TouchableOpacity>





              <TouchableOpacity
                style={styles.menuTabs}
                onPress={() => this.props.navigation.navigate('Tickets')}>
                <View style={styles.menuTabText}>
                  <Text>
                    Coat Check
                  </Text>
                </View>
                <View style={styles.menuTabIcon}>
                  <Icon
                     style={styles.menuTabIcon}
                    name={'chevron-right'}
                    size={20}/>
                </View>
              </TouchableOpacity>





              <TouchableOpacity
                style={styles.menuTabs}
                onPress={() => this.props.navigation.navigate('Tickets')}>
                <View style={styles.menuTabText}>
                  <Text>
                    Official Merch
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
      <ColoredLine color="green" />
      <Text style={styles.socialHead}>
        Social
      </Text>
      <Text style={styles.socialSub}>
        Click to connect with us!
      </Text>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 25
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
      <ColoredLine color="green" />

      <View>
        <Text style={styles.toads}>Toad's Place</Text>
        <Text  style={styles.contactAddress}>
          300 York St, New Haven, CT 06511
        </Text>
        <Text style={styles.contactPhone}>
          203-624-8623
        </Text>
        <Text style={styles.copyright}>
          Copyright © 2020 Toad's Place,{"\n"}All Rights Reserved
        </Text>
      </View>
    </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  address:{
    paddingTop: 0,
    paddingLeft: 20,
    paddingBottom: 20,
    fontWeight: 'bold'
  },
  addressTitle:{
    padding:20,
    fontWeight: 'bold',
    fontSize: 18
  },
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
    padding: 15,
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'green',
    fontWeight: 'bold',
    margin: 15
  },
  contactAddress: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    padding:5
  },
  contactPhone: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    padding:5
  },
  copyright: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    padding:5
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
  socialHead:{
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  socialSub:{
    paddingLeft:20,
    paddingBottom:10,
    paddingTop:0,
    fontSize: 16
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
    fontWeight: 'bold',
    paddingTop:20
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
