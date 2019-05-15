import React, { Component } from "react";
import { Provider } from "react-redux";
import { connect } from "react-redux";

import { AppNavigator } from "@navigators";
import getStore from "@config/store.config";
import { NavigationService } from "@services";
import { LoginStatus } from "@app/index.js";

const store = getStore();

class MainC extends Component {
  componentWillReceiveProps(props) {
    if (this.props.loginStatus !== props.loginStatus) {
      if (props.loginStatus === LoginStatus.LOGIN_SUCCESS) {
        NavigationService.reset("dashboard");
      }
    }
  }
  render() {
    return (
      <AppNavigator
        ref={navigatorRef => {
          if (navigatorRef) {
            this.navigator = navigatorRef;
            NavigationService.setContainer(navigatorRef);
          }
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  loginStatus: state.loginReducer.loginStatus
});

const Main = connect(mapStateToProps)(MainC);

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
