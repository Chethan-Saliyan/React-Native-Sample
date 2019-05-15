import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  componentWillUnmount() {}

  handleButtonPress = () => {
    this.props.onPress();
  };

  render() {
    return (
      <TouchableOpacity
        {...this.props}
        disabled={this.state.disabled || this.props.disabled}
        onPress={this.handleButtonPress}
        style={[
          styles.button,
          {
            backgroundColor: this.props.disabled ? "rgb(211,211,211)" : "blue"
          },
          this.props.dimension,
          this.props.style
        ]}
      >
        <Text style={[styles.text, this.props.customTextStyle]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    borderRadius: 4
  },
  text: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    paddingVertical: 16
  }
});
