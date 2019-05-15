import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Animated } from "react-native";
import PropTypes from "prop-types";

import { ValidationService } from "@services";
import { TextFieldType } from "@app/index.js";

export class InputTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      isDirty: false,
      errorMessage: null,
      isFocused: false
    };
  }

  componentDidMount() {
    if (this.props.value) {
      this.text = this.props.value;
      this.setState({ value: this.props.value });
    }
  }

  getErrorMessage() {
    if (!this.state.isValid && this.state.errorMessage) {
      return <Text style={styles.errorText}>{this.state.errorMessage}</Text>;
    }
  }

  inputBlur = e => {
    this.setState({ isFocused: false });
    let isValid = this.validateField(this.text);
    if (this.props.onTextBlur) {
      this.props.onTextBlur(isValid);
    }
  };

  inputFocus = () => this.setState({ isFocused: true });

  handleTextChange = text => {
    this.text = text;
    if (this.state.isDirty) {
      isValid = this.validateField(this.text);
    }
    this.setState({ value: text }, () => {
      this.props.onChangeText({
        text: this.text,
        isValid: this.state.isDirty
          ? isValid
          : ValidationService.validateField(this.text, this.props.textFieldType)
              .isValid
      });
    });
  };

  validateField = value => {
    let result = ValidationService.validateField(
      value,
      this.props.textFieldType
    );
    this.setState({
      isValid: result.isValid,
      errorMessage: result.errorMessage,
      isDirty: true
    });

    return result.isValid;
  };

  render() {
    const { isFocused } = this.state;
    return (
      <View style={[styles.container, this.props.style]}>
        <Text
          style={[
            {
              color: isFocused ? "blue" : "rgb(128,128,128)"
            }
          ]}
        >
          {this.props.headerLabel}
        </Text>
        <TextInput
          ref={input => this.props.fieldRef(input)}
          style={[
            styles.input,
            this.state.isValid ? null : styles.inputError,
            isFocused ? styles.focused : null
          ]}
          onFocus={this.inputFocus}
          onBlur={this.inputBlur}
          autoCapitalize={this.props.autoCapitalize}
          autoCorrect={this.props.autoCorrect}
          keyboardType={this.props.keyboardType}
          maxLength={this.props.maxLength}
          onChangeText={this.handleTextChange}
          returnKeyType={this.props.returnKeyType}
          underlineColorAndroid={"transparent"}
          value={this.state.value}
          secureTextEntry={this.props.secureTextEntry}
          editable={this.props.isEditable}
        />
        {this.getErrorMessage()}
      </View>
    );
  }
}

InputTextField.defaultProps = {
  autoCapitalize: "sentences",
  autoCorrect: true,
  fieldRef: input => {},
  headerLabel: null,
  maxLength: 100,
  returnKeyType: "next",
  keyboardType: "default",
  onChangeText: text => {},
  secureTextEntry: false,
  isEditable: true,
  textFieldType: TextFieldType.DEFAULT
};

InputTextField.propTypes = {
  fieldRef: PropTypes.func,
  textFieldType: PropTypes.string,
  headerLabel: PropTypes.string,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  onChangeText: PropTypes.func,
  onTextBlur: PropTypes.func,
  returnKeyType: PropTypes.string,
  value: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  isEditable: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5
  },
  input: {
    height: 50,
    fontSize: 15,
    color: "black",
    borderBottomWidth: 1.5,
    borderBottomColor: "rgb(128,128,140)",
    textAlign: "left"
  },
  focused: {
    borderBottomColor: "blue"
  },
  inputError: {
    borderBottomColor: "red"
  },
  errorText: {
    fontSize: 12,
    color: "red",
    paddingTop: 3,
    textAlign: "left"
  }
});
