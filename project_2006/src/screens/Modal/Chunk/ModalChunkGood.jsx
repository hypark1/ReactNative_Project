import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import ChunkGood from "~/screens/Modal/Chunk/ChunkGood";

const { t } = I18n;

/*청크상세 칭찬하기 팝업창*/
const ModalChunkGood = (props) => {
    let content = <ChunkGood onPress={props.onPress} data={props.data} />
    return (
        <>
            <ModalDefault title={t('chunk.good.title')}
                          component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalChunkGood);
