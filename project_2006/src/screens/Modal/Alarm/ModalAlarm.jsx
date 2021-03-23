import React, { memo } from 'react';
import { Modal, View } from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import ModalClose from "~/screens/Modal/ModalClose";
import AlarmList from "~/screens/Modal/Alarm/AlarmList";
import Style from "~/styles/Style";

const { t } = I18n;

const ModalAlarm = (props) => {
    return (
        <>
            <Modal animationType="fade"
                   transparent={false}
                   visible={props.visible}
                   onRequestClose={props.onPress}>
                <View style={[Style.header, Style.headerWhite]}>
                    <View style={Style.headerTitle}>
                        <MyText text={t('alarm.title')}
                                size={'lg'}
                                weight={'6'}
                                color={'primary'}
                                align={'center'} />
                    </View>
                    <View style={Style.headerRight}>
                        <ModalClose onPress={props.onPress} />
                    </View>
                </View>
                <AlarmList />
            </Modal>
        </>
    );
};

export default memo(ModalAlarm);
