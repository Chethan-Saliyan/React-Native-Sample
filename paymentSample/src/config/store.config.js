import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { LoginStatus } from "@app/index.js";

import { loginReducer } from "@redux/reducers/login.reducers";
import { dashboardReducer } from "@redux/reducers/dashboard.reducers";

const middleware = [thunk];
if (__DEV__) {
  middleware.push(createLogger());
}

const defaultState = {
  loginReducer: {
    loginInfo: null,
    loginStatus: LoginStatus.INITIAL
  },
  dashboardReducer: { dashboardData: null }
};

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  dashboardReducer: dashboardReducer
});

const store = createStore(
  rootReducer,
  defaultState,
  applyMiddleware(...middleware)
);

export default function getStore() {
  return store;
}
