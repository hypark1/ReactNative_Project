import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import MyImg from "~/component/MyImg";

/*기본 텍스트*/
const MyLogo = (props) => {
    return (
        <View style={styles.container}>
            <MyImg src={require('~/assets/images/logo.png')}
                   style={styles.icon}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 100,
        height: 59
    }
});

export default memo(MyLogo);
