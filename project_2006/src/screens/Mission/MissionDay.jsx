import React, { memo } from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";

const MissionDay = (props) => {
    return (
        <>
            <TouchableOpacity activeOpacity={1}
                              onPress={props.onPress}>
                <MyImg src={props.complete >= props.idx ? require('~/assets/images/mission_going_dayOn.png') : props.src}
                       style={styles.dayImg} />
                {
                    props.dayToolTip === props.idx?
                        <View style={styles.tooltipBox}>
                            <MyImg src={require('~/assets/images/mission_tooltip_top.png')}
                                   style={styles.tooltipTop} />
                            <View>
                               <MyImg src={require('~/assets/images/mission_tooltip_bot.png')}
                                      style={styles.tooltipBot} />
                                      <View style={[styles.tooltipBot, styles.tooltipTxt]}>
                                          <MyText text={props.text}
                                                  size={'xs'}
                                                  weight={'6'}
                                                  color={'white'} />
                                      </View>
                            </View>
                        </View>
                        :
                        null
                }
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    dayImg: {
        width: 80,
        height: 80,
        marginHorizontal: 15
    },
    tooltipBox: {
        position: 'absolute',
        top: 80,
        left: -30
    },
    tooltipImg: {
        width: 170,
        height: 50,
        alignItems: 'center'
    },
    tooltipTop: {
        width: 170,
        height: 5
    },
    tooltipBot: {
        width: 170,
        height: 23
    },
    tooltipTxt: {
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default memo(MissionDay);
