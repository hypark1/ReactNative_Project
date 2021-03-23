import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import Colors from "~/styles/Colors";

const { t } = I18n;

/*학습자가 없을때 챌린지 화면*/
const MissionLearnerNo = (props) => {
    return (
        <>
            <View style={styles.container}>
                <MyImg src={require('~/assets/images/mission_null_cont.jpg')}
                       style={styles.nullImg}
                       resizeMode={'contain'} />
                <MyText text={t('mission.learnerNo')}
                        size={'xl'}
                        weight={'7'}
                        color={Colors.black}/>
                <MyText text={t('mission.create.alert.pc')}
                        size={'xm'}
                        weight={'5'}
                        style={styles.text}/>
            </View>
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

export default memo(MissionLearnerNo);
