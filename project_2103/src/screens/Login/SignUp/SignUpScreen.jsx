import React, {useState, useCallback, useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import {useDispatch} from "react-redux";
import I18n from "~/locales/I18n";
import { setLoad } from '~/actions'
import HttpPA from "~/modules/HttpPA";
import ErrorSetPA from "~/modules/ErrorSetPA";
import GetDevice from "~/modules/GetDevice";
import ConfirmInput from "~/modules/ConfirmInput";
import MyTitle from '~/component/MyTitle';
import MyText from "~/component/MyText";
import MyTextInput from "~/component/MyTextInput";
import MyButton from "~/component/MyButton";
import MyAlert from "~/component/MyAlert";
import LoadPopup from "~/screens/LoadPopup";
import SignUpTerms from "~/screens/Login/SignUp/SignUpTerms";
import Style from '~/styles/Style';

const { t } = I18n;

const SignUpScreen = (props) => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setName('');
    }, []);

    /*이름 입력값 저장*/
    const HandleName = useCallback((value) => {
        let trim = value.trim();
        if (trim.length === 20) {
            MyAlert(t('login.signUp.name.max', {num: 20}));
        } else if( ConfirmInput(trim) === true ) {
            MyAlert('특수문자는 사용할 수 없습니다.');
        } else {
            setName(trim);
        }
    }, []);

    /*회원가입 취소*/
    const CloseSignUp = useCallback(() => {
        Alert.alert(t('alert.title'), t('alert.signUp'), [
                { text: t('alert.no')},
                { text: t('alert.ok'),
                    onPress: () => {
                        props.navigation.replace('Login');
                    }
                }
            ],
            { cancelable: false }
        );
    }, []);


    /*회원가입 정보 확인*/
    const ConfirmSignUp = useCallback(() => {
        let value = name.trim();
        if (value === '') {
            /*이름 없을때*/
            MyAlert(t('login.signUp.name.placeholder'));
        } else {
            dispatch(setLoad(true));
            if (props.route.params.data.app_id) {
                /*일반공통 회원가입*/
                PostSignUpAdd();
            } else {
                /*애플 회원가입*/
                PostSignUpAddApple();
            }
        }
    }, [name]);

    /*학부모 추가 - 일반공통*/
    const PostSignUpAdd = useCallback(() => {
        let data = props.route.params.data;
        data.parent_name = name;
        HttpPA({
            method: 'POST',
            data: data,
            url: '/auth/common-simple-add-v2'
        })
            .then(response => {
                if (response.request.status === 200) {
                    console.log('PostSignUpAdd', response.request._response)
                    Keyboard.dismiss();
                    SetLoginSuccess(response.request._response, data.auth_provider, data.login_id);
                }
            })
            .catch(error => {
                ErrorSetPA(error);
                dispatch(setLoad(false));
            })
    }, [name]);

    /*학부모 추가 - 애플*/
    const PostSignUpAddApple = useCallback(() => {
        let data = {
            app_id: t('appID'),
            auth_provider: 'APPLE',
            external_identifier: '',
            login_id: '',
            parent_name: name
        };
        console.log('data', data);
        let token = {
            token: props.route.params.data.identityToken
        };
        console.log('token', token);
        HttpPA({
            method: 'POST',
            data: data,
            params: token,
            url: '/auth/common-simple-add-apple-v2'
        })
            .then(response => {
                console.log('PostSignUpAddApple', response.request._response)
                if (response.request.status === 200) {
                    Keyboard.dismiss();
                    SetLoginSuccess(response.request._response, 'APPLE');
                }
            })
            .catch(error => {
                console.log('PostSignUpAddAppleerror', error)
                ErrorSetPA(error);
                dispatch(setLoad(false));
            })
    }, [name]);

    /*로그인 성공시 처리*/
    const SetLoginSuccess = (value, type, email) => {
        let user = {
            auto: true,
            token: value,
            email: email
        };
        /*로그인 타입 저장*/
        RNSecureKeyStore.set('ddangkongLoginType', type, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
        RNSecureKeyStore.set('ddangkongLogin', JSON.stringify(user), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
            .then((res) => {
                GetDevice();
                setTimeout(() => {
                    dispatch(setLoad(false));
                    props.navigation.replace('LearnerInsert', {type: 'signUp'})
                }, 500)
            }, (err) => {
                console.log(err)
                dispatch(setLoad(false));
            });
    }

    return (
        <>
            <LoadPopup />
            <SafeAreaView style={Style.SafeAreaView}>
                <View style={Style.headerWrap}>
                    {/*<MyBack navigation={props.navigation} />*/}
                    <KeyboardAvoidingView behavior={Platform.OS === 'android'? null : 'padding'}
                                          keyboardVerticalOffset={null}
                                          style={Style.keyboard}
                                          enabled>
                        <View style={Style.wideWrap}>
                            <MyTitle title={t('login.signUp.title')} />
                                <View style={styles.parentsBox}>
                                    <MyText text={t('login.signUp.name.title')}
                                            style={{marginBottom: 10}} />
                                    <MyTextInput placeholder={t('login.signUp.name.placeholder')}
                                                 value={name}
                                                 onChangeText={HandleName}
                                                 maxLength={20}
                                                 style={{width: '100%'}} />
                                </View>
                                <View style={{height: 250 }}>
                                    <SignUpTerms type={'term'}/>
                                    <SignUpTerms type={'privacy'}/>
                                </View>
                                <View style={styles.btnBox}>
                                    <MyButton text={t('login.signUp.btn.no')}
                                              type={'white'}
                                              style={Style.btnMd}
                                              onPress={() => CloseSignUp()} />
                                    <View style={{flex: 0.2}} />
                                    <MyButton text={t('login.signUp.btn.yes')}
                                              type={'primary'}
                                              style={Style.btnMd}
                                              onPress={() => ConfirmSignUp()} />
                                </View>
                            </View>
                    </KeyboardAvoidingView>
                    </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    parentsBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -25,
        marginBottom: 13
    },
    btnBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
});

export default SignUpScreen;
