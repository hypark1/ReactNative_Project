import React, { memo, useState, useEffect, useCallback } from 'react';
import {Modal, View, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {useSelector} from "react-redux";
import Http from "~/modules/Http";
import ErrorSet from "~/modules/ErrorSet";
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import ModalClose from "~/screens/Modal/ModalClose";
import MissionLearner from "~/screens/Mission/MissionLearner";
import MissionHeader from "~/screens/Mission/MissionHeader";
import MissionGift from "~/screens/Mission/MissionGift";
import MissionStatus from "~/screens/Mission/MissionStatus";
import Style from "~/styles/Style";
import Colors from "~/styles/Colors";

const { t } = I18n;
const sDay = 24 * 60 * 60 * 1000;

/*완료한 챌린지 상세보기 팝업*/
const ModalMissionView = (props) => {
    const [result, setResult] = useState(null);
    const learner_name = useSelector((store) => store.reducer.learner_name);

    useEffect(() => {
        if (props.visible) {
            /*완료한 챌린지 상세보기 열려있을 때*/
            GetMissionView();
        }
    }, [props.visible]);

    /*챌린지 상세 가져오기*/
    const GetMissionView = useCallback(() => {
        let data = {
            challengeid: props.id,
            characterid: learner_name.subscriptions[0].game_character_id
        }
        Http({
            method: 'GET',
            url: '/mission',
            params: data
        })
            .then(response => {
                if (response.request.status === 200) {
                    let res = JSON.parse(response.request._response);
                    setResult(res);
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, [learner_name, props.id]);

    /*학습한 날짜 계산*/
    const SetPlayDay = useCallback(() => {
        if (result) {
            /*챌린지 상세 정보 있을때*/
            let start = new Date(result.start_date);
            let end = new Date(result.end_date);
            let value = ((parseInt((start - end)/sDay))* (-1)) + 1;
            return result.start_date + ' ~ ' + result.end_date + ' (' + value + t('mission.date') + ')';
        }
    }, [result]);

    return (
        <>
            <Modal animationType="fade"
                   transparent={false}
                   visible={props.visible}
                   onRequestClose={props.onPress}>
                <SafeAreaView style={Style.SafeAreaView}>
                    <View style={[Style.header, Style.headerWhite]}>
                        <View style={Style.headerTitle}>
                            <MyText text={t('mission.done.title')}
                                    size={'lg'}
                                    weight={'6'}
                                    color={'primary'}
                                    align={'center'} />
                        </View>
                        <View style={Style.headerRight}>
                            <ModalClose onPress={props.onPress} />
                        </View>
                    </View>
                    <MissionLearner />
                    <ScrollView style={styles.viewWrap}>
                        {
                            result?
                                /*챌린지 상세 정보 있을때*/
                                <View style={styles.header}>
                                    <MissionHeader time={result.target_study_time}
                                                   date={result.target_count} />
                                    <View style={styles.playDayWrap}>
                                        <MyText text={SetPlayDay()}
                                                size={'xm'}
                                                weight={'5'}/>
                                    </View>
                                    <View style={styles.setDayBox}>
                                        <MissionStatus value={result} />
                                    </View>
                                    <MissionGift type={'done'}/>
                                </View>
                                :
                                null
                        }
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    viewWrap: {
        backgroundColor: Colors.white,
    },
    header: {
        backgroundColor: Colors.white,
        padding: 30
    },
    playDayWrap: {
        alignItems: 'center',
        marginTop: 15
    },
    setDayBox: {
        paddingBottom: 20
    },
})

export default memo(ModalMissionView);
