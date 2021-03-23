import React, { memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MyImg from "~/component/MyImg";

const windowSize = Dimensions.get('window');
const imgWidth = (windowSize.width) /3.5;
const imgHeight = imgWidth /2;

/*로그인 상단 로고*/
const LoginLogo = (props) => {
    return (
        <>
            <View style={styles.logoBox}>
                <MyImg src={require('~/assets/images/login_logo.png')}
                       style={{ width: imgWidth, height: imgHeight }} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    logoBox: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
    }
});

export default memo(LoginLogo);
