import React, {memo, useCallback} from 'react';
import {Platform, Dimensions, SafeAreaView, StyleSheet, View, BackHandler} from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyButton from "~/component/MyButton";
import LinkingSet from "~/modules/LinkingSet";
import Colors from '~/styles/Colors';
import Style from '~/styles/Style';

const { t } = I18n;


const UpdatePopup = () => {
    const screenHeight = Dimensions.get('window').height;

    const GoStore = useCallback(() => {
        /*스토어로 이동*/
        BackHandler.exitApp();  // 앱 종료
        if (Platform.OS === 'android') {
            LinkingSet('https://play.google.com/store/apps/details?id=com.hodoolabs.ddangkong');
        } else {
            LinkingSet('https://apps.apple.com/us/app/doorhub-driver/1550862838');
        }
    }, []);

  return (
      <>
          <SafeAreaView style={[Style.SafeAreaView, styles.container, {height: screenHeight}]}>
              <View style={styles.popupBox}>
                  <MyText text={t('update.title')}
                          family={'GodoB'}
                          size={'lg'}
                          color={'brown'}/>
                  <MyText text={t('update.sub')}
                          size={'sm'}
                          align={'center'}
                          style={styles.sub}/>
                  <View style={[Style.btnBox, {width: '50%'}]}>
                      <MyButton text={t('update.btn')}
                                type={'primary'}
                                style={Style.btnMd}
                                onPress={() => GoStore()} />
                  </View>
              </View>
          </SafeAreaView>
      </>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    popupBox: {
        flex: 0.80,
        padding: 30,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    sub: {
        marginTop: 20,
        lineHeight: 20
    }
});

export default memo(UpdatePopup);
