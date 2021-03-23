import React, { memo } from 'react';
import { StyleSheet, TextInput } from "react-native";
import Colors from "~/styles/Colors";
import Fonts from "~/styles/Fonts";

/*기본 인풋*/
const MyTextInput = (props) => {
    return (
        <TextInput style={[styles.input, props.style]}
                   placeholder={props.placeholder}
                   value={props.value}
                   onChangeText={props.onChangeText}
                   secureTextEntry={props.secureTextEntry}
                   keyboardType={props.keyboardType} //keyboardType : default, number-pad, email-address, url
                   placeholderTextColor={Colors.gray}
                   multiline={props.multiline}
                   numberOfLines={props.numberOfLines}
                   textAlignVertical={props.textAlignVertical}
                   editable={props.editable}
                   autoCapitalize={props.autoCapitalize? props.autoCapitalize : 'none'} //자동대문자
                   underlineColorAndroid="transparent" //밑줄없애기
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        paddingLeft: 15,
        paddingVertical: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 5,
        fontSize: Fonts.size.md,
        fontFamily: Fonts.weight[5],
        color: Colors.text
    }
});

export default memo(MyTextInput);
