import React, {useRef, useState, useCallback, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Alert, BackHandler, Platform, ToastAndroid} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import {PERMISSIONS, requestMultiple, check, RESULTS} from 'react-native-permissions';
import I18n from "~/locales/I18n";
import MyLogo from '~/component/MyLogo';
import MyTitle from '~/component/MyTitle';
import MyButton from "~/component/MyButton";
import MyAlert from "~/component/MyAlert";
import Colors from '~/styles/Colors';
import Style from '~/styles/Style';

const { t } = I18n;

let PermissionRecord;
if (Platform.OS === 'android') {
    PermissionRecord = PERMISSIONS.ANDROID.RECORD_AUDIO;
} else {
    PermissionRecord = PERMISSIONS.IOS.MICROPHONE;
}

let PermissionCamera;
if (Platform.OS === 'android') {
    PermissionCamera = PERMISSIONS.ANDROID.CAMERA;
} else {
    PermissionCamera = PERMISSIONS.IOS.CAMERA;
}

const PermissionScreen = (props) => {
    const [exitApp, setExitApp] = useState(undefined);
    const timeout = useRef();

    const backPressed = useCallback(() => {
        // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
        if (props.navigation.isFocused()) {
            if (exitApp == undefined || !exitApp) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(t('alert.exit'), ToastAndroid.SHORT);
                }
                setExitApp(true);
                timeout.current = setTimeout(() => {
                    setExitApp(false);
                },2000);
            } else {
                clearTimeout(timeout.current);
                BackHandler.exitApp();  // 앱 종료
            }
            return true;
        }
    }, [exitApp]);

    useEffect(() => {
        Orientation.unlockAllOrientations();
        BackHandler.addEventListener('hardwareBackPress', backPressed);
        return () => {
            //setExitApp(false);
            BackHandler.removeEventListener('hardwareBackPress', backPressed);
        }
    }, [exitApp]);

    const CheckPermissionRecord = useCallback(() => {
        check(PermissionRecord)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable');
                        SetPermission();
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        CheckPermissionCamera();
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        AlertDenied();
                        break;
                }
            })
            .catch((error) => {
                // …
            });
    }, [props.route.params]);

    const CheckPermissionCamera = useCallback(() => {
        check(PermissionCamera)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        console.log('The permission has not been requested / is denied but requestable');
                        SetPermission();
                        break;
                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        SetPermission();
                        break;
                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        AlertDenied();
                        break;
                }
            })
            .catch((error) => {
                // …
            });
    }, [props.route.params]);

    const SetPermission = useCallback(() => {
        requestMultiple([
            PermissionRecord,
            PermissionCamera,
        ]).then((statuses) => {
            if (
                statuses[PermissionRecord] === 'granted' &&
                statuses[PermissionCamera] === 'granted'
            ) {
                RNSecureKeyStore.set("ddangkongPermission", 'true', {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                    .then((res) => {
                        let nextScreen = props.route.params.nextScreen;
                        props.navigation.replace(nextScreen);
                    }, (err) => {
                        console.log(err);
                    });
            } else {
                MyAlert(t('login.permission.alert'));
            }
        })
    }, [props.route.params]);

    const AlertDenied = useCallback(() => {
        Alert.alert(t('alert.title'), t('login.permission.alert2'), [
                { text: t('alert.no'),
                    onPress: () => BackHandler.exitApp(),
                },
                { text: t('alert.ok'),
                    onPress: () => CheckPermissionRecord(),
                }
            ],
            { cancelable: false }
        );
    }, []);

  return (
      <>
          <SafeAreaView style={[Style.SafeAreaView, styles.container]}>
              <View style={Style.headerWrap}>
                  {/*<MyBack navigation={props.navigation} />*/}
                  <View style={Style.ScreenWrap}>
                      <MyLogo />
                      <MyTitle title={t('login.permission.title')}
                               sub={t('login.permission.sub')}
                               subColor={'brown'} />

                      <View style={Style.btnBox}>
                          <MyButton text={t('login.permission.btn')}
                                    type={'primary'}
                                    style={Style.btnMd}
                                    onPress={() => CheckPermissionRecord()} />
                      </View>
                  </View>
              </View>
          </SafeAreaView>
      </>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background_orange,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default PermissionScreen;
