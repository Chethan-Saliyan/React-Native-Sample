import * as actions from "../actions";
import { LoginStatus } from "@app/index.js";

export function loginReducer(state = {}, action) {
  switch (action.type) {
    case actions.loginSuccess: {
      return {
        ...state,
        loginInfo: action.loginInfo,
        loginStatus: LoginStatus.LOGIN_SUCCESS
      };
    }
    case actions.loginFailure: {
      return {
        ...state,
        loginStatus: LoginStatus.LOGIN_FAILED
      };
    }
    default:
      return state;
  }
}
