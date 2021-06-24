import React, {useEffect, useCallback} from 'react';
import {Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from '~/modules/DrawerNavigator';
import messaging from "@react-native-firebase/messaging";
import I18n from '~/locales/I18n';
import SplashScreen from '~/screens/Login/SplashScreen';
import PermissionScreen from '~/screens/Login/PermissionScreen';
import LoginScreen from '~/screens/Login/LoginScreen';
import LoginLearnerScreen from '~/screens/Login/LoginLearnerScreen';
import EmailScreen from '~/screens/Login/Email/EmailScreen';
import SignUpScreen from '~/screens/Login/SignUp/SignUpScreen';
import LearnerInsertScreen from '~/screens/Learner/LearnerInsertScreen';
import PurchaseScreen2 from '~/screens/Purchase/PurchaseScreen';
import PlayScreen from '~/screens/Play/PlayScreen';
import VideoScreen from '~/screens/Play/VideoScreen';
import PlayVideoIOS from '~/screens/Play/PlayVideoIOS';
import LearnerScreen from '~/screens/Learner/LearnerScreen';
import SettingScreen from '~/screens/Setting/SettingScreen';

/*네비게이션 기본 헤더 안보이도록*/
const navOptionHandler = () => ({
    headerShown: false
});

const Stack = createStackNavigator();

const { t } = I18n;

const App = () => {
    useEffect(() => {
        //foreground 상태
        messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
            if (remoteMessage) {
                let notification = null;
                if (Platform.OS === 'android') {
                    notification = remoteMessage.notification;
                } else {
                    notification = remoteMessage.data.notification;
                }
            }
        });

        //알림창을 클릭한 경우
        messaging().onNotificationOpenedApp(message => {
            console.log(
                'onNotificationOpenedApp', message.notification,
            );
        })

        // Background, Quit 상태
        messaging().setBackgroundMessageHandler(async (message) => {
            console.log('setBackgroundMessageHandler', message);
            //  message.data로 메세지에 접근가능
            //  message.from 으로 topic name 또는 message identifier
            //  message.messageId 는 메시지 고유값 id
            //  message.notification 메시지와 함께 보내진 추가 데이터
            //  message.sentTime 보낸시간
        });

        // 종료상태에서 앱 열때
        messaging().getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log('getInitialNotification', remoteMessage.notification);
                }
            });
    }, []);

    return (
        <>
            <NavigationContainer style={{ backgroundColor: 'white' }}>
                <Stack.Navigator initialRouteName="Splash">
                    {/*<Stack.Screen name="Drawer" component={DrawerNavigator} options={navOptionHandler} />*/}
                    <Stack.Screen name="Splash" component={SplashScreen} options={navOptionHandler} />
                    <Stack.Screen name="Permission" component={PermissionScreen} options={navOptionHandler} />
                    <Stack.Screen name="Login" component={LoginScreen} options={navOptionHandler} />
                    <Stack.Screen name="LoginLearner" component={LoginLearnerScreen} options={navOptionHandler} />
                    <Stack.Screen name="Email" component={EmailScreen} options={navOptionHandler} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} options={navOptionHandler} />
                    <Stack.Screen name="LearnerInsert" component={LearnerInsertScreen} options={navOptionHandler} />
                    <Stack.Screen name="Purchase" component={PurchaseScreen2} options={navOptionHandler} />
                    <Stack.Screen name="PlayList" component={PlayScreen} options={navOptionHandler} />
                    <Stack.Screen name="Learner" component={LearnerScreen} options={navOptionHandler} />
                    <Stack.Screen name="PlayVideo" component={VideoScreen} options={navOptionHandler} />
                    <Stack.Screen name="PlayVideoIOS" component={PlayVideoIOS} options={navOptionHandler} />
                    <Stack.Screen name="Setting" component={SettingScreen} options={navOptionHandler} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;
