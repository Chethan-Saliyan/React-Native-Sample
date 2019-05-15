import { createStackNavigator } from "react-navigation";
import { SignIn, Dashboard } from "../containers";

export const AppNavigator = createStackNavigator(
  {
    signIn: {
      screen: SignIn,
      path: null,
      navigationOptions: { title: "Login" }
    },
    dashboard: {
      screen: Dashboard,
      path: null,
      navigationOptions: { title: "Dashboard" }
    }
  },
  {
    initialRouteName: "signIn"
  }
);
