import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import LoginHodoo from "./LoginHodoo";

const { t } = I18n;

const ModalLogin = (props) => {
    let content = <LoginHodoo onPress={props.onPress}
                              navigation={props.navigation} />
    return (
        <>
            <ModalDefault title={t('login.sns.hodoo.title')}
                          component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalLogin);
