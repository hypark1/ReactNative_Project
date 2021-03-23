import React, { memo, useState, useCallback } from 'react';
import {StyleSheet, View, ScrollView, Alert, RefreshControl} from 'react-native';
import {useSelector} from "react-redux";
import I18n from "~/locales/I18n";
import AnalyticsSet from "~/modules/AnalyticsSet";
import MyText from "~/component/MyText";
import MyButton from "~/component/MyButton";
import MyImg from "~/component/MyImg";
import MyAlert from "~/component/MyAlert";
import ModalMissionCreate from "~/screens/Modal/Mission/ModalMissionCreate";
import Colors from "~/styles/Colors";

const { t } = I18n;

/*챌린지 만들기 버튼*/
const MissionCreateBtn = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const learner_name = useSelector((store) => store.reducer.learner_name);

    /*챌린지 새로고침*/
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        props.refresh();
        setTimeout(() => {
            setRefreshing(false);
        }, 700);
    }, []);

    /*챌린지 만들기 팝업 열기*/
    const OpenModal = useCallback(() => {
        if (learner_name.gamified_service_id === 1) {
            /*호두PC 학습자*/
            MyAlert(t('mission.create.alert.pc'));
        } else if (learner_name.subscriptions.length === 0 || learner_name.subscriptions[0].game_character_id === null) {
            /*이용권 등록X 학습자*/
            MyAlert(t('mission.create.alert.coupon'));
        } else {
            AnalyticsSet('screen', 'Challange_Create_PV');
            setModalVisible(true);
        }
    }, [learner_name]);

    /*챌린지 만들기 팝업 닫기*/
    const CloseModal = useCallback(() => {
        Alert.alert(t('alert.title'), t('mission.create.alert.no'), [
                { text: t('alert.no'), },
                { text: t('alert.ok'),
                    onPress: () => setModalVisible(false)
                }
            ],
            { cancelable: false }
        );
    }, []);

    /*챌린지 만들기 내부 dom*/
    const SetDom = useCallback(() => {
        let dom = (
            <>
                <MyImg src={require('~/assets/images/mission_null_cont.jpg')}
                       style={styles.nullImg}
                       resizeMode={'contain'} />
                <MyText text={t('mission.' + props.type + '.null1')}
                        size={'xl'}
                        weight={'7'}
                        color={Colors.black}/>
                {
                    props.type === 'going' || (props.type === 'done' && !props.going.cancleable_flag) ?
                        /*현재 화면이 진행중인 챌린지이거나, 현재화면이 완료된 챌린지이고, 진행중인 챌린지가 없을때*/
                        <>
                            <MyText text={t('mission.going.null2')}
                                    size={'xm'}
                                    weight={'5'}
                                    style={styles.text}/>
                            <MyButton text={t('mission.create.title')}
                                      type={'primary'}
                                      onPress={OpenModal}/>
                            <ModalMissionCreate visible={modalVisible}
                                                onPress={CloseModal}
                                                change={props.change} />
                        </>
                        :
                        null
                }
            </>
        )
        return dom;
    }, [props.type, props.change, props.going, learner_name, modalVisible]);

    /*챌린지 만들기 화면 dom*/
    let SetCreateDom = useCallback(() => {
        let id = learner_name.gamified_service_id;
        let dom;
        if (id === 2) {
            /*호두M 학습자*/
            dom = (
                <ScrollView contentContainerStyle={styles.container}
                            refreshControl={
                                <RefreshControl refreshing={refreshing}
                                                onRefresh={onRefresh} />
                            }>
                    <SetDom />
                </ScrollView>
            )
        } else {
            /*호두PC 학습자*/
            dom = (
                <View style={styles.container}>
                    <SetDom />
                </View>
            )
        }
        return dom;
    }, [learner_name, refreshing, modalVisible]);

    return (
        <>
            {SetCreateDom()}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    nullImg: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    text: {
        marginTop: 7,
        marginBottom: 40
    }
})

export default memo(MissionCreateBtn);
