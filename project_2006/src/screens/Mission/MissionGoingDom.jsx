import React, { memo, useState, useCallback } from 'react';
import {StyleSheet, ScrollView, View, Alert, RefreshControl} from 'react-native';
import I18n from "~/locales/I18n";
import MyButton from "~/component/MyButton";
import MyAlert from "~/component/MyAlert";
import MyText from "~/component/MyText";
import MissionHeader from "~/screens/Mission/MissionHeader";
import MissionStatus from "~/screens/Mission/MissionStatus";
import MissionGift from "~/screens/Mission/MissionGift";

const { t } = I18n;

/*진행중인 챌린지 있을때 내부*/
const MissionGoingDom = (props) => {
    const [refreshing, setRefreshing] = useState(false);

    /*새로고침*/
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        props.refresh();
        setTimeout(() => {
            setRefreshing(false);
        }, 700);
    }, []);

    /*취소하기 클릭시*/
    const SubmitCancel = useCallback(() => {
        if (props.value.cancleable_flag === 'y') {
            /*취소 가능*/
            Alert.alert(t('alert.title'), t('mission.going.cancel.confirm'), [
                    { text: t('alert.no'), },
                    { text: t('alert.ok'),
                        onPress: () => props.onPress()
                    }
                ],
                { cancelable: false }
            );
        } else {
            /*취소 불가능*/
            MyAlert(t('mission.going.cancel.no'));
        }
    }, []);

    return (
        <>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing}
                                                          onRefresh={onRefresh} /> }>
                <View style={styles.goingBox}>
                    <MissionHeader time={props.value.target_study_time}
                                   date={props.value.target_count}/>
                    <View style={styles.setDayBox}>
                        <MissionStatus value={props.value} />
                    </View>
                    <MissionGift type={props.value.challenge_status === 2 ? 'done' : 'no'}/>
                    {
                        props.value.challenge_status === 2 && props.value.reward_receive_flag === 'n' ?
                            /*챌린지 완료, 보상X*/
                            <View style={styles.goingReward}>
                                <MyText text={t('mission.going.reward')}
                                        align={'center'}/>
                            </View>
                            :
                            null
                    }
                    <MyButton text={t('mission.going.cancel.title')}
                              type={props.value.cancleable_flag === 'y' ? 'primary': 'gray'}
                              onPress={SubmitCancel}/>
                    {
                        props.value.cancleable_flag === 'n' ?
                            /*챌린지 취소 불가*/
                            <MyText text={t('mission.going.cancel.text')}
                                    size={'xs'}
                                    color={'primary'}
                                    weight={'6'}
                                    align={'center'}
                                    style={{ margin: 10 }} />
                            :
                            null
                    }
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    goingBox: {
        padding: 30
    },
    setDayBox: {
      paddingVertical: 20
    },
    goingReward: {
        marginBottom: 25,
        marginTop: -10
    }
})

export default memo(MissionGoingDom);
