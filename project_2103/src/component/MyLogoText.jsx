import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import MyImg from "~/component/MyImg";
import Style from "~/styles/Style";
import MyConfig from "./MyConfig";

/*텍스트 로고*/
const MyLogoText = (props) => {
    return (
        <View style={[styles.container, Style.headerLeft]}>
            <MyImg src={require('~/assets/images/logo_text.png')}
                   style={styles.icon}/>
                   <MyConfig />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 87,
        height: 24
    }
});

export default memo(MyLogoText);
