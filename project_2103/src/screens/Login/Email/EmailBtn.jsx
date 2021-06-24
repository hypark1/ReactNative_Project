import React, {memo, useContext, useCallback} from 'react';
import {StyleSheet, View, Alert, Keyboard, Platform} from 'react-native';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import {useDispatch} from 'react-redux';
import {setLoad} from '~/actions';
import I18n from '~/locales/I18n';
import LinkingSet from '~/modules/LinkingSet';
import HttpPA from '~/modules/HttpPA';
import ErrorSetPA from '~/modules/ErrorSetPA';
import ValidationEmail from '~/modules/ValidationEmail';
import GetDevice from '~/modules/GetDevice';
import MyTextButton from '~/component/MyTextButton';
import MyButton from '~/component/MyButton';
import MyAlert from '~/component/MyAlert';
import EmailContext from '~/screens/Login/Email/EmailContext';
import Colors from '~/styles/Colors';
import Style from "~/styles/Style";
import MyText from "../../../component/MyText";

const {t} = I18n;

const LinkArr = {
  findId: 'https://hodooenglish.com/account/find-id',
  findPw: 'https://hodooenglish.com/account/find-pw',
  agree: 'https://hodooenglish.com/account/join/agreement',
};

const EmailBtn = (props) => {
  const {id, password, handleId, handlePassword} = useContext(EmailContext);
  const dispatch = useDispatch();

  const ClickLink = useCallback((value) => {
    LinkingSet(LinkArr[value]);
  }, []);

  /*id, pw 검증*/
  const LoginValidation = useCallback(() => {
    let message;
    if (id.trim() === '') {
      /*아이디 없음*/
      message = t('validation.id.null');
    } else {
      if (password.trim() === '') {
        /*비밀번호 없음*/
        message = t('validation.pw.null');
      } else {
        /*아이디, 비밀번호 둘다 있음*/
        let val = ValidationEmail(id);
        if (!val) {
          /*이메일 형식이 아닐때*/
          message = t('validation.id.email');
        } else {
          /*이메일 형식이 맞을때*/
          SetLogin();
          return;
        }
      }
    }
    MyAlert(message);
  }, [id, password]);

    const SetLogin = useCallback(() => {
        dispatch(setLoad(true));
        const data = {
            login_id: id.trim(),
            password: password.trim()
        };
        HttpPA({
            method: 'POST',
            data: data,
            url: '/auth/login'
        })
            .then(response => {
                if (response.request.status === 200) {
                    /*로그인 타입 저장*/
                    RNSecureKeyStore.set('ddangkongLoginType', 'HODOO', {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                    let user = {
                        auto: true,
                        token: response.request._response,
                        email: data.login_id
                    };
                    RNSecureKeyStore.set('ddangkongLogin', JSON.stringify(user), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
                        .then((res) => {
                            GetDevice();
                            setTimeout(() => {
                                dispatch(setLoad(false));
                                Keyboard.dismiss();
                                props.navigation.replace('LoginLearner');
                            }, 1000)
                        }, (err) => {
                            console.log(err)
                            dispatch(setLoad(false));
                        });
                }
            })
            .catch(error => {
                ErrorSetPA(error);
                dispatch(setLoad(false));
            })
    }, [id, password]);

    const SetFindBtn = (value) => {
    let dom = (
      <MyTextButton
        text={t('login.email.' + value.title)}
        onPress={() => ClickLink(value.title)}
        style={{flex: 1}}
        family={'NanumB'}
        color={'brown'}
        align={['middle', 'center']}
      />
    );
    return dom;
  };

    return (
        <>
            <View style={[{ marginTop: 5 }, styles.container]}>
                <MyButton text={t('login.email.signUp')}
                          type={'white'}
                          style={Style.btnMd}
                          onPress={() => ClickLink('agree')} />
                <View style={{flex: 0.2}} />
                <MyButton text={t('login.email.signIn')}
                          type={'primary'}
                          style={Style.btnMd}
                          onPress={() => LoginValidation()} />
            </View>
            {
                Platform.OS === 'android'?
                    <View style={[{marginTop: 10}, styles.container]}>
                        <SetFindBtn title={'findId'}/>
                        <View style={styles.findBarBox}>
                            <View style={styles.findBar}/>
                        </View>
                        <SetFindBtn title={'findPw'}/>
                    </View>
                    :
                    <MyText text={t('login.email.iosComment')}
                            align={'center'} />
            }
        </>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  findBarBox: {
    flex: 0.2,
    marginTop: 10,
    alignItems: 'center',
  },
  findBar: {
    width: 1.2,
    height: 18,
    backgroundColor: Colors.brown,
    marginTop: -9,
  },
});

export default memo(EmailBtn);
