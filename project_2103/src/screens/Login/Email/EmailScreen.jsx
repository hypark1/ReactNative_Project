import React, {useState, useCallback, useEffect} from 'react';
import { SafeAreaView, StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import I18n from "~/locales/I18n";
import MyTitle from '~/component/MyTitle';
import MyBack from '~/component/MyBack';
import LoadScreen from '~/screens/LoadScreen';
import EmailInput from '~/screens/Login/Email/EmailInput';
import EmailContext from '~/screens/Login/Email/EmailContext';
import EmailBtn from '~/screens/Login/Email/EmailBtn';
import Style from '~/styles/Style';

const { t } = I18n;

const EmailScreen = (props) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setId('');
        setPassword('');
    }, []);

    /*id, pw 입력값 저장*/
    const HandleId = useCallback((value) => {
        setId(value);
    }, []);

    const HandlePassword = useCallback((value) => {
        setPassword(value);
    }, []);

    return (
        <>
            <LoadScreen />
            <SafeAreaView style={Style.SafeAreaView}>
                <EmailContext.Provider value={{ id: id, password: password, handleId: HandleId, handlePassword: HandlePassword }}>
                    <View style={Style.headerWrap}>
                        <MyBack navigation={props.navigation} />
                        <KeyboardAvoidingView behavior={Platform.OS === 'android'? null : 'padding'}
                                              keyboardVerticalOffset={null}
                                              style={Style.keyboard}
                                              enabled>
                            <View style={Style.ScreenWrap}>
                                <MyTitle title={t('login.email.title')}
                                         sub={t('login.email.sub')} />
                                <EmailInput />
                                <EmailBtn navigation={props.navigation} />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </EmailContext.Provider>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
});

export default EmailScreen;
