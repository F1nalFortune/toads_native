import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';

export default class Browser extends Component {
  render() {
    firebase.analytics().setCurrentScreen('browser');
    const url = this.props.navigation.state.params.url;
    return (
      <WebView
          source={{uri: url}}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color='black'
              size='large'
              style={{flex: 1}}
            />
          )}
      />
    );
  }
}
