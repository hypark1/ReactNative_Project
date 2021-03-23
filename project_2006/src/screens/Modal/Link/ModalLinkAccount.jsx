import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import LinkAccount from "~/screens/Modal/Link/LinkAccount";

const { t } = I18n;

const ModalLinkAccount = (props) => {
    let content = <LinkAccount onPress={props.onPress} />

    return (
        <>
            <ModalDefault title={t('link.account.modal')}
                          component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalLinkAccount);
