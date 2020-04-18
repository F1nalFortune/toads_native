import React, { Component } from 'react';
import {
  Text
} from 'react-native';
import firebase from 'react-native-firebase';
import { db } from '../../Firebase';

import Icon from 'react-native-vector-icons/FontAwesome5';
import LoadingScreen from './LoadingScreen';


export default class Profile extends Component {
  state={
    loading:true
  }
  componentDidMount() {}

  render() {
    firebase.analytics().setCurrentScreen('publicProfile');
    
    const { user } = this.props.navigation.state.params.user
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
    if(this.state.loading){
      <LoadingScreen />
    }else{
      return (
          <View>

          </View>
      );
    }
  }
}


const styles = StyleSheet.create({

})
