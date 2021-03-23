import React, { useEffect } from 'react';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Http from '~/modules/Http';
import ResetStore from "~/modules/ResetStore";

/*앱 시작시 로그인 유무에 따라 페이지 이동 설정*/
const StartScreen = (props) => {
    useEffect(() => {
        RNSecureKeyStore.get('GSP')
            .then((res) => {
                console.log(res)
                let auto = JSON.parse((res)).auto;
                if (auto) {
                    /*자동로그인 설정값 true 일때*/
                    Http({
                        method: 'GET',
                        url: '/popup',
                    })
                        .then(response => {
                            props.navigation.navigate('Drawer');
                        })
                        .catch(error => {
                            if (error.request.status === 403) {
                                ResetStore();
                                props.navigation.replace('Login');
                            }
                        })
                } else {
                    /*자동로그인 안되어있거나, 처음일때*/
                    ResetStore();
                    props.navigation.replace('Login');
                }
            }, (err) => {
                console.log(err);
                ResetStore();
                setTimeout(() => {
                    props.navigation.replace('Login');
                }, 3500);
            });
    }, []);

    return (
        <>
        </>
    );
};

export default StartScreen;
