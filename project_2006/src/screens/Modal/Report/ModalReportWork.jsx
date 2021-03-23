import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import ReportWork from "~/screens/Modal/Report/ReportWork";

const { t } = I18n;

const ModalLinkPoint = (props) => {
    let content = <ReportWork onPress={props.onPress} />
    return (
        <>
            <ModalDefault title={'정오표'}
                          component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalLinkPoint);
