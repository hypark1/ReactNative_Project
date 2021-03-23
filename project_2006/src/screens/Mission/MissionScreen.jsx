import React, { useState, useCallback, useEffect } from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useSelector} from "react-redux";
import I18n from "~/locales/I18n";
import Http from "~/modules/Http";
import ErrorSet from "~/modules/ErrorSet";
import AnalyticsSet from "~/modules/AnalyticsSet";
import MyHeader from "~/component/MyHeader";
import MyAlert from "~/component/MyAlert";
import MissionLearner from "~/screens/Mission/MissionLearner";
import MissionTap from "~/screens/Mission/MissionTap";
import MissionGoing from "~/screens/Mission/MissionGoing";
import MissionDone from "~/screens/Mission/MissionDone";
import MissionLearnerNo from "~/screens/Mission/MissionLearnerNo";
import Style from "~/styles/Style";
import Colors from "~/styles/Colors";

const { t } = I18n;

/*챌린지 화면*/
const MissionScreen = (props) => {
    const [tapVisible, setTapVisible] = useState([true, false]);
    const [pv, setPv] = useState(true);
    const [going, setGoing] = useState(null);
    const [check, setCheck] = useState(0);
    const [done, setDone] = useState(null);
    const learner_name = useSelector((store) => store.reducer.learner_name);
    const route = useSelector((store) => store.reducer.route);

    useEffect(() => {
        if (learner_name && route === 'Challange') {
            /*학습자가 있고, 챌린지 화면일때*/
            AnalyticsSet('screen', 'Challange_PV');
        }
    }, [learner_name, route]);

    useEffect(() => {
        if (learner_name && route === 'Challange') {
            /*학습자가 있고, 챌린지 화면일때*/
            if (learner_name.subscriptions.length > 0) {
                /*이용권이 있을때*/
                if (learner_name.subscriptions[0].game_character_id && learner_name.subscriptions[0].gamified_service_id === 2) {
                    /*게임을 했고, 그게 호두M일때*/
                    GetMissionGoing();
                    GetMissionDone();
                    return;
                }
            }
            /*이용권X 학습자*/
            setGoing({});
            setDone([]);
        } else {
            setPv(true);
        }
    }, [learner_name, route, check]);

    /*상단탭 클릭시*/
    const tapClick = useCallback((val) => {
        if (val === 0) {
            AnalyticsSet('click', 'Challange_Ongoing_Click');
        } else if (val === 1) {
            AnalyticsSet('click', 'Challange_Completed_Click');
        }
        let visible = [false, false];
        visible[val] = true;
        setTapVisible(visible);
    }, []);

    /*진행중인 챌린지 가져오기*/
    const GetMissionGoing = useCallback(() => {
        let subscriptions = learner_name.subscriptions;
        if (subscriptions.length > 0) {
            /*이용권있을때*/
            let id = subscriptions[0].game_character_id;
            if (id && subscriptions[0].gamified_service_id === 2) {
                /*게임을 했고, 그게 호두M일때*/
                let data = {
                    characterid: id
                }
                Http({
                    method: 'GET',
                    url: '/mission/ongoing',
                    params: data
                })
                    .then(response => {
                        if (response.request.status === 200) {
                            console.log(response.request._response)
                            let res = JSON.parse(response.request._response);
                            if (JSON.stringify(going) !== JSON.stringify(res)) {
                                /*저장된 정보와 지금 받아온 정보가 다를때*/
                                setGoing(res);
                            }
                        }
                    })
                    .catch(error => {
                        ErrorSet(error);
                    })
            }
        }

    }, [learner_name, going]);

    /*챌린지 취소*/
    const PostCancel = useCallback(() => {
        let data = {
            challengeid: going.hdm_challenge_id,
            characterid: learner_name.subscriptions[0].game_character_id
        }
        Http({
            method: 'DELETE',
            url: '/mission',
            params: data
        })
            .then(response => {
                if (response.request.status === 204) {
                    setCheck(going.hdm_challenge_id + '12345');
                    MyAlert(t('mission.going.cancel.ok'));
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, [going, check]);

    /*챌린지 등록, 취소 시점 체크*/
    const ChangeCheck = useCallback((value) => {
        setCheck(value);
    }, []);

    /*완료된 챌린지 가져오기*/
    const GetMissionDone = useCallback(() => {
        let subscriptions = learner_name.subscriptions;
        if (subscriptions.length > 0) {
            /*이용권있을때*/
            let id = subscriptions[0].game_character_id;
            if (id && subscriptions[0].gamified_service_id === 2) {
                /*게임을 했고, 그게 호두M일때*/
                let data = {
                    characterid: learner_name.subscriptions[0].game_character_id
                }
                Http({
                    method: 'GET',
                    url: '/mission/completed',
                    params: data
                })
                    .then(response => {
                        if (response.request.status === 200) {
                            let res = JSON.parse(response.request._response);
                            setDone(res);
                        }
                    })
                    .catch(error => {
                        ErrorSet(error);
                    })
            }
        }
    }, [learner_name]);

    return (
        <>
            <SafeAreaView style={Style.SafeAreaView}>
                <MyHeader title={t('menu.mission')} navigation={props.navigation} />
                {
                    learner_name?
                        /*학습자 있을때*/
                        <>
                            <MissionLearner />
                            <MissionTap tapVisible={tapVisible}
                                        onPress={tapClick} />
                            <View style={styles.container}>
                                {
                                    tapVisible[0]?
                                        /*진행중인 챌린지*/
                                        <MissionGoing value={going}
                                                      change={ChangeCheck}
                                                      cancel={PostCancel}
                                                      refresh={GetMissionGoing}/>
                                        :
                                        /*완료한 챌린지*/
                                        <MissionDone value={done}
                                                     going={going}
                                                     change={ChangeCheck}
                                                     refresh={GetMissionDone}/>
                                }
                            </View>
                        </>
                        :
                        /*학습자 없을때*/
                        <MissionLearnerNo />
                }
            </SafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
});

export default MissionScreen;
