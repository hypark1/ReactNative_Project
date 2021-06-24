import React, {memo, useCallback, useEffect, useState, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity, Platform, Alert, SafeAreaView} from 'react-native';
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import KakaoLogin from '@actbase/react-native-kakao-login';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import { useDispatch } from "react-redux";
import { setLoad } from '~/actions'
import I18n from "~/locales/I18n";
import HttpPA from "~/modules/HttpPA";
import ErrorSetPA from "~/modules/ErrorSetPA";
import GetDevice from "~/modules/GetDevice";
import MyText from '~/component/MyText';
import MyImg from '~/component/MyImg';
import LoadScreen from '~/screens/LoadScreen';
import ParentsPopup from "./Parents/ParentsPopup";
import Colors from '~/styles/Colors';

const { t } = I18n;

const iosKeys = {
    kConsumerKey: "8ykfxEp_IEoaJ1mOatlb",
    kConsumerSecret: "ai7orHeyPk",
    kServiceAppName: "땅콩스쿨",
    kServiceAppUrlScheme: "ddangkongnaverlogin" // only for iOS
};

const androidKeys = {
    kConsumerKey: "8ykfxEp_IEoaJ1mOatlb",
    kConsumerSecret: "ai7orHeyPk",
    kServiceAppName: "땅콩스쿨",
};

const initials = Platform.OS === "android" ? androidKeys : iosKeys;

const SNSArr = [
    {
        type: 'NAVER',
        background: Colors.naver,
        url: require('~/assets/images/sns/logo_naver.png')
    },
    {
        type: 'KAKAO',
        background: Colors.kakao,
        url: require('~/assets/images/sns/logo_kakao.png')
    },
    {
        type: 'GOOGLE',
        background: Colors.white,
        border: Colors.line,
        url: require('~/assets/images/sns/logo_google.png')
    },
    {
        type: 'APPLE',
        background: Colors.black,
        url: require('~/assets/images/sns/logo_apple.png')
    }
]


/**
 * You'd technically persist this somewhere for later use.
 */
let user = null;

/**
 * Fetches the credential state for the current user, if any, and updates state on completion.
 */
async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
    if (user === null) {
        updateCredentialStateForUser('N/A');
    } else {
        const credentialState = await appleAuth.getCredentialStateForUser(user);
        if (credentialState === appleAuth.State.AUTHORIZED) {
            updateCredentialStateForUser('AUTHORIZED');
        } else {
            updateCredentialStateForUser(credentialState);
        }
    }
}

const LoginSNS = (props) => {
    const [parentsVisible, SetParentsVisible] = useState(false);
    const [snsType, SetSnsType] = useState('');
    const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!appleAuth.isSupported) return

        fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
            updateCredentialStateForUser(`Error: ${error.code}`),
        );
    }, []);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '926374297912-o98smppb4fnalp70teqpeqdodcu12krh.apps.googleusercontent.com',
            offlineAccess: true
        });
    }, [])

    const PostSimpleLogin = useCallback((snsType, value, email) => {
        dispatch(setLoad(true));
        let data = {
            'app_id': t('appID'),
            'auth_provider': snsType,
            'external_identifier': value.id,
            'login_id': email
        }
        console.log('PostSimpleLogin')
        console.log(data)
        //MyAlert(JSON.stringify(data))
        HttpPA({
            method: 'POST',
            data: data,
            url: '/auth/common-simple-login'
        })
            .then(response => {
                console.log(response.request)
                if (response.request.status === 200) {
                    SetLoginSuccess(response.request._response, snsType, data.login_id);
                }
            })
            .catch(error => {
                ErrorSetPA(error, props.navigation, data);
                dispatch(setLoad(false));
            })
    }, []);

    /*네이버로 로그인*/
    const naverLogin = useCallback((snsType) => {
        return new Promise((resolve, reject) => {
            NaverLogin.login(initials, async (err, token) => {
                //console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
                //setNaverToken(token);
                if (token) {
                    //console.log(JSON.stringify(token))
                    const profileResult = await getProfile(token.accessToken);
                    if (profileResult.resultcode === '024') {
                        console.log('로그인 실패', profileResult.message);
                        return;
                    }
                    //console.log('profileResult', profileResult);
                    PostSimpleLogin(snsType, profileResult.response, profileResult.response.email)
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(token);
                }
            });
        });
    }, []);

    /*카카오로 로그인*/
    const kakaoLogin = useCallback((snsType) => {
        console.log('kakaoLogin')
        if (Platform.OS === 'android') {
            KakaoLogins.login([KAKAO_AUTH_TYPES.Talk])
                .then(result => {
                    //console.log(result.accessToken);
                    console.log(`Login Finished:${JSON.stringify(result)}`);
                    KakaoLogins.getProfile()
                        .then(result => {
                            console.log(`Get Profile Finished:${JSON.stringify(result)}`);
                            PostSimpleLogin(snsType, result, result.email);
                        })
                        .catch(err => {
                            console.log(`Get Profile Failed:${err.code} ${err.message}`);
                        });
                })
                .catch(err => {
                    if (err.code === 'E_CANCELLED_OPERATION') {
                        console.log(`Login Cancelled:${err.message}`);
                    } else {
                        console.log(
                            `Login Failed:${err.code} ${err.message}`
                        );
                    }
                });
        } else {
            KakaoLogin.login()
                .then((result) => {
                    console.log(`Login Finished:${JSON.stringify(result)}`);
                    KakaoLogin.getProfile()
                        .then((result) => {
                            //console.log('result')
                            //console.log(result)
                            PostSimpleLogin(snsType, result, result.kakao_account.email);
                        })
                        .catch((err) => {
                            console.log(`Get Profile Failed:${err.code} ${err.message}`);
                        });
                })
                .catch((err) => {
                    if (err.code === 'E_CANCELLED_OPERATION') {
                        console.log(`Login Cancelled:${err.message}`);
                    } else {
                        console.log(`Login Failed:${err.code} ${err.message}`);
                    }
                });
        }
    }, []);

    /*구글로 로그인*/
    const googleLogin = useCallback(async (snsType) => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(`Login Finished:${JSON.stringify(userInfo)}`);
            //setGoogleToken(userInfo.user)
            PostSimpleLogin(snsType, userInfo.user, userInfo.user.email);
        } catch (error) {
            console.log(`Login Error:${JSON.stringify(error)}`);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }, []);

    /*애플로 로그인*/
    const appleLogin = useCallback(() => {
        onAppleButtonPress(updateCredentialStateForUser);
    }, [updateCredentialStateForUser]);

    /**
     * Starts the Sign In flow.
     */
    const onAppleButtonPress = async (updateCredentialStateForUser) => {
        //console.log('Beginning Apple Authentication');

        // start a login request
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            console.log('appleAuthRequestResponse', appleAuthRequestResponse);

            const {
                user: newUser,
                email,
                nonce,
                identityToken,
                realUserStatus /* etc */,
            } = appleAuthRequestResponse;

            user = newUser;
            fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
                updateCredentialStateForUser(`Error: ${error.code}`),
            );

            if (identityToken) {
                // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
                //console.log('identityToken');
                //console.log(identityToken);
                let data = {
                    app_id: t('appID'),
                    token : identityToken
                }
                HttpPA({
                    method: 'POST',
                    data: data,
                    url: '/auth/common-simple-login-apple'
                })
                    .then(response => {
                        if (response.request.status === 200) {
                            SetLoginSuccess(response.request._response, 'APPLE');
                        }
                    })
                    .catch(error => {
                        ErrorSetPA(error, props.navigation, appleAuthRequestResponse);
                    })
            } else {
                // no token - failed sign-in?
            }
        } catch (error) {
            if (error.code === appleAuth.Error.CANCELED) {
                console.log('User canceled Apple Sign in.');
            } else {
                console.log(error);
            }
        }
    }

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
                    props.navigation.replace('LoginLearner');
                }, 500)
            }, (err) => {
                console.log(err)
            });
    }

    const SetSNSDom = useCallback(() => {
        let dom = SNSArr.map((item, idx) => {
            let google = item.type === 'GOOGLE' ? {borderWidth: 1, borderColor: item.border} : null;
            if ((item.type !== 'APPLE') || (Platform.OS !== 'android' && parseInt(Platform.Version, 10) > 12)) {
                /*타입이 애플이 아니거나, ios이고 버전이 12보다 높은것*/
                return (
                    <TouchableOpacity activeOpacity={1}
                                      key={item.type}
                                      style={[{ backgroundColor: item.background}, styles.snsBox, google]}
                                      onPress={OpenPopup.bind(this, item.type)}>
                        <MyImg src={item.url}
                               style={styles.snsImg} />
                    </TouchableOpacity>
                )
            } else {
                return null
            }
        });
        return dom;
    }, []);

    const OpenPopup = useCallback((value) => {
        SetParentsVisible(true);
        SetSnsType(value)
    }, []);

    const ClosePopup = useCallback(() => {
        SetParentsVisible(false);
    }, []);

    const OpenLogin = useCallback(() => {
        ClosePopup();
        switch (snsType) {
            case 'NAVER' :
                naverLogin(snsType);
                return false;
            case 'KAKAO' :
                kakaoLogin(snsType);
                return false;
            case 'GOOGLE' :
                googleLogin(snsType);
                return false;
            case 'APPLE' :
                appleLogin(snsType);
                return false;
        }
    }, [snsType]);

    return (
        <>
            {
                parentsVisible?
                    <ParentsPopup navigation={props.navigation} OpenPopup={OpenPopup} ClosePopup={ClosePopup} OpenLogin={OpenLogin} />
                    :
                    null
            }
            <LoadScreen />
            <View style={{
                width: '70%',
                alignItems: 'center',
                justifyContent: 'center'}}>
                <View style={styles.container}>
                    <View style={styles.line}/>
                    <MyText text={t('login.sns.title')}
                            family={'NanumB'} />
                    <View style={styles.line}/>
                </View>
                <View style={[styles.container, styles.snsContainer]}>
                    <SetSNSDom />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    snsContainer: {
        marginTop: 15
    },
    line: {
        width: 45,
        height: 0.7,
        marginHorizontal: 15,
        backgroundColor: Colors.text
    },
    snsBox: {
        borderRadius: 30,
        marginHorizontal: 10
    },
    snsImg: {
        width: 30,
        height: 30,
        margin: 10
    }
});

export default memo(LoginSNS);
