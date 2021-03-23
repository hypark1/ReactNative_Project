import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import CouponUse from "~/screens/Modal/Coupon/CouponUse";

const { t } = I18n;

const ModalCouponUse = (props) => {
    let content = <CouponUse onPress={props.onPress} data={props.data} />
    return (
        <>
            <ModalDefault title={t('coupon.use.popup')}
                          component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalCouponUse);
