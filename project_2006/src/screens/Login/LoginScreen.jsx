import React, {useEffect, useState} from 'react';
import {ScrollView, View, SafeAreaView, StyleSheet, StatusBar, Platform} from 'react-native';
import {useDispatch} from "react-redux";
import { setLearner, setLearnerName } from '~/actions'
import MyEnv from "~/component/MyEnv";
import LoadScreen from '~/screens/LoadScreen';
import LoginHeader from "~/screens/Login/LoginHeader";
import LoginLogo from "~/screens/Login/LoginLogo";
import LoginSNS from "~/screens/Login/LoginSNS";
import ModalLogin from "~/screens/Modal/Login/ModalLogin";
import Colors from "~/styles/Colors";
import Style from "~/styles/Style";

/*로그인 화면*/
const LoginScreen = (props) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        /*학습자 리셋*/
        dispatch(setLearner([]));
        dispatch(setLearnerName(null));
    }, []);

    /*아이디로 로그인 팝업 열고 닫기*/
    const OpenModal = () => {
        setVisible(true);
    }

    const CloseModal = () => {
        setVisible(false);
    }

    return (
        <>
            <SafeAreaView style={[Style.SafeAreaView, styles.container]}>
                <StatusBar barStyle={Platform.OS === 'android'? 'light-content' : 'dark-content'}
                           backgroundColor={Colors.primary} />
                <MyEnv />
                <LoadScreen />
                <LoginHeader />
                <ScrollView>
                    <LoginLogo />
                    <View style={styles.formBox}>
                        <View style={{ flex: 1 }} />
                        <View style={{ flex: 11 }}>
                            <LoginSNS open={OpenModal}
                                      navigation={props.navigation} />
                        </View>
                        <View style={{ flex: 1 }} />
                    </View>
                </ScrollView>
                <ModalLogin visible={visible}
                            onPress={CloseModal}
                            navigation={props.navigation} />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white
    },
    formBox: {
        flexDirection: 'row',
        paddingBottom: 30,
        flex: 1,
    }
});

export default LoginScreen;
