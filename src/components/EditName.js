import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity
  } from 'react-native';


export default class EditName extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.props.value}
          style={styles.inputBox}
          placeholder="Name"
          placeholderTextColor="white"
          selectionColor="#345f3f"
          onSubmitEditing={() => this.password.focus()}
          onChangeText={text => this.props.changeText(text, 'name')}
          />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10
  }
})
