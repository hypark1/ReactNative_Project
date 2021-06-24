import React from 'react';
import axios from 'axios';
import RNSecureKeyStore from "react-native-secure-key-store";
import Config from 'react-native-config';

/*api통신*/
const HttpPA = () => {
    const defaultOptions = {
        baseURL: Config.API_URL_PA,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
        },
        responseType: 'json',
        responseEncoding: 'utf8'
    };

    let api = axios.create(defaultOptions);

    api.interceptors.request.use(
        async (config) => {
            await RNSecureKeyStore.get('ddangkongLogin')
                .then((res) => {
                    if (res !== null) {
                        const token = JSON.parse(res).token
                        config.headers['X-Authorization'] = token;
                    }
                }, (err) => {
                    console.log(err);
                });
            return config;
        }
    );

    return api;
}

export default HttpPA();

