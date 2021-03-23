import React, { memo, useCallback } from 'react';
import {View, StatusBar, StyleSheet, Platform} from 'react-native';
import {useSelector} from "react-redux";
import AnalyticsSet from "~/modules/AnalyticsSet";
import MyEnv from "~/component/MyEnv";
import MyText from "~/component/MyText";
import MyImgButton from "~/component/MyImgButton";
import Colors from "~/styles/Colors";
import Style from "~/styles/Style";

/*상단 헤더*/
const MyHeader = (props) => {
    const route = useSelector((store) => store.reducer.route);

    const OpenDrawer = useCallback(() => {
        /*메뉴열기*/
        props.navigation.openDrawer();
        /*애널리틱스 클릭 이벤트 추가*/
        AnalyticsSet('click', route + '_2Menu_Click');
    }, [route]);

    return (
        <>
            <StatusBar barStyle={Platform.OS === 'android'? 'light-content' : 'dark-content'}
                       backgroundColor={Colors.primary} />
            <View style={[Style.header, Style.headerPrimary]}>
                <MyEnv />
                <View style={Style.headerLeft}>
                    <MyImgButton src={require('~/assets/images/header_btn_menu.png')}
                                 style={[styles.icon, styles.menuIcon]}
                                 onPress={OpenDrawer} />
                </View>
                <View style={Style.headerTitle}>
                    <MyText text={props.title}
                            size={'lg'}
                            weight={'6'}
                            color={'white'}
                            align={'center'} />
                </View>
                <View style={Style.headerRight}>
                    {/*<MyHeaderAlarm />*/}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32,
    },
    menuIcon: {
        marginLeft: 9
    },
    alarmIcon: {
        marginRight: 9
    },
    alarmNew: {
        width: 22,
        height: 22,
        backgroundColor: Colors.white,
        position: 'absolute',
        top: 0,
        right: -8,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.primary,
        justifyContent: 'center'
    },
})

export default memo(MyHeader);
