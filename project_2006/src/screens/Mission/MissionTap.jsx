import React, { memo, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import Colors from "~/styles/Colors";

const { t } = I18n;

const tapArr = [t('mission.going.title'), t('mission.done.title') ];

/*챌린지 상단탭*/
const MissionTap = (props) => {
    const SetMissionTapDom = useCallback(() => {
        let dom = tapArr.map((item, idx) => {
            return (
                <TouchableOpacity activeOpacity={1}
                                  key={idx}
                                  style={[styles.tap, { backgroundColor: props.tapVisible[idx]? Colors.white : Colors.background }]}
                                  onPress={() => props.onPress(idx)}>
                    <MyText text={item}
                            size={'xm'}
                            color={props.tapVisible[idx]? 'primary' : 'text'}
                            weight={props.tapVisible[idx]? '7': '4'}/>
                </TouchableOpacity>
            )
        });
        return dom;
    }, [props.tapVisible]);

    return (
        <>
            <View style={styles.tapBox}>
                <View style={styles.tapWrap}>
                    {SetMissionTapDom()}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    tapBox: {
        justifyContent: 'center',
    },
    tapWrap: {
        flexDirection: 'row'
    },
    tap: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    }
})

export default memo(MissionTap);
