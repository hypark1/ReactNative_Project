import React, { memo, useState, useCallback } from 'react';
import {StyleSheet, View } from 'react-native';
import I18n from "~/locales/I18n";
import MissionDay from "~/screens/Mission/MissionDay";

const { t } = I18n;

/*챌린지 진행 상태*/
const MissionStatus = (props) => {
    const [dayToolTip, setDayToolTip] = useState(null);

    /*날짜 클릭시*/
    const ClickDay = useCallback((value) => {
        if (dayToolTip === value) {
            /*클릭된한거 다시 클릭*/
            setDayToolTip(null);
        } else if (props.value.completed_dates.length >= value) {
            /*완료된 날짜*/
            setDayToolTip(value);
        }
    }, [dayToolTip, props.value]);

    /*챌린지 보상 dom*/
    const SetMissionDayDom = useCallback((value) => {
        let completeArr = props.value.completed_dates;
        let text = ''
        if (completeArr.length > 0) {
            /*완료한 날짜 있을 때*/
            if (completeArr.length >= value.idx) {
                /*지정된 보상 횟수보다 완료된 날짜*/
                let complete = completeArr[value.idx-1];
                text = complete.challenge_date + ' ~' + Math.floor((complete.study_time)/60) + t('mission.time')
            }
        }
            return (
                <MissionDay idx={value.idx}
                            text={text}
                            complete={completeArr.length}
                            dayToolTip={dayToolTip}
                            onPress={ClickDay.bind(this, value.idx)}
                            src={value.src} />
            )
    }, [dayToolTip, props.value]);

    /*챌린지 보상 - 1회*/
    const SetDayOne = useCallback(() => {
        return (
            <View style={styles.dayOne}>
                <SetMissionDayDom idx={1} src={require('~/assets/images/mission_going_day01.png')} />
            </View>
        )
    }, [dayToolTip, props.value]);

    /*챌린지 보상 - 3회*/
    const SetDayThree = useCallback(() => {
        return (
            <View style={styles.dayThree}>
                <SetMissionDayDom idx={1} src={require('~/assets/images/mission_going_day01.png')} />
                <SetMissionDayDom idx={2} src={require('~/assets/images/mission_going_day02.png')} />
                <SetMissionDayDom idx={3} src={require('~/assets/images/mission_going_day03.png')} />
            </View>
        )
    }, [dayToolTip, props.value]);

    /*챌린지 보상 - 5회*/
    const SetDayFive = useCallback(() => {
        return (
            <>
                <SetDayThree />
                <View style={styles.dayThree}>
                    <SetMissionDayDom idx={4} src={require('~/assets/images/mission_going_day04.png')} />
                    <SetMissionDayDom idx={5} src={require('~/assets/images/mission_going_day05.png')} />
                </View>
            </>
        )
    }, [dayToolTip, props.value]);

    /*챌린지 보상 dom 체크*/
    const SetDay = useCallback(() => {
        let dom;
        let dateCount = props.value.target_count;
        /*챌린지 목표 날짜*/
        if (dateCount === 1) {
            dom = (
                <SetDayOne />
            )
        } else if (dateCount === 3) {
            dom = (
                <SetDayThree />
            )
        } else if (dateCount === 5) {
            dom = (
                <SetDayFive />
            )
        }
        return dom;
    }, [dayToolTip, props.value]);

    return (
        <>
            { SetDay() }
        </>
    );
};

const styles = StyleSheet.create({
    dayOne: {
        paddingVertical: 30,
        alignItems: 'center'
    },
    dayThree: {
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'center'
    },
})

export default memo(MissionStatus);
