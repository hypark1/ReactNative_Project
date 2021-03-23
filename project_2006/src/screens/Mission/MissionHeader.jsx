import React, { memo } from 'react';
import {StyleSheet, View } from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";

const { t } = I18n;

/*진행중인 챌린지 상단*/
const MissionHeader = (props) => {
    return (
        <>
            <View>
                <MyImg src={require('~/assets/images/mission_going_title.png')}
                       style={styles.titleBackground}
                       resizeMode={'stretch'} />
                <View style={styles.titleBox}>
                    <MyText text={t('mission.going.result', { time: (props.time)/60, date: props.date})}
                            size={'lg'}
                            weight={'7'}
                            color={'primary'}
                            style={styles.title}/>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    titleBackground: {
        width: '100%',
        height: 50
    },
    titleBox: {
        position: 'absolute',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default memo(MissionHeader);
