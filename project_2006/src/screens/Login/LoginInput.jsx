import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from "~/locales/I18n";
import MyTextInput from '~/component/MyTextInput';

const { t } = I18n;

/*로그인 id,pw input*/
const LoginInput = (props) => {
    return (
        <>
            <View style={styles.inputBox}>
                <MyTextInput placeholder={t('placeholder.id')}
                             value={props.id}
                             onChangeText={props.handleId}
                             keyboardType="email-address" />
                <MyTextInput placeholder={t('placeholder.pw')}
                             value={props.password}
                             onChangeText={props.handlePassword}
                             secureTextEntry={true} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    inputBox: {
        alignItems: 'center',
        marginBottom: 10
    },
});

export default memo(LoginInput);
