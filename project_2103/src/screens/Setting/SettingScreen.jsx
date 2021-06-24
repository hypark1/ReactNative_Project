import React, {useEffect, useCallback} from 'react';
import {SafeAreaView, StyleSheet, View, Alert, Platform} from 'react-native';
import RNSecureKeyStore from "react-native-secure-key-store";
import {useDispatch} from "react-redux";
import Orientation from 'react-native-orientation-locker';
import {setDeviceId, setLearner, setLearnerSelect, setClassInterval} from "~/actions";
import I18n from "~/locales/I18n";
import HttpPA from "~/modules/HttpPA";
import ResetKeyStore from "~/modules/ResetKeyStore";
import ErrorSetPA from "~/modules/ErrorSetPA";
import MyTitle from '~/component/MyTitle';
import MyBack from '~/component/MyBack';
import MyButton from "~/component/MyButton";
import SettingContents from "~/screens/Setting/SettingContents";
import Style from '~/styles/Style';

const { t } = I18n;

const SettingScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        Orientation.lockToLandscape()
    },[]);

    /*로그아웃 확인 알럿*/
    const ConfirmLogOut = useCallback(() => {
        Alert.alert(t('alert.title'), t('alert.logOut'), [
                { text: t('alert.no'), },
                { text: t('alert.ok'),
                    onPress: () => PostLogOut(),
                }
            ],
            { cancelable: false }
        );
    }, []);

    /*로그아웃*/
    const PostLogOut = useCallback(() => {
        dispatch(setClassInterval(false));
        RNSecureKeyStore.get('ddangkongDeviceId')
            .then((res) => {
                if (res !== null) {
                    /*저장했던 deviceid가 있을때*/
                    const id = Number(res);
                    let data = {
                        appId: t('appID'),
                        deviceid: id
                    }
                    HttpPA({
                        method: 'POST',
                        params: data,
                        url: '/auth/common-logout'
                    })
                        .then(response => {
                            if (response.request.status === 204) {
                                SetLogout();
                            }
                        })
                        .catch(error => {
                            ErrorSetPA(error);
                        })
                } else {
                    SetLogout();
                }
            }, (err) => {
                console.log(err);
                SetLogout();
            });
    }, []);

    const SetLogout = useCallback(() => {
        ResetKeyStore();
        dispatch(setLearner([]));
        dispatch(setLearnerSelect(null));
        dispatch(setDeviceId(0));
        props.navigation.replace('Login');
    }, []);

    return (
        <>
            <SafeAreaView style={[Style.SafeAreaView]}>
                <View style={Style.headerWrap}>
                    <MyBack navigation={props.navigation} />
                    <View style={Style.wideWrap}>
                        <MyTitle title={t('setting.title')} />
                        <SettingContents navigation={props.navigation} />
                        <View style={[Style.btnBox, Style.btnBoxSm]}>
                            <MyButton text={t('setting.logout')}
                                      type={'line'}
                                      style={Style.btnSm}
                                      onPress={() => ConfirmLogOut()} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
});

export default SettingScreen;
