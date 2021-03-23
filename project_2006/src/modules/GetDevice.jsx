import React from 'react';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";

/*디바이스 정보 넘기기*/
const GetDevice = async () => {
    let ipAddress
    try {
        ipAddress = await DeviceInfo.getIpAddress()
        // now use the ipAddress
    } catch (error) {
        console.log(error)
    }
    let device_name
    try {
        device_name = await DeviceInfo.getModel()
        // now use the ipAddress
    } catch (error) {
        console.log(error)
    }
    let deviceToken
    await firebase.messaging().getToken()
        .then(token => {
            console.log(token)
            deviceToken = token
        });
    let data = {
        'client_ip': ipAddress,
        'device_name': device_name,
        'device_os': DeviceInfo.getSystemName().toUpperCase(),
        'device_os_version': DeviceInfo.getSystemVersion(),
        'device_uuid': DeviceInfo.getUniqueId(),
        'push_token': deviceToken
    }
    Http({
        method: 'POST',
        url: '/start',
        data: data,
    })
        .then(response => {
            if (response.request.status === 200) {
                RNSecureKeyStore.set('GSP_ID', response.request._response, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
            }
        })
        .catch(error => {
            ErrorSet(error);
        })
}

export default GetDevice;

