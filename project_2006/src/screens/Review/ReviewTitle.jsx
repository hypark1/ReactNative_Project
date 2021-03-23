import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";

const { t } = I18n;

const ReviewTitle = (props) => {
    const { data } = props;

    const SetReviewStar = useCallback(() => {
        let dom = [0,1,2,3,4].map((item, index) => {
            return (
                <View key={item}>
                    {
                        (index < data.score) ?
                            <MyImg src={require('~/assets/images/star_on.png')}
                                   style={styles.iconBox} />
                            :
                            <MyImg src={require('~/assets/images/star_off.png')}
                                   style={styles.iconBox} />
                    }
                </View>
            )
        });

        return dom;
    }, [data]);

    return (
        <>
            <View style={styles.dateBox}>
                <MyText text={data.created_date} en={true} />
                <MyImg src={require('~/assets/images/icon_heart_fill.png')}
                       style={[styles.arrowImg, styles.heart]} />
                <MyText text={data.like_count}
                        weight={'5'} />
            </View>
            <MyText text={data.title}
                    size={'lg'}
                    weight={'5'}
                    line={2}
                    style={styles.title} />
            <View style={styles.lastLineBox}>
                <View style={styles.lastLineBox}>
                    { SetReviewStar() }
                </View>
                <MyText text={'|'}
                        style={styles.textBar}
                        weight={'3'} />
                <MyText text={data.learner_name}
                        weight={'3'} />
                <MyText text={t('review.age', { age: data.age })}
                        weight={'3'} />
                <MyText text={'|'}
                        style={styles.textBar}
                        weight={'3'} />
                <MyText text={data.name}
                        weight={'3'} />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    dateBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    heart: {
        marginHorizontal: 5
    },
    title: {
        marginVertical: 7,
        lineHeight: 23
    },
    iconBox: {
        width: 17,
        height: 17,
        marginRight: 1
    },
    textBar: {
        marginHorizontal: 6
    },
    lastLineBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrowImg: {
        width: 15,
        height: 15
    },
});

export default ReviewTitle;
