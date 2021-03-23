import React, { memo, useCallback } from 'react';
import I18n from "~/locales/I18n";
import MyShare from "~/component/MyShare";

const { t } = I18n;

/*청크상세 공유하기 팝업*/
const ChunkShare = (props) => {
    /*공유 url 설정*/
    const SetShareLink = useCallback(() => {
        let value;
        if (props.data.sr_file_name) {
            /*학습자 음성 있을때*/
            value = 'https://hodooenglish.com/chunkcards/' + props.data.episode_id + '?r=' + props.data.sr_file_name;
        } else {
            /*학습자 음성 없을때*/
            value = 'https://hodooenglish.com/chunkcards/' + props.data.episode_id;
        }
        return value;
    }, [props.data]);

    return (
        <>
            <MyShare title={t('share.chunkTitle', { title: props.data.sentence })}
                     btn={t('share.chunkBtn')}
                     linkImg={props.data.image_file_name}
                     copyLink={SetShareLink()}
                     type={'chunk'}
                     width={440}
                     height={276}/>
        </>
    )
}

export default memo(ChunkShare);
