import React, { memo } from 'react';
import {View, StyleSheet} from 'react-native';
import I18n from "~/locales/I18n";
import LinkingSet from "~/modules/LinkingSet";
import MyButton from "~/component/MyButton";
import MyCheckBox from "~/component/MyCheckBox";
import LoginTextButton from "~/screens/Login/LoginTextButton";

const { t } = I18n;

const LinkArr = {
    findID: 'https://hodooenglish.com/account/find-id',
    findPW: 'https://hodooenglish.com/account/find-pw',
    agree: 'https://hodooenglish.com/account/join/agreement'
};

const ClickLink = (value) => {
    LinkingSet(LinkArr[value]);
}

/*로그인 버튼들*/
const LoginButtons = (props) => {
    return (
        <>
            <View style={styles.btnList}>
                <MyCheckBox text={t('autoLogin')}
                            value={props.autoIsOn}
                            onPress={props.AutoLoginChk} />
            </View>
            <MyButton text={t('login.title')}
                      type={'primary'}
                      onPress={props.LoginValidation}
                      style={styles.loginTitle} />
            <MyButton text={t('signUp')}
                      type={'gray'}
                      onPress={() => ClickLink('agree')} />
            <View style={styles.findBox}>
                <View style={styles.findBtn}>
                    <LoginTextButton text={t('findId')}
                                     onPress={() => ClickLink('findID')} />
                    <LoginTextButton text="|"
                                     style={styles.findBar} />
                    <LoginTextButton text={t('findPw')}
                                     onPress={() => ClickLink('findPW')} />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    btnList: {
        marginTop: -10,
        marginBottom: 20
    },
    findBox: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 8
    },
    findBtn: {
        flexDirection: 'row',
    },
    findBar: {
        marginLeft: 10,
        marginRight: 10
    },
    loginTitle: {
        marginBottom: 10
    }
});

export default memo(LoginButtons);
