import React, { memo, useCallback } from 'react';
import {View, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import MyImgButton from "~/component/MyImgButton";
import LinkingSet from "~/modules/LinkingSet";
import AnalyticsSet from "~/modules/AnalyticsSet";
import Colors from "~/styles/Colors";

const snsList = [
    {
        title: 'Blog',
        icon: require('~/assets/images/menu_sns_blog.png'),
        url: 'https://blog.naver.com/hodooenglish'
    },
    {
        title: 'Instagram',
        icon: require('~/assets/images/menu_sns_instagram.png'),
        url: 'https://www.instagram.com/hodooenglish/'
    },
    {
        title: 'Facebook',
        icon: require('~/assets/images/menu_sns_facebook.png'),
        url: 'https://www.facebook.com/hodooenglish/'
    },
    {
        title: 'Youtube',
        icon: require('~/assets/images/menu_sns_youtube.png'),
        url: 'https://www.youtube.com/channel/UC_c0reJ1pfS3flQ09b_1-6w'
    },
];

const DrawerSNS = () => {
    const route = useSelector((store) => store.reducer.route);

    /*SNS버튼 클릭시*/
    const ClickSns = useCallback((value) => {
        AnalyticsSet('click', route + '_2Menu_2' + value.title + '_Click');
        LinkingSet(value.url);
    }, [route]);

    return (
        <>
            <View style={styles.container}>
                {
                    snsList.map((v, i) => {
                        return (
                            <View key={v.title}
                                  style={styles.iconBox}>
                            <MyImgButton src={v.icon}
                                         style={styles.icon}
                                         onPress={ClickSns.bind(this, v)} />
                            </View>
                        )
                    })
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: Colors.line,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    iconBox: {
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50
    }
});

export default memo(DrawerSNS);
