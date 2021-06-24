import React from 'react';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import DeviceInfo from 'react-native-device-info';
import messaging from "@react-native-firebase/messaging";
import I18n from "~/locales/I18n";
import HttpPA from '~/modules/HttpPA';
import ErrorSetPA from "~/modules/ErrorSetPA";

const { t } = I18n;

/*디바이스 정보 넘기기*/
const GetDevice = async () => {
    //푸시 토큰
    const deviceToken = await messaging().getToken();
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
    let data = {
        'app_id': t('appID'),
        'client_ip': ipAddress === 'unknown'? null : ipAddress,
        'device_name': device_name,
        'device_os': DeviceInfo.getSystemName().toUpperCase(),
        'device_os_version': DeviceInfo.getSystemVersion(),
        'device_uuid': DeviceInfo.getUniqueId(),
        'push_token': deviceToken || ''
    }
    console.log('data', data)
    HttpPA({
        method: 'POST',
        url: '/common-start',
        data: data,
    })
        .then(response => {
            if (response.request.status === 200) {
                console.log('ddangkongDeviceId', response.request._response)
                RNSecureKeyStore.set('ddangkongDeviceId', response.request._response, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                console.log('-> save app info success')
            }
        })
        .catch(error => {
            ErrorSetPA(error);
            console.log('-> save app info failed')
        })
}

export default GetDevice;

