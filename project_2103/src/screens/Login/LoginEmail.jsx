import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import I18n from "~/locales/I18n";
import MyImg from '~/component/MyImg';
import MyText from '~/component/MyText';
import Colors from '~/styles/Colors';
import ParentsPopup from "./Parents/ParentsPopup";

const { t } = I18n;

const LoginEmail = (props) => {
    const [parentsVisible, SetParentsVisible] = useState(false);

    const ClickEmail = useCallback(() => {
        ClosePopup();
        props.navigation.navigate('Email');
    }, []);

    const OpenPopup = useCallback(() => {
        SetParentsVisible(true);
    }, []);

    const ClosePopup = useCallback(() => {
        SetParentsVisible(false);
    }, []);

  return (
      <>
          {
              parentsVisible?
                  <ParentsPopup navigation={props.navigation} OpenPopup={OpenPopup} ClosePopup={ClosePopup} OpenLogin={ClickEmail} />
                  :
                  null
          }
          <TouchableOpacity activeOpacity={0.9}
                            style={styles.container}
                            onPress={() => OpenPopup()}>
              <MyImg src={require('~/assets/images/email_icon.png')}
                     style={styles.icon}/>
                     <MyText text={t('login.email.title')}
                             family={'NanumB'}
                             color={'orange'} />
          </TouchableOpacity>
      </>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.orange,
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginTop: 25
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10
    }
});

export default memo(LoginEmail);
