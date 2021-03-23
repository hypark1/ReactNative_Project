import React, { useState, memo, useCallback, useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import RNSecureKeyStore from "react-native-secure-key-store";
import { useDispatch, useSelector } from "react-redux";
import { setPush } from '~/actions'
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import ModalAlarm from "~/screens/Modal/Alarm/ModalAlarm";
import Colors from "~/styles/Colors";

const MyHeaderAlarm = (props) => {
    const [alarmVisible, setAlarmVisible] = useState(false);
    const type = useSelector((store) => store.reducer.push);
    const dispatch = useDispatch();

    useEffect(() => {
        RNSecureKeyStore.get('GSP')
            .then((res) => {
                if (JSON.parse(res).token !== null) {
                    if (type === 'alarm') {
                        setAlarmVisible(true);
                        dispatch(setPush(null));
                    } else if (type !== null) {
                        props.navigation.navigate('Chunk');
                    }
                } else {
                    props.navigation.replace('Login');
                }
            }, (err) => {
                console.log(err);
            });
    }, [type]);

    const OpenAlarm = useCallback(() => {
        setAlarmVisible(true);
    }, []);

    const CloseAlarm = useCallback(() => {
        setAlarmVisible(false);
    }, []);

    return (
        <>
            <ModalAlarm visible={alarmVisible}
                        onPress={CloseAlarm}/>
            <TouchableOpacity activeOpacity={1}
                              style={styles.alarmIcon}
                              onPress={OpenAlarm}>
                <MyImg src={require('~/assets/images/header_btn_alarm.png')}
                             style={[styles.icon]} />
                <View style={styles.alarmNew}>
                    <MyText text={'4'}
                            size={'xxxs'}
                            color={'primary'}
                            align={'center'}
                            weight={'6'} />
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32,
    },
    alarmIcon: {
        marginRight: 9
    },
    alarmNew: {
        width: 22,
        height: 22,
        backgroundColor: Colors.white,
        position: 'absolute',
        top: 0,
        right: -8,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.primary,
        justifyContent: 'center'
    },
})

export default memo(MyHeaderAlarm);
