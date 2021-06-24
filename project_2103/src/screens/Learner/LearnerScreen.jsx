import React, {useEffect, useState, useCallback} from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import RNSecureKeyStore from "react-native-secure-key-store";
import Orientation from 'react-native-orientation-locker';
import {setDeviceId, setLearner, setLearnerInfo, setLearnerSelect, setLearnerInsert} from "~/actions";
import I18n from "~/locales/I18n";
import HttpPA from "~/modules/HttpPA";
import ErrorSetPA from "~/modules/ErrorSetPA";
import MyBack from "~/component/MyBack";
import MyTitle from '~/component/MyTitle';
import MyNull from "~/component/MyNull";
import LearnerSelect from '~/screens/Learner/LearnerSelect';
import Style from '~/styles/Style';
import Colors from '~/styles/Colors';

const { t } = I18n;

const LearnerScreen = (props) => {
    const [list, setList] = useState([]);
    const learner = useSelector((store) => store.reducer.learner);
    const learner_insert = useSelector((store) => store.reducer.learner_insert);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            Orientation.lockToLandscape()
        }, 1000)
    }, []);

    useEffect(() => {
        getDeviceId();
    }, [learner_insert]);

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
    }, [learner_insert]);

    /*학습자 리스트 가져오기*/
    const GetLearnerList = useCallback((value) => {
        let data = {
            appId: t('appID'),
            deviceId: value
        }
        console.log('LearnerScreenGetLearnerList')
        console.log(data)
        HttpPA({
            method: 'GET',
            url: '/learner/common-list',
            params: data
        })
            .then(response => {
                if (response.request.status === 200) {
                    let resData = JSON.parse(response.request._response);
                    console.log(resData)
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
                            if (learner_insert > 0) {
                                //dispatch(setLearnerInsert(0));
                                SetLearnerKeyStore(learnerList, learnerList.length -1);
                            } else {
                                RNSecureKeyStore.get('ddangkongLearner')
                                    .then((res) => {
                                        /*선택된 학습자가 있을때*/
                                        SetLearnerKeyStore(learnerList, res);
                                    }, (err) => {
                                        /*선택된 학습자가 없을때*/
                                        SetLearnerKeyStore(learnerList, 0);
                                    });
                            }
                        }
                    } else {
                        dispatch(setLearner(learnerList));
                        setList(learnerList);
                        SetLearnerKeyStore(learnerList, 0);
                    }
                }
            })
            .catch(error => {
                ErrorSetPA(error);
            })
    }, [list, learner_insert]);

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

    return (
        <>
            <SafeAreaView style={[Style.SafeAreaView, styles.container]}>
                <View style={Style.headerWrap}>
                    <MyBack navigation={props.navigation} />
                    <View style={Style.ScreenWrap}>
                        <MyTitle title={t('learner.title')}
                                 sub={t('learner.sub')} />
                        <View style={styles.viewBox}>
                            {
                                learner !== null ?
                                    <>
                                        {
                                            learner.length > 0 ?
                                                <LearnerSelect navigation={props.navigation}/>
                                                :
                                                <>
                                                    <View style={{marginTop: -10, marginBottom: 15}}>
                                                        <MyNull text1={t('learner.null.text1')}
                                                                style={Style.btnSm} />
                                                    </View>
                                                    <LearnerSelect navigation={props.navigation}/>
                                                </>
                                        }
                                    </>
                                    :
                                    null
                            }
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background_orange
    },
    viewBox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
});

export default LearnerScreen;
