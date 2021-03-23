import React, { useCallback, useState, useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { NaverLogin, getProfile } from "@react-native-seoul/naver-login";
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import firebase from "react-native-firebase";
import I18n from "~/locales/I18n";
import Http from "~/modules/Http";
import ErrorSet from "~/modules/ErrorSet";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import Colors from "~/styles/Colors";

const iosKeys = {
    kConsumerKey: "kxsyiDARxHBUHNfcaGmR",
    kConsumerSecret: "riZ_i7muEf",
    kServiceAppName: "호두멤버스",
    kServiceAppUrlScheme: "hodoomembersnaverlogin" // only for iOS
};

const androidKeys = {
    kConsumerKey: "kxsyiDARxHBUHNfcaGmR",
    kConsumerSecret: "riZ_i7muEf",
    kServiceAppName: "호두멤버스"
};

const initials = Platform.OS === "android" ? androidKeys : iosKeys;

const { t } = I18n;

const loginArr = [
    {
        type: 'NAVER',
        text: t('login.sns.naver'),
        color: 'white',
        src: require('~/assets/images/login_naver.png'),
        img: { width: 33, height: 28 },
        box: '#1ec800',
        bar: Colors.white
    },
    {
        type: 'KAKAO',
        text: t('login.sns.kakao'),
        color: '#381e1f',
        src: require('~/assets/images/login_kakao.png'),
        img: { width: 33, height: 33 },
        box: '#fae100',
        bar: '#827448'
    },
    {
        type: 'GOOGLE',
        text: t('login.sns.google'),
        color:'white',
        src: require('~/assets/images/login_google.png'),
        img: { width: 33, height: 33 },
        box: '#f14336',
        bar: Colors.white
    },
    {
        type: 'APPLE',
        text: t('login.sns.apple'),
        color: 'white',
        src: require('~/assets/images/login_apple.png'),
        img: { width: 33, height: 36 },
        box: '#252525',
        bar: Colors.white
    },
    /*{
        type: 'facebook',
        text: t('login.sns.facebook'),
        color: 'white',
        src: require('~/assets/images/login_facebook.png'),
        img: { width: 33, height: 37 },
        box: '#295396',
        bar: Colors.white
    },*/
    {
        type: 'HODOO',
        text: t('login.sns.hodoo.title'),
        color: 'primary',
        src: require('~/assets/images/login_hodoo.png'),
        img: { width: 58, height: 30 },
        box:'#fff',
        bar: Colors.primary,
        style: {borderWidth: 1, borderColor: Colors.primary }
    }
];
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



/*간편로그인 리스트*/
const LoginSNS = (props) => {
    const [type, setType] = useState(null);
    const [credentialStateForUser, updateCredentialStateForUser] = useState(-1);

    useEffect(() => {
        if (!appleAuth.isSupported) return

        fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
            updateCredentialStateForUser(`Error: ${error.code}`),
        );
    }, []);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '335730985194-7lq4e7dq76n5e8n1rcmlnte8msm291c2.apps.googleusercontent.com',
            offlineAccess: true
        });
    }, []);

    useEffect(() => {
        RNSecureKeyStore.get('LoginType')
            .then((res) => {
                let value = res;
                setType(value)
            }, (err) => {
                console.log(err);
            });
    }, []);

    /*간편로그인 api*/
    const PostSimpleLogin = useCallback((snsType, value) => {
        let data = {
            'auth_provider': snsType,
            'external_identifier': value.id,
            'login_id': value.email
        }
        Http({
            method: 'POST',
            data: data,
            url: '/auth/simple-login'
        })
            .then(response => {
                console.log(response.request)
                if (response.request.status === 200) {
                    RNSecureKeyStore.set('LoginType', snsType, {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                    let user = {
                        auto: true,
                        token: response.request._response
                    };
                    RNSecureKeyStore.set('GSP', JSON.stringify(user), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                        .then((res) => {
                            props.navigation.replace('Drawer');
                        }, (err) => {
                            console.log(err)
                        });
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, []);

    /*네이버로 로그인*/
    const naverLogin = useCallback((snsType) => {
        return new Promise((resolve, reject) => {
            NaverLogin.login(initials, async (err, token) => {
                console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
                //setNaverToken(token);
                console.log(JSON.stringify(token))
                const profileResult = await getProfile(token.accessToken);
                if (profileResult.resultcode === '024') {
                    console.log('로그인 실패', profileResult.message);
                    return;
                }
                console.log('profileResult', profileResult);
                PostSimpleLogin(snsType, profileResult.response)
                if (err) {
                    reject(err);
                    return;
                }
                resolve(token);
            });
        });
    }, []);

    /*카카오로 로그인*/
    const kakaoLogin = useCallback((snsType) => {
        KakaoLogins.login([KAKAO_AUTH_TYPES.Talk])
            .then(result => {
                //setKakaoToken(result.accessToken);
                //console.log(`Login Finished:${JSON.stringify(result)}`);
                KakaoLogins.getProfile()
                    .then(result => {
                        //console.log(`Get Profile Finished:${JSON.stringify(result)}`);
                        PostSimpleLogin(snsType, result);
                    })
                    .catch(err => {
                        console.log(`Get Profile Failed:${err.code} ${err.message}`);
                    });
            })
            .catch(err => {
                if (err.code === 'E_CANCELLED_OPERATION') {
                    console.log(`Login Cancelled:${err.message}`);
                } else {
                    console.log(`Login Failed:${err.code} ${err.message}`);
                }
            });
    }, []);

    /*구글로 로그인*/
    const googleLogin = useCallback(async (snsType) => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //console.log(`Login Finished:${JSON.stringify(userInfo)}`);
            //setGoogleToken(userInfo.user)
            PostSimpleLogin(snsType, userInfo.user);
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

            //console.log('appleAuthRequestResponse', appleAuthRequestResponse);

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
                //console.log(nonce, identityToken);
                let data = {
                    token : identityToken
                }
                Http({
                    method: 'POST',
                    data: data,
                    url: '/auth/simple-apple-login'
                })
                    .then(response => {
                        console.log(response.request._response)
                        if (response.request.status === 200) {
                            RNSecureKeyStore.set('LoginType', 'APPLE', {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                            let user = {
                                auto: true,
                                token: response.request._response
                            };
                            RNSecureKeyStore.set('GSP', JSON.stringify(user), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                                .then((res) => {
                                    props.navigation.replace('Drawer');
                                }, (err) => {
                                    console.log(err)
                                });
                        }
                    })
                    .catch(error => {
                        ErrorSet(error);
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

    /*아이디로 로그인*/
    const LoginId = useCallback(() => {
        props.open();
    }, []);

    /*로그인 버튼 클릭시*/
    const ClickLogin = useCallback(async (snsType) => {
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
            case 'HODOO' :
                LoginId();
                return false;
        }
    }, []);

    const LoginBtnDom = useCallback((value) => {
        return (
            <TouchableOpacity activeOpacity={1}
                              style={[styles.loginBox, { backgroundColor: value.value.box }, value.value.style]}
                              onPress={ClickLogin.bind(this, value.value.type)}>
                {
                    value.value.type === type && type !== 'HODOO' ?
                        <View style={styles.useBox}>
                            <MyImg src={require('~/assets/images/login_recent_use.png')}
                                   style={styles.useImg}/>
                        </View>
                        :
                        null
                }
                <View style={styles.loginImgBox}>
                    <View style={[styles.loginBar, { borderColor: value.value.bar }]}/>
                    <MyImg src={value.value.src}
                           style={[styles.loginImg, value.value.img]}/>
                </View>
                <View style={styles.loginTextBox}>
                    <MyText text={value.value.text}
                            color={value.value.color}
                            size={'lg'} />
                </View>
            </TouchableOpacity>
        )
    }, [props.num, type]);

    /*간편로그인 리스트 설정*/
    const SetLoginBtn = useCallback(() => {
        let dom = loginArr.map((item, index) => {
            if ((item.type !== 'APPLE') || (Platform.OS !== 'android' && parseInt(Platform.Version, 10) > 12)) {
                /*타입이 애플이 아니거나, ios이고 버전이 12보다 높은것*/
                return (
                    <LoginBtnDom key={item.text}
                                 idx={index}
                                 value={item}/>
                )
            } else {
                return null
            }
        });
        return dom;
    }, [type]);

    return (
        <>
            {SetLoginBtn()}
            <View style={styles.balloonBox}>
                <MyImg src={require('~/assets/images/login_balloon_guide.png')}
                       style={styles.balloonImg}/>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    loginBox: {
        flexDirection: 'row',
        height: 60,
        borderRadius: 50,
        marginBottom: 15,
    },
    loginImgBox: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginBar: {
        position: 'absolute',
        borderRightWidth: 1,
        opacity: 0.4,
        width: '100%',
        height: 20
    },
    loginImg: {
        width: 30,
        height: 30
    },
    loginTextBox: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    useBox: {
        position: 'absolute',
        top: 0,
        right: -10
    },
    useImg: {
        width: 58,
        height: 22
    },
    balloonBox: {
        marginTop: -22,
        height: 84
    },
    balloonImg: {
        width: '104%',
        height: 77,
        marginLeft: '-2%'
    },
});

export default LoginSNS;
