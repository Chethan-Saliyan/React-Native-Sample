import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { InputTextField, ActionButton } from "@components";
import { TextFieldType } from "@app/index.js";
import * as loginActions from "@redux/actions/login.actions";

class SignInC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      signinInfoDict: {
        userName: null,
        password: null
      },
      signinInfoDictValid: {
        userName: false,
        password: false
      }
    };
  }

  onPress = () => {
    this.props.getLoginData(this.state.signinInfoDict);
  };

  renderUserNameTestField(userName) {
    return (
      <InputTextField
        headerLabel={"User Name"}
        style={{ margin: 10 }}
        value={userName}
        textFieldType={TextFieldType.USERNAME}
        onChangeText={result => {
          let signinInfoDict = this.state.signinInfoDict;
          let signinInfoDictValid = this.state.signinInfoDictValid;
          signinInfoDict.userName = result.text;
          signinInfoDictValid.userName = result.isValid;
          this.setState({
            signinInfoDict,
            signinInfoDictValid
          });
        }}
        onTextBlur={isValid => {
          let signinInfoDictValid = this.state.signinInfoDictValid;
          signinInfoDictValid.userName = isValid;
          this.setState({
            signinInfoDictValid
          });
        }}
      />
    );
  }

  renderPasswordTextField(password) {
    return (
      <InputTextField
        headerLabel={"Password"}
        style={{ margin: 10 }}
        value={password}
        secureTextEntry={true}
        onChangeText={result => {
          let signinInfoDict = this.state.signinInfoDict;
          let signinInfoDictValid = this.state.signinInfoDictValid;
          signinInfoDict.password = result.text;
          signinInfoDictValid.password = result.isValid;
          this.setState({
            signinInfoDict,
            signinInfoDictValid
          });
        }}
        onTextBlur={isValid => {
          let signinInfoDictValid = this.state.signinInfoDictValid;
          signinInfoDictValid.password = isValid;
          this.setState({
            signinInfoDictValid
          });
        }}
      />
    );
  }

  render() {
    let signinInfoDict = this.state.signinInfoDict;
    let isLoginButtonDisabled = this.isLoginButtonDisabled();
    return (
      <View style={styles.container}>
        {this.renderUserNameTestField(signinInfoDict.userName)}
        {this.renderPasswordTextField()}
        <ActionButton
          title={"Login"}
          disabled={isLoginButtonDisabled}
          style={{ margin: 10 }}
          onPress={this.onPress}
        />
      </View>
    );
  }

  isLoginButtonDisabled = () => {
    let isButtonDisabled = false;
    let signinInfoDictValid = this.state.signinInfoDictValid;
    for (var key in signinInfoDictValid) {
      if (!signinInfoDictValid[key]) {
        isButtonDisabled = true;
        break;
      }
    }
    return isButtonDisabled;
  };
}

const mapDispatchToProps = dispatch => {
  const allactions = Object.assign({}, loginActions);
  const boundActionCreators = bindActionCreators(allactions, dispatch);
  return boundActionCreators;
};

let SignIn = connect(
  null,
  mapDispatchToProps
)(SignInC);

export { SignIn };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
