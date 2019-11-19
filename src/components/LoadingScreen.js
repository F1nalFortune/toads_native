import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native';


export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
        source={require('../../assets/images/loading.gif')}/>
        <Text style={{textAlign: 'center'}}>
          Loading ...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})
