import React, { memo } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import ReviewFiles from "~/screens/Review/ReviewFiles";
import ReviewLike from "~/screens/Review/ReviewLike";
import Style from "~/styles/Style";
import Fonts from "~/styles/Fonts";

const { t } = I18n;

/*리얼후기 팝업*/
const ReviewDetail = (props) => {
    const data = props.data;

    return (
        <>
            <ScrollView style={Style.ModalReviewHeight}>
                <MyText text={data.title}
                        style={styles.title}
                        size={'lg'}
                        weight={'6'} />
                <View style={styles.detailText}>
                    <MyText text={data.learner_name}
                            style={styles.text} />
                    <MyText text={t('review.age', { age: data.age })}
                            style={styles.text} />
                    <MyText text={'|'}
                            style={[styles.textBar, styles.text]} />
                    <MyText text={data.name}
                            style={styles.text} />
                    <MyText text={'|'}
                            style={[styles.textBar, styles.text]} />
                    <MyText text={data.created_date}
                            style={styles.text} />
                </View>
                <View style={styles.fileBox}>
                    <ReviewFiles data={data} />
                </View>
                <MyText text={data.text}
                        style={styles.title}
                        weight={'5'} />
                <ReviewLike data={data}
                            type={'main'}
                            change={props.change}
                            index={props.index} />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        lineHeight: 25
    },
    detailText: {
        flexDirection: 'row',
        marginVertical: 10
    },
    fileBox: {
        marginVertical: 20
    },
    textBar: {
        marginHorizontal: 5
    },
    text: {
        fontSize: Fonts.size.xs,
        fontFamily: Fonts.weight['4']
    },
})

export default memo(ReviewDetail);
