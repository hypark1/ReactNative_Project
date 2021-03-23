import React, { memo, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import MyButton from "~/component/MyButton";
import ModalLinkAccount from "~/screens/Modal/Link/ModalLinkAccount";

const LinkButton = (props) => {
    const [visible, setVisible] = useState(false);

    /*지급계좌정보 팝업 열고 닫기*/
    const OpenModal = useCallback(() => {
        setVisible(true);
    }, []);

    const CloseModal = useCallback(() => {
        setVisible(false);
    }, [])

    return (
        <>
            {/*등록, 변경 버튼*/}
            <MyButton text={props.title}
                      type={'primary'}
                      style={styles.button}
                      onPress={OpenModal}/>
            {/*지급계좌정보 팝업*/}
            <ModalLinkAccount visible={visible}
                              onPress={CloseModal} />
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 55,
        height: 35
    }
})


export default memo(LinkButton);
