import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import RNSecureKeyStore from "react-native-secure-key-store";
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import I18n from "~/locales/I18n";
import ResetStore from "~/modules/ResetStore";
import MyButton from "~/component/MyButton";
import DrawerClose from "~/screens/Drawer/DrawerClose";
import DrawerProfile from "~/screens/Drawer/DrawerProfile";
import DrawerList from "~/screens/Drawer/DrawerList";
import DrawerSNS from "~/screens/Drawer/DrawerSNS";

const { t } = I18n;

/*좌측 메뉴*/
const DrawerScreen = (props) => {
    /*로그아웃 확인 알럿*/
    const LogOutConfirm = () => {
        Alert.alert(t('alert.title'), t('alert.logOut'), [
                { text: t('alert.no'), },
                { text: t('alert.ok'),
                    onPress: () => PostLogOut(),
                }
            ],
            { cancelable: false }
        );
    };

    /*로그아웃*/
    const PostLogOut = () => {
        RNSecureKeyStore.get('GSP_ID')
            .then((res) => {
                if (res !== null) {
                    /*저장했던 deviceid가 있을때*/
                    const id = Number(res);
                    let data = {
                        deviceid: id
                    }
                    Http({
                        method: 'POST',
                        params: data,
                        url: '/auth/logout'
                    })
                        .then(response => {
                            if (response.request.status === 204) {
                                props.navigation.replace('Login');
                                ResetStore();
                                CloseDrawer();
                            }
                        })
                        .catch(error => {
                            ErrorSet(error);
                        })
                }
            }, (err) => {
                console.log(err);
            });
    };

    /*메뉴 닫기*/
    const CloseDrawer = () => {
        props.navigation.closeDrawer();
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <DrawerProfile />
                <DrawerClose onPress={CloseDrawer} />
                <ScrollView>
                    <DrawerList navigation={props.navigation} />
                    <View style={styles.logOutBox}>
                        <MyButton text={t('logOut')}
                                  type={'white'}
                                  size={'xs'}
                                  weight={'4'}
                                  border={1}
                                  onPress={LogOutConfirm}
                                  style={styles.logOutBtn}/>
                    </View>
                    <DrawerSNS />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    snsIcon: {
        width: 50,
        height: 50
    },
    logOutBox: {
        padding: 15
    },
    logOutBtn: {
        height: 35
    }
});

export default DrawerScreen;
