const loginJson = require("./../assets/JSON/loginJSON.json");
import { Alert } from "react-native";

export class AuthorizationService {
  static login(signinDict) {
    return new Promise(function(resolve) {
      if (
        loginJson &&
        signinDict &&
        loginJson.username.toLowerCase() ===
          signinDict.userName.toLowerCase() &&
        loginJson.password === signinDict.password
      ) {
        resolve({
          isSuccess: true,
          data: signinDict.userName
        });
      } else {
        Alert.alert("Please enter valid userName and password");
        resolve({
          isSuccess: false
        });
      }
    });
  }
}
