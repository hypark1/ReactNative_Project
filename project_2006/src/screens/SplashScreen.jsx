import React, { useEffect } from 'react';
import {SafeAreaView, StyleSheet, View, Dimensions, StatusBar, Platform} from 'react-native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import Http from '~/modules/Http';
import I18n from "~/locales/I18n";
import ResetStore from "~/modules/ResetStore";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import Colors from "~/styles/Colors";

const windowSize = Dimensions.get('window');
const imgWidth = (windowSize.width) /2;
const imgHeight = imgWidth /2;

const { t } = I18n;

const SplashScreen = (props) => {
    useEffect(() => {
        RNSecureKeyStore.get('GSP')
            .then((res) => {
                console.log('splash')
                console.log(res)
                let auto = JSON.parse((res)).auto
                setTimeout(() => {
                    if (res === null || !auto) {
                        ResetStore();
                        props.navigation.replace('Login');
                    } else if (auto) {
                        Http({
                            method: 'GET',
                            url: '/popup',
                        })
                            .then(response => {
                                props.navigation.navigate('Drawer');
                            })
                            .catch(error => {
                                if (error.request.status === 403) {
                                    ResetStore();
                                    props.navigation.replace('Login');
                                }
                            })
                    }
                }, 3500);
            }, (err) => {
                console.log(err);
                ResetStore();
                setTimeout(() => {
                    props.navigation.replace('Login');
                }, 3500);
            });
    }, []);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={Platform.OS === 'android'? 'light-content' : 'dark-content'}
                           backgroundColor={Colors.primary} />
                <View style={styles.logoBox}>
                    <MyImg src={require('~/assets/images/splash_logo.png')}
                           style={{ width: imgWidth, height: imgHeight }} />
                    {/*<MyText text={t('splash')}
                            size={'md'}
                            color={'black'}
                            style={styles.logoText} />*/}
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.splash,
        justifyContent: 'center',
    },
    logoBox: {
        width: '100%',
        alignItems: 'center'
    },
    logoText: {
        letterSpacing: 3,
        marginTop: 10
    }
});

export default SplashScreen;
