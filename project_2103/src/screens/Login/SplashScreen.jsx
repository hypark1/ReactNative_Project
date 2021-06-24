import React, {useEffect, useCallback, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Dimensions, Platform, Alert} from 'react-native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Orientation from 'react-native-orientation-locker';
import messaging from "@react-native-firebase/messaging";
import {PERMISSIONS, requestMultiple} from "react-native-permissions";
import VersionCheck from "react-native-version-check";
import Video from 'react-native-video';
import I18n from "~/locales/I18n";
import HttpPA from "~/modules/HttpPA";
import ErrorSetPA from "~/modules/ErrorSetPA";
import GetDevice from "~/modules/GetDevice";
import UpdatePopup from "~/screens/Login/Update/UpdatePopup";
import Colors from '~/styles/Colors';
import Style from '~/styles/Style';

const { t } = I18n;

const width = 1920;
const height = 1080;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
let  imgWidth = screenWidth;
if (screenWidth < screenHeight) {
    imgWidth = screenWidth * 1;
}
const scaleFactor = width / imgWidth;
const imgHeight = height / scaleFactor;

const SplashScreen = (props) => {
    const [updateVisible, setUpdateVisible] = useState(false);

    useEffect(() => {
        Orientation.lockToPortrait();
        GetMinimumVersion();
        GetDevice();
    }, []);

    /*최소 버전 체크*/
    const GetMinimumVersion = useCallback(() => {
        let data = {
            appId: t('appID'),
            deviceOs: Platform.OS === 'android'? 'ANDROID':'IOS',
        }
        console.log('GetMinimumVersion', data)
        HttpPA({
            method: 'GET',
            url: '/minimum_version',
            params: data
        })
            .then(response => {
                if (response.request.status === 200) {
                    let resData = JSON.parse(response.request._response);
                    let serverVersion = resData.minimum_version + '';
                    let currentVersion = VersionCheck.getCurrentVersion().trim() + '';
                    let server = serverVersion.split('.');
                    let current = currentVersion.split('.');
                    if (Number(server[0]) > Number(current[0])
                        || Number(server[1]) > Number(current[1])
                        || Number(server[2]) > Number(current[2])) {
                        setUpdateVisible(true);
                    } else {
                        setTimeout(() => {
                            CheckNotificationPermission();
                            RNSecureKeyStore.get('ddangkongLogin')
                                .then((res) => {
                                    console.log('ddangkongLogin')
                                    console.log(res)
                                    if (JSON.parse(res).token) {
                                        props.navigation.replace('PlayList');
                                    } else {
                                        props.navigation.replace('Login');
                                    }
                                }, (err) => {
                                    console.log(err);
                                    props.navigation.replace('Login');
                                });
                        }, 5000)
                }
                }
            })
            .catch(error => {
                ErrorSetPA(error);
            })
    }, []);

    const CheckNotificationPermission = useCallback(async () => {
        let checkPermission = await messaging().hasPermission()
        console.log('checkPermission', checkPermission);
        RequestNotificationPermission();
    }, []);

    const RequestNotificationPermission = useCallback(async () => {
        let authStatus = await messaging().requestPermission();
        console.log('authStatus', authStatus);
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        console.log('Authorization status:', authStatus);
        if (enabled) {
            setupFCM();
        }
        CheckPlayerPermission();
    }, []);

    const setupFCM = async () => {
        const deviceToken = await messaging().getToken();
        console.log('deviceToken', deviceToken)
    };

    const CheckPlayerPermission = () => {
        RNSecureKeyStore.get('ddangkongPermission')
            .then((res) => {
                console.log('ddangkongPermission')
                console.log(res)
                if (res === 'true') {
                    //둘다 동의했을때
                    SetPlayerPermission();
                } else {
                    //둘다 동의 X
                    props.navigation.navigate('Permission', {nextScreen: 'Login'});
                }
            }, (err) => {
                //처음 앱실행시
                SetPlayerPermission();
            });
    }

    const SetPlayerPermission = () => {
        let record;
        if (Platform.OS === 'android') {
            record = PERMISSIONS.ANDROID.RECORD_AUDIO;
        } else {
            record = PERMISSIONS.IOS.MICROPHONE;
        }

        let camera;
        if (Platform.OS === 'android') {
            camera = PERMISSIONS.ANDROID.CAMERA;
        } else {
            camera = PERMISSIONS.IOS.CAMERA;
        }
        requestMultiple([
            record,
            camera,
        ]).then((statuses) => {
            if (
                statuses[record] === 'granted' &&
                statuses[camera] === 'granted'
            ) {
                RNSecureKeyStore.set("ddangkongPermission", 'true', {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                    .then((res) => {
                    }, (err) => {
                        console.log(err);
                    });
            } else {
                RNSecureKeyStore.set("ddangkongPermission", 'false', {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                    .then((res) => {
                        props.navigation.replace('Permission', {nextScreen: 'Login'});
                    }, (err) => {
                        console.log(err);
                    });
            }
        })
    }

    return (
        <>
            {
                updateVisible?
                    <UpdatePopup />
                    :
                    null
            }
            <SafeAreaView style={[Style.SafeAreaView, styles.container]}>
                <Video source={require('~/assets/images/splash_bi.mp4')}
                       style={{width: '100%', height: imgHeight}}
                       paused = {false}
                       resizeMode='contain'
                       volume={0} />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SplashScreen;
