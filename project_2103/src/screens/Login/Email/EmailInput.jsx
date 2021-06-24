import React, {memo,useContext} from 'react';
import { StyleSheet } from 'react-native';
import I18n from "~/locales/I18n";
import MyTextInput from '~/component/MyTextInput';
import EmailContext from '~/screens/Login/Email/EmailContext';

const { t } = I18n;

const EmailInput = (props) => {
    const { id, password, handleId, handlePassword } = useContext(EmailContext);

    return (
        <>
            <MyTextInput placeholder={t('login.email.placeholder.id')}
                         value={id}
                         onChangeText={handleId}
                         keyboardType="email-address" />
            <MyTextInput placeholder={t('login.email.placeholder.password')}
                         value={password}
                         onChangeText={handlePassword}
                         secureTextEntry={true} />
        </>
  );
};

const styles = StyleSheet.create({
});

export default memo(EmailInput);
