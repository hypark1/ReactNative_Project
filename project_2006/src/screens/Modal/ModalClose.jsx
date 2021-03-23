import React, { memo } from 'react';
import { StyleSheet } from "react-native";
import MyImgButton from "~/component/MyImgButton";

/*팝업 닫기 dom*/
const ModalClose = (props) => {
    return (
        <>
            <MyImgButton src={props.type === 'white'?
                                require('~/assets/images/popup_close.png')
                                :
                                require('~/assets/images/popup_close2.png')}
                         style={[styles.icon, props.style]}
                         onPress={props.onPress} />
        </>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
        marginRight: 15
    }
});

export default memo(ModalClose);
