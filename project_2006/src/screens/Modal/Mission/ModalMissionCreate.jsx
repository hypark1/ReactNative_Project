import React, { memo } from 'react';
import {Modal, View, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import ModalClose from "~/screens/Modal/ModalClose";
import MissionLearner from "~/screens/Mission/MissionLearner";
import MissionCreateView from "~/screens/Modal/Mission/MissionCreateView";
import Style from "~/styles/Style";
import Colors from "~/styles/Colors";

const { t } = I18n;

/*챌린지 만들기 팝업*/
const ModalMissionCreate = (props) => {
    return (
        <>
            <Modal animationType="fade"
                   transparent={false}
                   visible={props.visible}
                   onRequestClose={props.onPress}>
                <SafeAreaView style={Style.SafeAreaView}>
                <View style={[Style.header, Style.headerWhite]}>
                    <View style={Style.headerTitle}>
                        <MyText text={t('mission.create.title')}
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
                    <MissionCreateView change={props.change}/>
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
    missionBtn: {
        borderWidth: 2,
        borderColor: Colors.line,
        borderRadius: 5,
        paddingHorizontal: 25,
        paddingVertical: 7
    }
})

export default memo(ModalMissionCreate);
