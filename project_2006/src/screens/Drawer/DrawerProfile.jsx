import React, { memo, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from "react-native";
import {useDispatch, useSelector} from "react-redux";
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import { setLearner, setLearnerName, setDeviceId } from '~/actions'
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import GetDevice from "~/modules/GetDevice";
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyImgButton from "~/component/MyImgButton";
import MyImg from "~/component/MyImg";
import DrawerPicker from "~/screens/Drawer/DrawerPicker";
import Colors from "~/styles/Colors";

const { t } = I18n;

const DrawerProfile = () => {
    const [list, setList] = useState([]);
    const [name, setName] = useState('');
    const [day, setDay] = useState('');
    const [img, setImg] = useState(null);
    const [index, setIndex] = useState(null);
    const [point, setPoint] = useState(null);
    const [value, setValue] = useState(null);
    const coupon = useSelector((store) => store.reducer.coupon);
    const push = useSelector((store) => store.reducer.push);
    const dispatch = useDispatch();

    useEffect(() => {
        GetDevice().then(() => {
            getDeviceId();
        });
    }, [coupon]); // 이용권 등록시에 다시 학습자 리스트 불러와야해서

    /*디바이스 아이디 가져오기*/
    const getDeviceId = useCallback(() => {
        RNSecureKeyStore.get('GSP_ID')
            .then((res) => {
                if (res !== null) {
                    const id = Number(res);
                    dispatch(setDeviceId(id));
                    getLearnerList(id)
                }
            }, (err) => {
                console.log(err);
            });
    }, []);

    /*학습자 리스트 가져오기*/
    const getLearnerList = useCallback((value) => {
        let data = {
            deviceId: value
        }
        Http({
            method: 'GET',
            url: '/learner/list',
            params: data
        })
            .then(response => {
                if (response.request.status === 200) {
                    let resData = JSON.parse(response.request._response);
                    if (JSON.stringify(list) !== JSON.stringify(resData)) {
                        for (let i=0; i<resData.length; i++) {
                            if (resData[i].gamified_service_id === 1) {
                                resData[i].learner_name += '(PC)'
                            } else if (resData[i].gamified_service_id === 2) {
                                resData[i].learner_name += '(M)'
                            }
                        }
                        dispatch(setLearner(resData));
                        setList(resData);
                        if (resData.length > 0) {
                            getLearnerSave(resData);
                        } else {
                            setDay(t('profile.null'));
                            setImg(require('~/assets/images/profile_dino.jpg'));
                        }
                    } else {
                        setDay(t('profile.null'));
                        setImg(require('~/assets/images/profile_dino.jpg'));
                    }
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, [list]);

    /*선택했던 학습자 있을때 설정*/
    const getLearnerSave = useCallback((value) => {
        RNSecureKeyStore.get('GSP_Learner')
            .then((res) => {
                if (res !== '') {
                    let idx = 0;
                    let data = JSON.parse(res);
                    let user = value.filter((item, index) => {
                        if (item.learner_name === data.learner_name) {
                            idx = index;
                            return item
                        }
                    })
                    setIndex(idx);
                    if (user) {
                        if (user.length > 0) {
                            setProfileData(user, 0);
                            RNSecureKeyStore.set('GSP_Learner', JSON.stringify(user[0]), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                            setPoint(true);
                            return;
                        }
                    }
                }
                setProfileData(value, 0);
                RNSecureKeyStore.set('GSP_Learner', JSON.stringify(value[0]), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
                setPoint(true);
            }, (err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (push !== null) {
            setValue(push)
        }
        if (value !== null && point && list.length > 0) {
            let user = list.filter((item, index) => {
                return Number(item.learner_id) === Number(value.learner_id)
            });
            if (user.length > 0) {
                let last = user.filter((item, index) => {
                    return Number(item.gamified_service_id) === Number(value.gamified_service_id)
                });
                setProfileData(last, 0);
                RNSecureKeyStore.set('GSP_Learner', JSON.stringify(last[0]), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY});
            }
        }
    }, [point, push, list, value]);

    /*학습자 변경하기*/
    const ChangeUser = useCallback((index) => {
        setProfileData(list, index);
        RNSecureKeyStore.set('GSP_Learner', JSON.stringify(list[index]), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
    }, [list]);

    /*이용권 남은 기간 체크*/
    const setProfileData = useCallback((list, index) => {
        setName(list[index].learner_name);
        dispatch(setLearnerName(list[index]));

        let next_order_date = list[index].next_order_date;
        let subscriptions = list[index].subscriptions;
        let subscriptionsLength = list[index].subscriptions.length;
        if (subscriptionsLength >0) {
            /*이용권*/
            let days = subscriptions[subscriptionsLength -1].end_date;
            if (days) {
                if (next_order_date) {
                    /*구독*/
                    setDay(t('profile.end', { day: days }) + '\n' + t('profile.next', { day: next_order_date }));
                } else {
                    /*구독X*/
                    setDay(t('profile.end', { day: days }));
                }
            } else {
                /*구독*/
                setDay(t('profile.next', { day: next_order_date }));
            }
        } else {
            /*이용권X*/
            if (next_order_date) {
                /*구독*/
                setDay(t('profile.next', { day: next_order_date }));
            } else {
                /*구독X*/
                setDay(t('profile.none'));
            }
        }

        if (list[index].gender ==='여자') {
            setImg(require('~/assets/images/profile_w.jpg'));
        } else if (list[index].gender ==='남자') {
            setImg(require('~/assets/images/profile_m.jpg'));
        } else {
            setImg(require('~/assets/images/profile_dino.jpg'));
        }
    }, [list]);

    const SetNameDom = useCallback(() => {
        let dom = list.length > 0 ?
            <MyText text={name}
                    size={'xl'}
                    color={'white'}
                    weight={'5'} />
            :
            null
        return dom;
    }, [list, name]);

    const SetChangeBtn = useCallback(() => {
        let dom = list.length > 1 ?
            <MyImgButton src={require('~/assets/images/btn_change.png')}
                         style={styles.icon} />
            :
            null
        return dom;
    }, [list])

    const SetPickerDom = useCallback(() => {
        let dom = list.length > 1 ?
            <DrawerPicker list={list}
                          selectedValue={name}
                          onValueChange={ChangeUser}
                          getLearnerList={getDeviceId}/>
            :
            null
        return dom;
    }, [list, name])

    return (
        <>
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.profileImgBox}>
                        <MyImg src={img}
                               style={styles.profileImg}
                               resizeMode={'contain'} />
                    </View>
                    <View style={styles.profileText}>
                        { SetNameDom() }
                        { SetChangeBtn() }
                    </View>
                    <MyText text={day}
                            style={styles.profileDay}
                            size={'xs'}
                            color={'white'}
                            weight={'3'} />
                </View>
                { SetPickerDom() }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingVertical: 35
    },
    box: {
        alignItems: 'center',
    },
    profileImgBox: {
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: Colors.white
    },
    profileImg: {
        height: 70,
        width: 70,
    },
    profileText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    profileDay: {
        marginTop: 5,
        lineHeight: 18
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 3,
    }
});

export default memo(DrawerProfile);
