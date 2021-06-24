import React from 'react';
import I18n from "~/locales/I18n";
import ResetKeyStore from "~/modules/ResetKeyStore";
import LinkingSet from "~/modules/LinkingSet";
import MyAlert from "~/component/MyAlert";
import {Alert} from "react-native";

const { t } = I18n;

/*에러났을때*/
const ErrorSetPA = (props, navigation, data) => {
    console.log('errorSet');
    console.log(props.request);
    let message;
    if (props.request !== undefined) {
        /*반환되는게 있을때*/
        message = JSON.parse(props.request._response);
        if (props.request.status === 500 || props.request.status === 503) {
            /*내부에러*/
            message = t('error');
            MyAlert(message);
        } else if (props.request.status === 403 || props.request.status === 401) {
            /*로그인 안되어있을때 || 가입정보 없을때*/
            ResetKeyStore();
            if (navigation !== undefined) {
                navigation.replace('Login');
            }
        } else {
            if (message.error_code === 200021) {
                /*간편로그인시 아이디 없을때*/
                Alert.alert(t('alert.title'), t('alert.login'), [
                        { text: t('alert.ok'),
                            onPress: () => {
                                navigation.replace('SignUp', { data: data });
                            }
                        }
                    ],
                    { cancelable: false }
                );
            } else {
                MyAlert(message.error_message);
            }
        }
    } else {
        MyAlert(t('error'));
    }
};

export default ErrorSetPA;
