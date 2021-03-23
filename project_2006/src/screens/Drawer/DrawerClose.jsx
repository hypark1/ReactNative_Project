import React, { memo } from 'react';
import { StyleSheet, View } from "react-native";
import MyImgButton from "~/component/MyImgButton";

/*메뉴 닫기 버튼*/
const DrawerClose = (props) => {
    return (
        <>
            <View style={styles.container}>
                <MyImgButton src={require('~/assets/images/popup_close.png')}
                             style={[styles.icon, props.style]}
                             onPress={props.onPress} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 90,
        top: 10,
        left: 10,
    },
    icon: {
        width: 20,
        height: 20,
        marginTop: 3,
        marginLeft: 2
    }
});

export default memo(DrawerClose);
