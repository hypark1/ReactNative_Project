import React, { memo, useState, useCallback } from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useSelector} from "react-redux";
import Http from "~/modules/Http";
import ErrorSet from "~/modules/ErrorSet";
import AnalyticsSet from "~/modules/AnalyticsSet";
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyButton from "~/component/MyButton";
import MyAlert from "~/component/MyAlert";
import MissionSelectDom from "~/screens/Modal/Mission/MissionSelectDom";
import MissionCreateGift from "~/screens/Modal/Mission/MissionCreateGift";
import Colors from "~/styles/Colors";

const { t } = I18n;

const timeArr = [10, 20, 30];
const dateArr = [1, 3, 5];
const giftArr = [35001104, 35001105, 35001106];

const MissionCreateView = (props) => {
    const [time, setTime] = useState(0);
    const [date, setDate] = useState(0);
    const [num, setNum] = useState(0);
    const [gift, setGift] = useState('호두M 선물상자');
    const learner_name = useSelector((store) => store.reducer.learner_name);

    /*학습 시간 선택시*/
    const SetTimeClick = useCallback((idx) => {
        setTime(idx);
    }, []);

    /*학습 기간 선택시*/
    const SetDateClick = useCallback((idx) => {
        setDate(idx);
    }, []);

    /*완료 버튼 선택시*/
    const SubmitMission = useCallback(() => {
        Alert.alert(t('alert.title'), t('mission.create.alert.start'), [
                { text: t('alert.no'), },
                { text: t('alert.ok'),
                    onPress: () => PostMission()
                }
            ],
            { cancelable: false }
        );
    }, [date, time]);

    /*챌린지 만들기*/
    const PostMission = useCallback(() => {
        AnalyticsSet('click', 'Challange_Create_Complete');
        let data = {
            'challenge_code': 1,
            'challenge_items': [
                {
                    'item_name': 'Challenge Complete Box',
                    'item_uid': giftArr[date],
                    'stack_count': date + 1
                }
            ],
            'character_id': learner_name.subscriptions[0].game_character_id,
            'target_count': dateArr[date],
            'target_study_time': timeArr[time] * 60
        }
        Http({
            method: 'POST',
            url: '/mission',
            data: data
        })
            .then(response => {
                if (response.request.status === 204) {
                    props.change(num + '12345');
                    let val = num;
                    val += 1;
                    setNum(val);
                    setTimeout(() => {
                        MyAlert(t('mission.create.alert.done'));
                    }, 500)
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, [date, time])

    return (
        <>
            <View style={styles.container}>
                <MissionSelectDom text={t('mission.create.time')}
                               type={'time'}
                               value={time}
                               onPress={SetTimeClick}
                               arr={timeArr}/>
                <MissionSelectDom text={t('mission.create.date')}
                               type={'date'}
                               value={date}
                               onPress={SetDateClick}
                               arr={dateArr}/>
                <MissionCreateGift />
                <View style={styles.resultBox}>
                    <MyText text={t('mission.create.result1', { time: timeArr[time], date: dateArr[date] })}
                            size={'lg'}
                            weight={'7'}
                            color={'primary'} />
                    <MyText text={t('mission.create.result2', { gift: gift })}
                            size={'lg'}
                            weight={'7'}
                            color={'primary'}
                            style={styles.text} />
                </View>
                <MyButton text={t('mission.create.submit')}
                          type={'primary'}
                          onPress={SubmitMission} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: Colors.white
    },
    resultBox: {
        alignItems: 'center',
        padding: 20,
        marginVertical: 30,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 7
    },
    text: {
        marginTop: 5
    }
})

export default memo(MissionCreateView);
