import { Platform } from "react-native";
import deviceInfo from "react-native-device-info";
import getStore from "@config/store.config";

// An extension on Object, so that you can access the localized
// version from an object containing localized strings.
// For example, if there is an object:
// const response = {
//   name: {
//          'en': "English string",
//          'ar': "Arabic string"
//      }
// }
// You can get the localized value of name (as per device locale
// by simply,  response.name.localized()
// If you dont supply any locale, it will compute dynamically and this is
// what we would be relying on most cases.

// NOTE: If you are assigning response.name.localized() to a text field
// make sure you check !!response.name before rendering the Text field as
// empty string will cause YogaNode exception in Android(Trying to add a 'RCTRawText [text: ]' to a 'RCTView')
Object.defineProperty(Object.prototype, "localized", {
    value: function() {
        if (!this || this.length == 0) return "";
        const store = getStore();
        let globalReducer = store.getState().globalReducer;
        let string = undefined;
        if (globalReducer && globalReducer.currentLanguage) {
            const localeString = globalReducer.currentLanguage.split("-");
            string = this[localeString[0]];
        }
        //locale = //deviceInfo.getDeviceLocale();
        if (string === undefined) {
            //fallback to english in case a string is unavailable for a given locale.
            string = this["en"];
        }
        if (!string) {
            //fallback if "this" is a string and not an object
            const value = this.toString();
            string = typeof value === "string" && value.length > 0 ? value : "";
        }
        return string;
    },
    enumerable: false
});

Object.defineProperty(Object.prototype, "getLocalizedString", {
    value: function(value) {
        if (!value || value.length == 0) return "";
        const store = getStore();
        let globalReducer = store.getState().globalReducer;
        let string = undefined;
        if (globalReducer && globalReducer.currentLanguage) {
            const localeString = globalReducer.currentLanguage.split("-");
            string = value[localeString[0]];
        }
        //locale = //deviceInfo.getDeviceLocale();
        if (string === undefined) {
            //fallback to english in case a string is unavailable for a given locale.
            string = value["en"];
        }
        if (!string) {
            //fallback if "value" is a string and not an object
            value = value.toString();
            string = typeof value === "string" && value.length > 0 ? value : "";
        }
        return string;
    },
    enumerable: false
});

Object.defineProperty(Object.prototype, "formatAmount", {
    value: function(price, fraction = 2) {
        price = price ? parseFloat(price) : 0;
        if (Platform.OS === "ios") {
            return price.toLocaleString("en-US", {
                minimumFractionDigits: fraction,
                maximumFractionDigits: fraction
            });
        } else {
            price = price.toFixed(fraction);
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    enumerable: false
});

Object.defineProperty(Object.prototype, "formatString", {
    value: function() {
        const args = arguments;

        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != "undefined" ? args[number] : match;
        });
    },
    enumerable: false
});

Object.defineProperty(String.prototype, "capitalizeFirstLetter", {
    value: function() {
        if (!this || this.length == 0) return this;
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    writable: true,
    configurable: true
});

Object.defineProperty(Object.prototype, "isEquivalent", {
    value: function(a, b) {
        var aProps = a ? Object.getOwnPropertyNames(a) : [];
        var bProps = b ? Object.getOwnPropertyNames(b) : [];

        // If number of properties is different, objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    },
    enumerable: false
});
