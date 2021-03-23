import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from "react-redux";
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import Colors from "~/styles/Colors";

const { t } = I18n;

/*챌린지 상단 학습자 정보*/
const MissionLearner = (props) => {
    const learner_name = useSelector((store) => store.reducer.learner_name);

    return (
        <>
            <View style={styles.container}>
                    <MyText text={t('mission.learner') + ' - ' + learner_name.learner_name}
                            size={'xm'}
                            color={'white'} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: Colors.dark
    },
});

export default memo(MissionLearner);
