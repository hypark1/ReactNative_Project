import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import LinkPoint from "~/screens/Modal/Link/LinkPoint";

const { t } = I18n;

const ModalLinkPoint = (props) => {
    let content = <LinkPoint onPress={props.onPress} />
    return (
        <>
            <ModalDefault title={t('link.point.title')}
                          component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalLinkPoint);
