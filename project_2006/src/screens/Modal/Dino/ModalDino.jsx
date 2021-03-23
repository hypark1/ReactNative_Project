import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import DinoInput from "~/screens/Modal/Dino/DinoInput";
import DinoSingle from "~/screens/Modal/Dino/DinoSingle";
import DinoMultiple from "~/screens/Modal/Dino/DinoMultiple";

const { t } = I18n;

const ModalDino = (props) => {
    let type = 'input';
    let content;
    if (type === 'input') {
        content = <DinoInput onPress={props.onPress} />
    } else if (type === 'single') {
        content = <DinoSingle onPress={props.onPress} />
    } else if (type === 'multiple') {
        content = <DinoMultiple onPress={props.onPress} />
    }
    return (
        <>
            <ModalDefault title={t('dino.title')} component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalDino);
