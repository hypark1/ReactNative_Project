import React, { memo } from 'react';
import {View, StyleSheet} from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyTextButton from "~/component/MyTextButton";
import Colors from "~/styles/Colors";

const { t } = I18n;

/*챌린지 만들기 팝업 - 시간, 날짜 선택 dom*/
const MissionSelectDom = (props) => {
    return (
        <>
            <View style={styles.container}>
                <MyText text={props.text}
                        size={'lg'}
                        weight={'7'}
                        color={Colors.black}
                        style={styles.title} />
                <View style={styles.selectBox}>
                    {
                        props.arr.map((item, index) => {
                            return (
                                <MyTextButton key={item}
                                              text={props.type === 'time' ? item + t('mission.time') : item + t('mission.date')}
                                              style={[styles.missionBtn, {
                                                  backgroundColor: props.value === index? Colors.white : Colors.background,
                                                  borderColor: props.value === index? Colors.primary : Colors.line
                                              }]}
                                              size={'lg'}
                                              weight={'6'}
                                              color={props.value === index? 'primary' : 'lightGray'}
                                              onPress={props.onPress.bind(this, index)}/>
                            )
                        })
                    }
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 0
    },
    title: {
        marginBottom: 20
    },
    selectBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    missionBtn: {
        flex: 1,
        marginHorizontal: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
        paddingVertical: 7
    }
})

export default memo(MissionSelectDom);
