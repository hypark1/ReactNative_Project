import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import VersionCheck from "react-native-version-check";
import I18n from "~/locales/I18n";
import MyText from '~/component/MyText';
import MyTextButton from '~/component/MyTextButton';
import Colors from '~/styles/Colors';
import Style from '~/styles/Style';

const { t } = I18n;

const SettingContents = (props) => {
    const [type, setType] = useState('');
    const [version, setVersion] = useState('');
    const [learnerEmail, setLearnerEmail] = useState('');
    const learner_info = useSelector((store) => store.reducer.learner_info);
    const learner_select = useSelector((store) => store.reducer.learner_select);

    useEffect(() => {
        RNSecureKeyStore.get('ddangkongLoginType')
            .then((res) => {
                setType(t('login.sns.listKr')[res]);
            }, (err) => {
                console.log(err);
                props.navigation.navigate('Login');
            });
        RNSecureKeyStore.get('ddangkongLogin')
            .then((res) => {
                setLearnerEmail(JSON.parse(res).email);
            }, (err) => {
                console.log(err);
                props.navigation.navigate('Login');
            });
            setVersion(VersionCheck.getCurrentVersion())
    }, []);

  return (
      <>
          <View style={Style.w100}>
              <TouchableOpacity activeOpacity={1}
                                style={[styles.textBox, {marginBottom: 30}]}
                                onPress={() => props.navigation.navigate('Learner')} >
                  <MyText text={learner_select? learner_select.name : '학습자 없음'}
                          size={'sm'} />
                  <MyText text={t('setting.learnerBtn')}
                                family={'NanumB'}
                                size={'sm'}
                                style={{position: 'absolute', right: 0}} />
              </TouchableOpacity>
              <View style={styles.textBox}>
                  <MyText text={t('setting.version', { version: version })}
                          size={'sm'} />
              </View>
              <View style={styles.loginBox}>
                  <MyText text={t('setting.login.0', {sns: type})} />
                  {
                      learner_info?
                          <MyText text={learner_info.login_id? '(' + learner_info.login_id + ')' : ''}
                                  color={'red'} />
                                  :
                          null
                  }
                  <MyText text={t('setting.login.1')} />
                  <View style={Style.dot} />
              </View>
          </View>
      </>
  );
};

const styles = StyleSheet.create({
    textBox: {
        flexDirection: 'row',
        borderBottomWidth: 0.8,
        borderColor: Colors.text,
        paddingLeft: 8,
        paddingBottom: 10,
    },
    loginBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 13
    }
});

export default memo(SettingContents);
