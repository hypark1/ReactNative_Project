import React, { memo } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import Colors from "~/styles/Colors";

const { t } = I18n;

/*챌린지 만들기 선물상자*/
const MissionCreateGift = (props) => {
    return (
        <>
            <View style={styles.container}>
                <MyText text={t('mission.create.gift')}
                        size={'lg'}
                        weight={'7'}
                        color={Colors.black}
                        style={styles.title} />
                <MyText text={t('mission.create.giftSub')}
                        weight={'5'}
                        style={styles.subtitle} />
                <View style={styles.giftBox}>
                    <TouchableOpacity activeOpacity={1}
                                      style={styles.leftBox}>
                        <MyImg src={require('~/assets/images/mission_slide_left.png')}
                               style={styles.arrowImg}
                               resizeMode={'contain'} />
                    </TouchableOpacity>
                    <View style={styles.giftImgBox}>
                        <MyImg src={require('~/assets/images/mission_gift.png')}
                               style={styles.giftImg}
                               resizeMode={'contain'} />
                    </View>
                    <TouchableOpacity activeOpacity={1}
                                      style={styles.rightBox}>
                        <MyImg src={require('~/assets/images/mission_slide_right.png')}
                               style={styles.arrowImg}
                               resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    title: {
        marginBottom: 5,
        marginTop: 20
    },
    subtitle: {
        marginBottom: 20
    },
    giftBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftBox: {
        flex: 2
    },
    arrowImg: {
        width: 30,
        height: 30
    },
    giftImgBox: {
        flex: 3,
        alignItems: 'center'
    },
    giftImg: {
        width: 160,
        height: 160
    },
    rightBox: {
        flex: 2,
        alignItems: 'flex-end'
    }
})

export default memo(MissionCreateGift);
