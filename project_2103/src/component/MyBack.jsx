import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import MyImgButton from '~/component/MyImgButton';
import Style from '~/styles/Style';

/*기본 타이틀*/
const MyBack = (props) => {
    return (
        <>
            <View style={Style.headerLeft}>
                <MyImgButton src={require('~/assets/images/back_icon.png')}
                             onPress={() => {
                                 if (props.goRoute) {
                                     props.navigation.replace(props.goRoute);
                                 } else {
                                     props.navigation.goBack();
                                 }
                             }}
                             style={styles.backIcon} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    backIcon: {
        width: 32,
        height: 24
    },
});

export default memo(MyBack);
