import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Dance extends Component {
  render() {
    return (
      <View style={{ flex: 1}}>
        <Text>Please select your musical preferences to receive notifications
        when your favorite genre is on our stage!</Text>
      </View>
    );
  }
}
