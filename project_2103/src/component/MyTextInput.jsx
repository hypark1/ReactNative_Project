import React, { memo } from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import Colors from "~/styles/Colors";
import Fonts from "~/styles/Fonts";

/*기본 인풋*/
const MyTextInput = (props) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <TextInput style={[styles.input, props.style]}
                       placeholder={props.placeholder}
                       value={props.value}
                       maxLength={props.maxLength}
                       onChangeText={props.onChangeText}
                       secureTextEntry={props.secureTextEntry}
                       keyboardType={props.keyboardType} //keyboardType : default, number-pad, email-address, url
                       placeholderTextColor={Colors.input}
                       multiline={props.multiline}
                       numberOfLines={props.numberOfLines}
                       textAlignVertical={props.textAlignVertical}
                       editable={props.editable}
                       autoCapitalize={props.autoCapitalize? props.autoCapitalize : 'none'} //자동대문자
                       underlineColorAndroid="transparent" //밑줄없애기
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: Colors.input,
        borderRadius: 50,
        fontSize: Fonts.size.sm,
        color: Colors.text,
        textAlign: 'center',
        backgroundColor: Colors.white
    }
});

export default memo(MyTextInput);
