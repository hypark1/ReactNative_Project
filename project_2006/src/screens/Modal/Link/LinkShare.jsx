import React, { memo } from 'react';
import I18n from "~/locales/I18n";
import MyShare from "~/component/MyShare";

const { t } = I18n;

const linkImg = 'https://static.hodooenglish.com/static/imgs/recommend_friends.jpg'

const LinkShare = (props) => {
    const { data } = props;

    return (
        <>
            <MyShare title={t('share.linkTitle')}
                     btn={t('share.linkBtn')}
                     linkImg={linkImg}
                     copyLink={data}
                     width={809}
                     height={615}/>
        </>
    )
}

export default memo(LinkShare);
