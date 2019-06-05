import axios from "axios";
import getStore from "@config/store.config";

import { UserToken } from "@services";
const config = require("../config/apiconfig.json");
import Config from "react-native-config";
import * as tokenActions from "@redux/actions/userToken.actions";

const _baseUrl = "http://10.10.21.125/ciso/wp-json/jwt-auth/v1/";

export const GET = "GET";
export const POST = "POST";
export const DELETE = "DELETE";
export const PATCH = "PATCH";
export const PUT = "PUT";

const appClient = axios.create({
    baseURL: Config.BASE_URL
});

appClient.interceptors.request.use(function(config) {
    const store = getStore();
    if (
        store.getState().userToken &&
        store.getState().userToken.userTokenData
    ) {
        config.headers.common.authorization =
            "Bearer " + store.getState().userToken.userTokenData.token;
    }
    return config;
});

// Add a response interceptor
appClient.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

/**
 * Request Wrapper with base url set o _baseUrl.
 */
const appRequest = function(options) {
    const onSuccess = function(response) {
        return response.data;
    };

    const onError = async function(error) {
        let errorResult;
        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.log("Status: ", error.response.status);
            if (error.response.status === 401) {
                const store = getStore();
                try {
                    store.dispatch(tokenActions.configInProgress());
                    let result = await UserToken.requestToken();
                    store.dispatch(tokenActions.configSuccess(result));
                    error.response.status = 999;
                    errorResult = error.response;
                } catch (error) {
                    store.dispatch(tokenActions.configFailed());
                    errorResult = error.response;
                }
            } else {
                errorResult = error.response;
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            errorResult = error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            errorResult = error.message;
        }
        return Promise.reject(errorResult);
    };

    return appClient(options)
        .then(onSuccess)
        .catch(onError);
};

export { appRequest };
