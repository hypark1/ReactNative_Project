import React, { useEffect, useCallback } from 'react';
import {AppState, Alert, Platform} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from "react-redux";
import { setPush } from '~/actions'
import Config from "react-native-config";
import SplashScreen from "react-native-splash-screen";
import firebase from 'react-native-firebase';
import codePush from 'react-native-code-push'
import VersionCheck from 'react-native-version-check';
import I18n from "~/locales/I18n";
import DrawerNavigator from '~/modules/DrawerNavigator';
import LinkingSet from "~/modules/LinkingSet";
import LoginScreen from '~/screens/Login/LoginScreen';
import StartScreen from "~/screens/StartScreen";

const { t } = I18n;

/*네비게이션 기본 헤더 안보이도록*/
const navOptionHandler = () => ({
    headerShown: false
});

const Stack = createStackNavigator();

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        /*코드푸시 업데이트*/
        codePushSync();
        AppState.addEventListener("change", (state) => {
            state === "active" && codePushSync();
        });
        /*앱 버전 체크*/
        CheckVersion();
        /*스플래시화면 닫기*/
        SplashScreen.hide();
        /*푸시알림 설정*/
        FirebaseNotifications();
    }, []);

    /*코드푸시 업데이트 확인*/
    const codePushSync = useCallback(() =>{
        codePush.sync({
            /*updateDialog: {
                //업데이트 다이얼로그 설정
                title : "업데이트",
                optionalUpdateMessage : "새로운 업데이트가 존재합니다.",
                optionalIgnoreButtonLabel : "",
                optionalInstallButtonLabel : "확인"
            },*/
            checkFrequency: codePush.CheckFrequency.ON_APP_START,
            // 언제 업데이트를 체크하고 반영할지를 정한다.
            // ON_APP_RESUME은 Background에서 Foreground로 오는 것을 의미
            // ON_APP_START은 앱이 실행되는(켜지는) 순간을 의미
            updateDialog: false,
            // 업데이트를 할지 안할지 여부에 대한 노출 (잠수함 패치의 경우 false)
            installMode: codePush.InstallMode.IMMEDIATE //즉시 업데이트
        });
    }, []);

    /*앱 버전 체크*/
    const CheckVersion = useCallback(() => {
        if (Config.ENV !== 'dev') {
            VersionCheck.needUpdate()
                .then(res => {
                    console.log(res);
                    /*업데이트 필요할때*/
                    if (res && res.isNeeded) {
                        Alert.alert(t('alert.title'), t('alert.update'), [
                                { text: t('alert.ok'),
                                    onPress: () => {
                                        /*스토어로 이동*/
                                        if (Platform.OS === 'android') {
                                            LinkingSet(res.storeUrl);
                                        } else {
                                            LinkingSet('https://apps.apple.com/us/app/doorhub-driver/1529823275');
                                        }
                                    }
                                }
                            ],
                            { cancelable: false }
                        );
                    }
                    // { isNeeded: true, currentVersion: "1.0.0", latestVersion: "1.1.0" }
                });
        }
    }, []);

    const FirebaseNotifications = () => {
        firebase.notifications().onNotificationDisplayed(notification => {
            console.log('on notifi');
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });

        /**
         * 앱이 실행되고 있는 상태에서 알림을 받음
         */
        const notificationListener = firebase.notifications().onNotification((notification) => {
            console.log('onNotification:');

            const localNotification = new firebase.notifications.Notification({
                sound: 'default',
                show_in_foreground: true,
            })
                .setNotificationId(notification._notificationId)
                .setTitle(notification._title)
                .setBody(notification._body)
                .setSound('default')
                .setData(notification._data)
                .android.setChannelId('deployPushTest') // string.xml에서 설정한 channel id
                .android.setSmallIcon('@drawable/ic_notification') // 추가한 notification icon
                .android.setColor('#666666') // colors.xml에서 설정한 color
                .android.setAutoCancel(true)
                .android.setDefaults(firebase.notifications.Android.Defaults.All)
                .android.setPriority(firebase.notifications.Android.Priority.High);

            firebase.notifications().displayNotification(localNotification)
                .catch(err => console.error(err));
            firebase.notifications().removeDeliveredNotification(localNotification.notificationId);
        });

        const channel = new firebase.notifications.Android.Channel('deployPushTest', 'deploy test app name', firebase.notifications.Android.Importance.High)
            .setDescription('deploy test app description')
        // .setSound('sampleaudio.mp3');
        firebase.notifications().android.createChannel(channel);

        /*
         * 앱이 background에 있을때 알림창을 터치한다.
         */
        const notificationOpenedListener = firebase.notifications().onNotificationOpened(notificationOpen => {
            console.log('onNotificationOpened:');
            console.log(notificationOpen);
            const notification = notificationOpen.notification
            SetPushGo(notification._data);
            firebase.notifications().removeDeliveredNotification(notification.notificationId);
        });

        /*
         * 앱이 종료되었을때 알림을 터치한다.
         */
        const notificationOpen = firebase.notifications().getInitialNotification()
            .then(notificationOpen => {
                if (notificationOpen) {
                    console.log('notificationOpen')
                    console.log(notificationOpen);
                    SetPushGo(notificationOpen.notification._data)
                }
            });

        /*
         * foreground에 있을때 터치한다.
         */
        const messageListener = firebase.messaging().onMessage(message => {
            console.log('messageListener');
            console.log(JSON.stringify(message));
        });

        return () => {
            notificationListener();
            notificationOpenedListener();
        }
    }

    /*push값 변경해서 푸시알림값 체크*/
    const SetPushGo = (value) => {
        dispatch(setPush(value));
    }

    return (
        <>
            <NavigationContainer style={{ backgroundColor: 'white' }}>
                <Stack.Navigator initialRouteName="Start">
                    <Stack.Screen name="Start" component={StartScreen} options={navOptionHandler} />
                    <Stack.Screen name="Drawer" component={DrawerNavigator} options={navOptionHandler} />
                    <Stack.Screen name="Login" component={LoginScreen} options={navOptionHandler} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default App;
