import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  NativeModules,
  Button,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

//import all the components we are going to use.
//TODO
// set state with authorization of location and then fetch current location
export default class Directions extends Component {

  componentDidMount = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
       (position) => {
          const currentLongitude = position.coords.longitude;
          console.log("Longitude: " + JSON.stringify(position.coords.longitude))
          //getting the Longitude from the location json
          const currentLatitude = position.coords.latitude;
          console.log("Latitude: " + JSON.stringify(position.coords.latitude));
          //getting the Latitude from the location json
          this.setState({ longitude:currentLongitude });
          //Setting state Longitude to re re-render the Longitude Text
          this.setState({ latitude:currentLatitude });
       },
       (error) => alert(error.message),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render(){
    const ColoredLine = ({ color }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1,
          marginLeft: 10,
          marginRight: 10
        }}
      />
    );

    return(
      <ImageBackground
        source={require('../../assets/images/toad_logo.jpg')}
        style={{flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover'
        }}
        imageStyle= {{opacity:0.05}}
        >
        <ScrollView>
           <SafeAreaView>
             <Text style={styles.address}>
               300 York Street{"\n"}{"\n"}
               New Haven, CT 06511
               {"\n"}
             </Text>
             <ColoredLine color="green" />
             <Text style={{padding: 10}}>
              Directions to our front doors is as easy as pressing the button below.
             </Text>
             <View>
               <TouchableOpacity
                 style={styles.button}
                 onPress={() => {
                   var navDemo = NativeModules.NavDemo;
                   navDemo.renderNaviDemo(
                     (originLat = this.state.latitude),
                     (originLon = this.state.longitude),
                     (originName = 'Current Location'),
                     (destinationLat = 41.311587),
                     (destinationLon = -72.929541),
                     (destinationName = "Toad's Place"),
                   );
                 }}>
                 <Text style={{color:'black'}}>Navigation</Text>
               </TouchableOpacity>
             </View>
           </SafeAreaView>
        </ScrollView>
      </ImageBackground>


    )
  }
}

const styles = StyleSheet.create({
  address: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 10
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
  }
})
