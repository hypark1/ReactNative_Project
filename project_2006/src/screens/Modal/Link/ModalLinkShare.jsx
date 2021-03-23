import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import LinkShare from "~/screens/Modal/Link/LinkShare";

const { t } = I18n;

const ModalLinkShare = (props) => {
    let content = <LinkShare onPress={props.onPress} data={props.data} />
    return (
        <>
            <ModalDefault title={t('chunk.share.title')} component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalLinkShare);
