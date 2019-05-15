import { Strings } from "@assets";
import { USERNAME_REGEX } from "@app/app.constants";
import { TextFieldType } from "@app/index.js";

export class ValidationService {
  static validateField = (text, textFieldType) => {
    let isValid = false;
    let errorMessage = null;
    if (!text || text.length === 0) {
      errorMessage = Strings.errorMessage._field_required;
    } else if (textFieldType === TextFieldType.USERNAME) {
      isValid = USERNAME_REGEX.test(text);
      if (!isValid) {
        errorMessage = Strings.errorMessage._invalid_username;
      }
    } else {
      isValid = true;
    }
    return {
      isValid,
      errorMessage
    };
  };
}
