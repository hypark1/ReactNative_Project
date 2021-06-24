import React, { memo, useCallback } from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MyImg from "~/component/MyImg";
import Style from "~/styles/Style";
import Colors from "~/styles/Colors";

/*설정 버튼*/
const MySetting = (props) => {
    const GoSetting = useCallback(() => {
        props.navigation.navigate('Setting');
    }, []);

    return (
        <TouchableOpacity activeOpacity={1}
                          style={[Style.headerRight, styles.settingBox]}
                          onPress={() => GoSetting()}>
            <MyImg src={require('~/assets/images/setting/setting_icon.png')}
                   style={styles.settingIcon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    settingBox: {
        backgroundColor: Colors.skyblue,
        padding: 8,
        borderRadius: 50,
    },
    settingIcon: {
        width: 35,
        height: 35
    },
});

export default memo(MySetting);
