import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  View,
  Dimensions,
  Alert,
  Text, ToastAndroid, BackHandler,
} from 'react-native';
// import MyText from '~/component/MyText';
import {WebView} from 'react-native-webview';
import {
  PERMISSIONS,
  requestMultiple,
  checkMultiple,
  RESULTS,
} from 'react-native-permissions';
import {ForceTouchGestureHandler} from 'react-native-gesture-handler';
import I18n from "~/locales/I18n";
import Colors from "~/styles/Colors";
import MyAlert from "../../component/MyAlert";

const { t } = I18n;

const INJECTED_JAVASCRIPT = `
const meta = document.createElement('meta'); meta.setAttribute('content', 'initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
(function() {
  window.NativeInfo = { 
          deviceInfo: {
                os: 'Android'
          }
  }
})();`;
const playUrl =
    'https://dev-player.minischool.co.kr/tvclient/fKXIVr6AwDvlVU8lSof57c44d9ff8bc8400ea886ddb4bbc2bd78?lang=ko&furl=https%3A%2F%2Fwww.hodooenglish.com%2Fhodootv';

const VideoScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [back, setBack] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      props.navigation.navigate('PlayVideoIOS', {playUrl: props.route.params.playUrl.student_url})
    }
  },[props.route.params]);

  const backPressed = useCallback(() => {
    if (props.navigation.isFocused()) {
      if (Platform.OS === 'android') {
        Alert.alert(t('alert.title'), '학습을 종료하시겠습니까?', [
              { text: t('alert.no')},
              { text: t('alert.ok'),
                onPress: () => props.navigation.replace('PlayList'),
              }
            ],
            { cancelable: false }
        );
      }
      return true;
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backPressed);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backPressed);
    }
  }, []);

  return (
      <View style={{flex: 1, backgroundColor: Colors.black}}>
        {Platform.OS == 'android' && (
            <WebView
                style={{
                  width: '100%',
                  overflow: 'hidden',
                  justifyContent: 'center',
                  backgroundColor: 'gray',
                  flexGrow: 1,
                }}
                nativeConfig={{
                  props: {
                    webContentsDebuggingEnabled: true,
                  },
                }}
                source={{uri: props.route.params.playUrl.student_url}}
                javaScriptEnabled={true}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                scalesPageToFit={true}
                allowUniversalAccessFromFileURLs={true}
                mediaPlaybackRequiresUserAction={false}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={(event) => {
                  const jsonEvent = JSON.parse(event.nativeEvent.data);
                  if (jsonEvent.command && jsonEvent.command == 'goHome') {
                    if (!back) {
                      setBack(true);
                      ToastAndroid.show(t('alert.classExit'), ToastAndroid.SHORT);
                    } else {
                      props.navigation.goBack();
                      setBack(false);
                    }
                  }
                }}
                onLoadStart={() => setLoading(false)}
                onLoadEnd={() => setLoading(false)}
            />
        )}
      </View>
  );
};

const styles = StyleSheet.create({});

export default VideoScreen;
