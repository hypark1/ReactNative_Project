import React, { useState, memo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from "~/locales/I18n";
import MyButton from "~/component/MyButton";
import ModalCouponRegister from "~/screens/Modal/Coupon/ModalCouponRegister";

const { t } = I18n;

/*이용권 등록 버튼*/
const CouponRegister = () => {
    const [visible, setVisible] = useState(false);

    /*이용권 등록 팝업 열고 닫기*/
    const ClickRegister = useCallback((item) => {
        setVisible(true);
    }, []);

    const CloseRegister = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <>
            <View style={styles.couponRegister}>
                <MyButton text={t('coupon.register.title')}
                          type={'primary'}
                          onPress={ClickRegister} />
            </View>
            <ModalCouponRegister visible={visible}
                                 onPress={CloseRegister} />
        </>
    );
}

const styles = StyleSheet.create({
    couponRegister: {
        padding: 25
    }
})

export default memo(CouponRegister);
