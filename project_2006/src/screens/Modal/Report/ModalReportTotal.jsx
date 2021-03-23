import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import ReportTotal from "~/screens/Modal/Report/ReportTotal";

const { t } = I18n;

const ModalLinkPoint = (props) => {
    let content = <ReportTotal onPress={props.onPress} />
    return (
        <>
            <ModalDefault title={'일 평균 학습시간'}
                          component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalLinkPoint);
