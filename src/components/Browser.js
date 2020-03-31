import React, { Component } from 'react'
import {
  View
} from 'react-native'
import { WebView } from 'react-native-webview';

export default class Browser extends Component {
  render(){
    return(
      <View style={{flex: 1}}>
        <WebView
          source={{
            uri: this.props.navigation.state.params.url
          }}
          style={{
            flex: 1
          }}>
        </WebView>
      </View>
    )
  }
}
