import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet
} from 'react-native';

const propTypes = {
  mapElement: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string
};

const defaultProps = {
  mapElement: (n) => {},
  onSubmitEditing: () => {},
  onChangeText: () => {},
  value: "",
  placeholder: "",
  maxLength: 200,
  keybordType: "default",
  secureTextEntry: false,
  label: ""
};

const styles = StyleSheet.create({
  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10
  }
});


class InputText extends Component {
  state ={
    value: ''
  }

  componentDidMount(){
    this.setState({
      value: this.props.value
    })
  }

  onChangeText = (value) => {
    this.setState({
      value
    }, () => {
      this.props.onChangeText(value);
    })
  }
  render() {
    const {placeholder, secureTextEntry, keyboardType, maxLength, value, onChangeText, onSubmitEditing} = this.props;
    return (
      <View>
        <TextInput
          style={styles.inputBox}
          placeholder={placeholder}
          placeholderTextColor='rgba(255,255,255,0.8)'
          selectionColor='#345f3f'
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType='next'
          value={this.state.value}
          onSubmitEditing={onSubmitEditing}
          onChangeText={this.onChangeText} />
      </View>
    )
  }
}

InputText.defaultProps = defaultProps;
InputText.propTypes = propTypes;

export default InputText;
