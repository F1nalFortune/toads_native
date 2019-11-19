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
  TouchableOpacity
} from 'react-native';
//import all the components we are going to use.


export default class Directions extends Component {

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
           <SafeAreaView>
             <Text style={styles.address}>
               300 York Street{"\n"}{"\n"}
               New Haven, CT 06511
               {"\n"}
             </Text>
             <ColoredLine color="green" />
             <Text>
              Directions to our front doors is as easy as pressing the button below.
             </Text>
             <View>
               <TouchableOpacity
                 style={styles.button}
                 onPress={() => {
                   var navDemo = NativeModules.NavDemo;
                   navDemo.renderNaviDemo(
                     (originLat = 41.3282668),
                     (originLon = -72.9248731),
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
