import React, { memo } from "react";
import I18n from "~/locales/I18n";
import ModalDefault from "~/screens/Modal/ModalDefault";
import ReviewDetail from "~/screens/Modal/Review/ReviewDetail";

const { t } = I18n;

const ModalReview = (props) => {
    let content = <ReviewDetail onPress={props.onPress}
                                data={props.data}
                                change={props.change}
                                index={props.index} />
    return (
        <>
            <ModalDefault title={t('review.modalTitle')}
                          component={content}
                          visible={props.visible}
                          onPress={props.onPress} />
        </>
    );
}

export default memo(ModalReview);
