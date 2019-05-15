import * as actions from "./index";
import { AuthorizationService } from "@services";

export function getLoginData(signinDict) {
  return function(dispatch, getState) {
    AuthorizationService.login(signinDict).then(result => {
      if (result && result.isSuccess) {
        dispatch(loginSuccess(result.data));
      } else {
        dispatch(loginFailed());
      }
    });
  };
}

function loginSuccess(loginData) {
  return {
    type: actions.loginSuccess,
    loginInfo: loginData
  };
}

function loginFailed() {
  return {
    type: actions.loginFailure
  };
}
