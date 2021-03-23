import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import MyImg from "~/component/MyImg";

/*챌린지 선물박스*/
const MissionGift = (props) => {
    return (
        <>
            <View>
                <MyImg src={require('~/assets/images/mission_gift_arrow.png')}
                       style={styles.arrow}
                       resizeMode={'contain'} />
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: 160, height: 200 }}>
                        <MyImg src={require('~/assets/images/mission_gift.png')}
                               style={styles.giftImg}
                               resizeMode={'contain'} />
                        {
                            props.type === 'done' ?
                                /*완료한 챌린지에서*/
                                <View style={styles.stampBox}>
                                    <MyImg src={require('~/assets/images/mission_stamp.png')}
                                           style={styles.stamp}
                                           resizeMode={'contain'} />
                                </View>
                                :
                                null
                        }
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    arrow: {
        width: '100%',
        height: 60
    },
    giftImg: {
        width: 160,
        height: 160,
        marginVertical: 30
    },
    stampBox: {
        position: 'absolute',
        top: 5,
        left: 125
    },
    stamp: {
        width: 130,
        height: 130
    }
})

export default memo(MissionGift);
