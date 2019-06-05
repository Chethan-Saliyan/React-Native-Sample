import moment from "moment";
import Storage, { SWIPE_PREVIEW_REQUIRED } from "@config/async-storage";
import { NativeModules, Platform } from "react-native";

export class Utils {
    static getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return "";
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    static getAllUrlParams(url) {
        if (!url) return null;

        let queryString = url.split("?")[1];
        // we'll store the parameters here
        let obj = {};

        // if query string exists
        if (queryString) {
            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split("#")[0];

            // split our query string into its component parts
            let arr = queryString.split("&");

            for (let i = 0; i < arr.length; i++) {
                // separate the keys and the values
                let a = arr[i].split("=");

                // in case params look like: list[]=thing1&list[]=thing2
                let paramNum = undefined;
                let paramName = a[0].replace(/\[\d*\]/, function(v) {
                    paramNum = v.slice(1, -1);
                    return null;
                });

                // set parameter value (use 'true' if empty)
                let paramValue = typeof a[1] === "undefined" ? true : a[1];

                // (optional) keep case consistent
                // paramName = paramName.toLowerCase();
                // paramValue = paramValue.toLowerCase();

                // if parameter name already exists
                if (obj[paramName]) {
                    // convert value to array (if still string)
                    if (typeof obj[paramName] === "string") {
                        obj[paramName] = [obj[paramName]];
                    }
                    // if no array index number specified...
                    if (typeof paramNum === "undefined") {
                        // put the value on the end of the array
                        obj[paramName].push(paramValue);
                    }
                    // if array index number specified...
                    else {
                        // put the value at that index number
                        obj[paramName][paramNum] = paramValue;
                    }
                }
                // if param name doesn't exist yet, set it
                else {
                    obj[paramName] = paramValue;
                }
            }
        }

        return obj;
    }

    static clone = arg => JSON.parse(JSON.stringify(arg));

    static limitLength = (string = "", maxLength) =>
        string ? string.substr(0, maxLength) : string;

    static addGaps = (string = "", gaps) => {
        if (!string) return string;
        const offsets = [0].concat(gaps).concat([string.length]);

        return offsets
            .map((end, index) => {
                if (index === 0) return "";
                const start = offsets[index - 1];
                return string.substr(start, end - start);
            })
            .filter(part => part !== "")
            .join(" ");
    };

    static removeNonNumber = (string = "") =>
        string ? string.replace(/[^\d]/g, "") : string;

    static removeLeadingSpaces = (string = "") =>
        string ? string.replace(/^\s+/g, "") : string;

    static removePrecedingZero = (string = "") =>
        string ? string.replace(/^0+/, "") : string;

    static checkPreview(previewName) {
        // function to check if the (slide to delete) preview in to be shown or not
        let val;
        return Storage.getSwipePreviewData().then(
            data => {
                var formattedCurrentDate = moment(new Date()).format(
                    "YYYY-MM-DD"
                );

                if (!!data && JSON.parse(data)[previewName]) {
                    parsedData = JSON.parse(data);

                    var dateB = moment(parsedData[previewName]);
                    var dateC = moment(formattedCurrentDate);

                    if (dateC.diff(dateB, "months") > 0) {
                        Storage.set(
                            SWIPE_PREVIEW_REQUIRED,
                            JSON.stringify({
                                ...parsedData,
                                [previewName]: formattedCurrentDate
                            })
                        );
                        val = true;
                    } else {
                        val = false;
                    }
                } else {
                    parsedData = JSON.parse(data);
                    Storage.set(
                        SWIPE_PREVIEW_REQUIRED,
                        JSON.stringify({
                            ...parsedData,
                            [previewName]: formattedCurrentDate
                        })
                    );
                    val = true;
                }
                return Promise.resolve(val);
            },
            err => {
                val = false;
                Promise.reject(val);
            }
        );
    }

    static exitApp(killImmediate = false) {
        if (Platform.OS === "android") {
            if (killImmediate) {
                NativeModules.AppExitAndroid.kill();
            } else {
                NativeModules.AppExitAndroid.perform();
            }
        } else {
            NativeModules.AppExitIOS.kill();
        }
    }
}
