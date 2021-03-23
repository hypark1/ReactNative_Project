import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MyTextButton from "~/component/MyTextButton";
import MyImg from "~/component/MyImg";
import Style from "~/styles/Style";

/*기본 체크박스*/
const MyCheckBox = (props) => {
    return (
        <>
            <TouchableOpacity activeOpacity={1}
                              onPress={props.onPress}>
                <View style={styles.container}>
                    {
                        props.value ?
                            <MyImg src={require('~/assets/images/checkbox_on.png')}
                                   style={Style.DinoChkImg} />
                            :
                            <MyImg src={require('~/assets/images/checkbox.png')}
                                   style={Style.DinoChkImg} />
                    }
                    <View>
                        <MyTextButton text={props.text}
                                      onPress={props.onPress}
                                      style={styles.chkText}
                                      size={'xs'}
                                      weight={'5'} />
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    chkText: {
        marginLeft: 5,
    },
});

export default memo(MyCheckBox);
