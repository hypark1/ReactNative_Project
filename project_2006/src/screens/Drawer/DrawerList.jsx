import React, { memo, useCallback } from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { setRoute } from '~/actions'
import AnalyticsSet from "~/modules/AnalyticsSet";
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import Colors from "~/styles/Colors";

const { t } = I18n;

const MenuAndroid = [
    { title: t('menu.chunk'), icon: require('~/assets/images/menu_chunk.png'), route: 'Chunk' },
    { title: t('menu.report'), icon: require('~/assets/images/menu_report.png'), route: 'Report' },
    { title: t('menu.mission'), icon: require('~/assets/images/menu_mission.png'), route: 'Challange' },
    { title: t('menu.coupon'), icon: require('~/assets/images/menu_coupon.png'), route: 'Coupon' },
    /*{ title: t('menu.link'), icon: require('~/assets/images/menu_link.png'), route: 'Link' },*/
    { title: t('menu.announce'), icon: require('~/assets/images/menu_announce.png'), route: 'Announce' },
    { title: t('menu.review'), icon: require('~/assets/images/menu_review.png'), route: 'Review' },
];

const MenuIos = [
    { title: t('menu.chunk'), icon: require('~/assets/images/menu_chunk.png'), route: 'Chunk' },
    { title: t('menu.report'), icon: require('~/assets/images/menu_report.png'), route: 'Report' },
    { title: t('menu.mission'), icon: require('~/assets/images/menu_mission.png'), route: 'Challange' },
    /*{ title: t('menu.coupon'), icon: require('~/assets/images/menu_coupon.png'), route: 'Coupon' },*/
    /*{ title: t('menu.link'), icon: require('~/assets/images/menu_link.png'), route: 'Link' },*/
    /*{ title: t('menu.announce'), icon: require('~/assets/images/menu_announce.png'), route: 'Announce' },*/
    { title: t('menu.review'), icon: require('~/assets/images/menu_review.png'), route: 'Review' },
];

let menuList = Platform.OS === 'android' ? MenuAndroid : MenuIos;

/*메뉴 리스트*/
const DrawerList = (props) => {
    const route = useSelector((store) => store.reducer.route); // 현재화면이름
    const dispatch = useDispatch();

    /*메뉴 클릭시*/
    const ClickMenu = useCallback((value) => {
        AnalyticsSet('click', route + '_2Menu_2' + value + '_Click');
        /*클릭한 화면으로 이동*/
        props.navigation.navigate(value);
        /*클릭한 화면이름 저장*/
        dispatch(setRoute(value));
    }, [route]);

    /*리스트 dom*/
    const listDom = useCallback((v) => {
        let dom = (
            <TouchableOpacity activeOpacity={1}
                              style={styles.menuBox}
                              onPress={ClickMenu.bind(this, v.route)}>
                <MyImg src={v.icon}
                       style={styles.icon} />
                <MyText text={v.title}
                        size={'md'} />
            </TouchableOpacity>
        );
        return dom;
    }, [route]);

    /*메뉴 리스트 map*/
    const setList = useCallback(() => {
        if (menuList.length > 0) {
            return (
                menuList.map((v, i) => {
                    return (
                        <View key={v.title}>
                            { listDom(v) }
                        </View>
                    )
                })
            )
        }
    }, [route]);

    return (
        <>
            { setList() }
        </>
    );
};

const styles = StyleSheet.create({
    menuBox: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: Colors.line,
        alignItems: 'center',
        paddingLeft: 20,
        height: 65
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 15
    }
});

export default memo(DrawerList);
