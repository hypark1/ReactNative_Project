import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import ReportMonth from "~/screens/Modal/Report/ReportMonth";

const { t } = I18n;

const ModalLinkPoint = (props) => {
    let content = <ReportMonth onPress={props.onPress} />
    return (
        <>
            <ModalDefault title={'5월 평균 학습시간'}
                          component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalLinkPoint);
