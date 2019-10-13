import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  NativeModules,
  Button
} from 'react-native';
//import all the components we are going to use.


export default class Directions extends Component {

  render(){


    return(
      <SafeAreaView>
        <Button
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
          }}
          title="Press Me"
        />
      </SafeAreaView>
    )
  }
}
