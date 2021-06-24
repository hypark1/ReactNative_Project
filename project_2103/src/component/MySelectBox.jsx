import React, {memo} from 'react';
import {StyleSheet, View, Keyboard, Platform} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import Colors from "~/styles/Colors";
import Fonts from '~/styles/Fonts';

/*기본 셀렉트박스*/
const MySelectBox = (props) => {
    return (
        <>
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <RNPickerSelect value={props.value}
                                useNativeAndroidPickerStyle={false}
                                onOpen={() => { // 선택창이 열릴때
                                    Keyboard.dismiss(); //키보드 내림
                                }}
                                placeholder={{label: props.placeholder, value: null}}
                                onValueChange={(value, index) => props.onValueChange(value, index)}
                                items={props.items}
                                style={{
                                    placeholder: styles.placeholder,
                                    inputAndroid: styles.inputStyle,
                                    inputIOS: styles.inputStyle,
                                }}
                                Icon={() => {
                                    return <MyImg src={require('~/assets/images/select_icon.png')}
                                                  style={[styles.arrow, {top: Platform.OS === 'android'? 21: 17}]} />
                                }}/>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    inputBox: {
        borderWidth: 1,
        borderColor: Colors.input,
        borderRadius: 50,
        backgroundColor: Colors.white,
        paddingLeft: 15
    },
    valueText: {
        position: 'absolute',
        top: 19,
        left: 20
    },
    text: {
        fontFamily: Fonts.family.NanumR,
        color: Colors.text,
        fontSize: Fonts.size.sm,
    },
    arrow: {
        width: 13,
        height: 10,
        position: 'absolute',
        right: 20
    },
    placeholder: {
        fontFamily: Fonts.family.NanumR,
        color: Colors.input,
        fontSize: Fonts.size.sm,
    },
    inputStyle: {
        paddingVertical: 13,
        color: Colors.text
    },
})

export default memo(MySelectBox);
