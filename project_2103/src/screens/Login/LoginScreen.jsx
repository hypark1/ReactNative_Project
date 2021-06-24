import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {useDispatch} from "react-redux";
import { setClassInterval } from '~/actions'
import I18n from "~/locales/I18n";
import MyLogo from '~/component/MyLogo';
import MyTitle from '~/component/MyTitle';
import LoginSNS from '~/screens/Login/LoginSNS';
import MyConfig from "~/component/MyConfig";
import LoginEmail from '~/screens/Login/LoginEmail';
import Colors from '~/styles/Colors';
import Style from '~/styles/Style';

const { t } = I18n;

const LoginScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        Orientation.lockToPortrait();
        dispatch(setClassInterval(true));
    }, []);

  return (
      <>
          <SafeAreaView style={[Style.SafeAreaView, styles.container]}>
              <MyConfig />
              <MyLogo />
              <MyTitle title={t('login.title')}
                       sub={t('login.sub')}
                       subColor={'brown'} />
              <LoginSNS navigation={props.navigation} />
              <LoginEmail navigation={props.navigation}/>
          </SafeAreaView>
      </>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background_orange,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default LoginScreen;
