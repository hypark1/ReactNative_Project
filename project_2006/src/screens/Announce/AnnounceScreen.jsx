import React from 'react';
import { SafeAreaView } from 'react-native';
import I18n from "~/locales/I18n";
import MyHeader from "~/component/MyHeader";
import AnnounceList from "~/screens/Announce/AnnounceList";
import Style from "~/styles/Style";

const { t } = I18n;

/*공지사항 화면*/
const AnnounceScreen = (props) => {
    return (
        <>
            <SafeAreaView style={Style.SafeAreaView}>
                <MyHeader title={t('menu.announce')} navigation={props.navigation} />
                <AnnounceList navigation={props.navigation} />
            </SafeAreaView>
        </>
    )
};

export default AnnounceScreen;
