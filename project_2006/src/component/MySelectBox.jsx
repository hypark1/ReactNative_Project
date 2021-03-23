import React, {memo, useRef} from 'react';
import {TouchableOpacity, StyleSheet } from "react-native";
import ReactNativePickerModule from "react-native-picker-module"
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import Colors from "~/styles/Colors";

/*기본 셀렉트박스*/
const MySelectBox = (props) => {
    const myRef = useRef();

    return (
        <>
            <TouchableOpacity activeOpacity={1}
                              style={styles.container}
                              onPress={() => myRef.current.show()}>
                <MyText text={props.value}
                        size={'xs'}
                        weight={'5'}/>
                <MyImg src={require('~/assets/images/icon_select.png')}
                       style={{ width: 10, height: 10 }} />
            </TouchableOpacity>
            <ReactNativePickerModule pickerRef={myRef}
                                     items={props.list}
                                     value={props.value}
                                     onValueChange={props.onPress} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingVertical: 13,
        paddingHorizontal: 15,
        marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.line,
        borderRadius: 5
    }
})

export default memo(MySelectBox);
