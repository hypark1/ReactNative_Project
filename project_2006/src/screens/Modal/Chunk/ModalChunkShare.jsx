import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import ChunkShare from "~/screens/Modal/Chunk/ChunkShare";

const { t } = I18n;

/*청크상세 공유하기 팝업창*/
const ModalChunkShare = (props) => {
    let content = <ChunkShare onPress={props.onPress} data={props.data} />
    return (
        <>
            <ModalDefault title={t('chunk.share.title')} component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalChunkShare);
