import React, {useEffect, useState, useCallback, useRef} from 'react';
import {SafeAreaView, StyleSheet, View, BackHandler, ToastAndroid, Platform, StatusBar, AppState} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Orientation from 'react-native-orientation-locker';
import VersionCheck from "react-native-version-check";
import {setDeviceId, setLearner, setLearnerInfo, setLearnerSelect} from "~/actions";
import I18n from "~/locales/I18n";
import Http from "~/modules/Http";
import HttpPA from "~/modules/HttpPA";
import ErrorSet from "~/modules/ErrorSet";
import ErrorSetPA from "~/modules/ErrorSetPA";
import MyTitle from '~/component/MyTitle';
import MyLogoText from "~/component/MyLogoText";
import MySetting from "~/component/MySetting";
import PlayNull from '~/screens/Play/PlayNull';
import PlayList from "~/screens/Play/PlayList";
import Style from '~/styles/Style';

const { t } = I18n;

const StoreName = Platform.OS === 'android'? 'PLAY_STORE' : 'APP_STORE';

const PlayScreen = (props) => {
    const [list, setList] = useState([]);
    const [playClass, setPlayClass] = useState(null);
    const [exitApp, setExitApp] = useState(undefined);
    const [purchase, setPurchase] = useState(false);
    const learner = useSelector((store) => store.reducer.learner);
    const learner_select = useSelector((store) => store.reducer.learner_select);
    const dispatch = useDispatch();
    const timeout = useRef();
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        Orientation.lockToLandscape()
    }, []);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            /*화면에 다시 왔을때*/
            getDeviceId();
        });

        return unsubscribe;
    }, [props.navigation]);

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
        BackHandler.addEventListener('hardwareBackPress', backPressed);
        return () => {
            //setExitApp(false);
            BackHandler.removeEventListener('hardwareBackPress', backPressed);
        }
    }, [exitApp]);

    /*앱 상태 확인*/
    const handleAppStateChange = nextAppState => {
        console.log('⚽️appState nextAppState', appState.current, nextAppState);
        if (appState.current.match(/inactive|background/) &&
            nextAppState === 'active') {
            console.log('⚽️⚽️foreground!');
            getDeviceId();
            setPlayClass([]);
        }
        if (appState.current.match(/inactive|active/) &&
            nextAppState === 'background') {
            console.log('⚽️⚽️background!');
        }
        appState.current = nextAppState;
    };

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, []);

    /*디바이스 아이디 가져오기*/
    const getDeviceId = useCallback(() => {
        RNSecureKeyStore.get('ddangkongDeviceId')
            .then((res) => {
                console.log('ddangkongDeviceId')
                console.log(res)
                if (res !== null) {
                    const id = Number(res);
                    dispatch(setDeviceId(id));
                    GetLearnerList(id);
                }
            }, (err) => {
                console.log(err);
            });
    }, []);

    /*학습자 리스트 가져오기*/
    const GetLearnerList = useCallback((value) => {
        let data = {
            appId: t('appID'),
            deviceId: value
        }
        HttpPA({
            method: 'GET',
            url: '/learner/common-list',
            params: data
        })
            .then(response => {
                if (response.request.status === 200) {
                    let resData = JSON.parse(response.request._response);
                    console.log('GetLearnerList')
                    console.log(resData[0].learners)
                    dispatch(setLearnerInfo(resData[0]));
                    let learnerList = resData[0].learners
                    if (learnerList.length > 0) {
                        if (JSON.stringify(list) !== JSON.stringify(learnerList)) {
                            /*저장된 학습자 리스트랑 다를때*/
                            for (let i=0; i<learnerList.length; i++) {
                                let name
                                if (learnerList[i].login_id) {
                                    name = learnerList[i].learner_name + '(' + learnerList[i].login_id + ')';
                                } else {
                                    name = learnerList[i].learner_name;
                                }
                                learnerList[i].label = name;
                                learnerList[i].value = name;
                            }
                            dispatch(setLearner(learnerList));
                            setList(learnerList);
                            RNSecureKeyStore.get('ddangkongLearner')
                                .then((res) => {
                                    /*선택된 학습자가 있을때*/
                                    SetLearnerKeyStore(learnerList, res);
                                    GetMyClass(learnerList[res]);
                                }, (err) => {
                                    /*선택된 학습자가 없을때*/
                                    SetLearnerKeyStore(learnerList, 0);
                                    setPlayClass([])
                                });
                        }
                    } else {
                        dispatch(setLearner(learnerList));
                        setList(learnerList);
                        SetLearnerKeyStore(learnerList, 0);
                        setPlayClass([]);
                    }
                }
            })
            .catch(error => {
                ErrorSetPA(error, props.navigation);
            })
    }, [list]);

    const SetLearnerKeyStore = useCallback((data, index) => {
        if (data.length > 0) {
            let learnerDefault = {
                name: data[index].value,
                index: index
            }
            dispatch(setLearnerSelect(learnerDefault));
        } else {
            let learnerDefault = {
                name: '학습자 없음',
                index: 0
            }
            dispatch(setLearnerSelect(learnerDefault));
        }
    }, [list]);

    /*다음 수업 가져오기*/
    const GetMyClass = useCallback((value) => {
        if (value) {
            let data = {
                learnerId: value.learner_id
            }
            Http({
                method: 'GET',
                url: '/api/myclass/getMyclassByLearner',
                params: data
            })
                .then(response => {
                    if (response.request.status === 200) {
                        let resData = JSON.parse(response.request._response);
                        console.log('GetMyClass', resData)
                        setPlayClass(resData);
                    }
                })
                .catch(error => {
                    ErrorSet(error);
                })
        } else {
            setPlayClass([]);
        }
    }, [learner_select]);

    useEffect(() => {
        setPurchase(false);
        PostProductionsList();
    }, []);

    /*제품 목록 가져오기*/
    const PostProductionsList = useCallback(() => {
        let version = VersionCheck.getCurrentVersion();
        let data = {
            appVersion: version.trim(),
            storeId: StoreName
        }
        Http({
            method: 'POST',
            data: data,
            url: '/InApp/InAppProductList'
        })
            .then(response => {
                if (response.request.status === 200) {
                    let result = JSON.parse(response.request._response)
                    if (result.length !== 0) {
                        setPurchase(true);
                    }
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, []);

    return (
        <>
            <SafeAreaView style={[Style.SafeAreaView]}>
                <StatusBar hidden={true} />
                <View style={Style.headerWrap}>
                    <MyLogoText />
                    <MySetting navigation={props.navigation} />
                    <View style={Style.wideWrap}>
                        {
                            playClass !== null?
                                <>
                                    <MyTitle title={t('play.title')} />
                                    {
                                        playClass.length > 0 ?
                                            <PlayList list={playClass[0]}
                                                      navigation={props.navigation}/>
                                            :
                                            <PlayNull navigation={props.navigation}
                                                      purchase={purchase}/>
                                    }
                                </>
                                :
                                null
                        }
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
});

export default PlayScreen;
