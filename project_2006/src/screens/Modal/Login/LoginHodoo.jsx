import React, { memo, useState, useCallback } from "react";
import {View} from 'react-native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import I18n from "~/locales/I18n";
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import ValidationEmail from '~/modules/ValidationEmail';
import MyAlert from "~/component/MyAlert";
import MyText from "~/component/MyText";
import LoginInput from "~/screens/Login/LoginInput";
import LoginButtons from "~/screens/Login/LoginButtons";

const { t } = I18n;

/*아이디로 로그인 팝업*/
const LoginHodoo = (props) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [autoIsOn, setAutoIsOn] = useState(false);

    /*id, pw 검증*/
    const LoginValidation = useCallback(() => {
        let message
        if (id.trim() === '') {
            /*아이디 없음*/
            message = t('validation.id.null');
        } else {
            if (password.trim() === '') {
                /*비밀번호 없음*/
                message = t('validation.pw.null');
            } else {
                /*아이디, 비밀번호 둘다 있음*/
                let val = ValidationEmail(id);
                if (!val) {
                    /*이메일 형식이 아닐때*/
                    message = t('validation.id.email');
                } else {
                    /*이메일 형식이 맞을때*/
                    SetLogin();
                    return;
                }
            }
        }
        MyAlert(message);
    }, [id, password, autoIsOn]);

    /*로그인 api*/
    const SetLogin = useCallback(() => {
        const data = {
            login_id: id.trim(),
            password: password.trim()
        };
        Http({
            method: 'POST',
            data: data,
            url: '/auth/login'
        })
            .then(response => {
                if (response.request.status === 200) {
                    /*로그인 타입 저장*/
                    RNSecureKeyStore.set('LoginType', 'HODOO', {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                    let user = {
                        auto: autoIsOn,
                        token: response.request._response
                    };
                    RNSecureKeyStore.set('GSP', JSON.stringify(user), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                        .then((res) => {
                            /*input 입력값 삭제*/
                            setId('');
                            setPassword('');
                            /*팝업창 닫기*/
                            props.onPress();
                            props.navigation.replace('Drawer');
                        }, (err) => {
                            console.log(err)
                        });
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    });

    /*자동로그인 체크 토글*/
    const AutoLoginChk = useCallback(() => {
        setAutoIsOn(!autoIsOn);
    }, [autoIsOn]);

    /*id, pw 입력값 저장*/
    const HandleId = useCallback((value) => {
        setId(value);
    }, []);

    const HandlePassword = useCallback((value) => {
        setPassword(value);
    }, []);

    return (
        <>
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <MyText text={'"'} />
                    <MyText text={t('login.sns.hodoo.sub1')}
                            weight={'6'}
                            color={'primary'} />
                    <MyText text={'"' + t('login.sns.hodoo.sub2')} />
                </View>
                <MyText text={t('login.sns.hodoo.sub3')}
                        align={'center'}
                        style={{ lineHeight: 22 }} />
            </View>
            <View style={{ marginTop: 20 }}>
                <LoginInput id={id}
                            password={password}
                            handleId={HandleId}
                            handlePassword={HandlePassword} />
                <LoginButtons autoIsOn={autoIsOn}
                              AutoLoginChk={AutoLoginChk}
                              LoginValidation={LoginValidation} />
            </View>
        </>
    );
}

export default memo(LoginHodoo);
