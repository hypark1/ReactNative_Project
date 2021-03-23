import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import CouponRegister from "~/screens/Modal/Coupon/CouponRegister";

const { t } = I18n;

const ModalCouponRegister = (props) => {
    let content = <CouponRegister onPress={props.onPress} />
    return (
        <>
            <ModalDefault title={t('coupon.register.title')}
                          component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalCouponRegister);
