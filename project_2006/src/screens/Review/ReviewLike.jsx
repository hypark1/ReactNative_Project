import React, {memo, useContext, useCallback} from "react";
import { StyleSheet, View } from 'react-native';
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import MyText from "~/component/MyText";
import MyImgButton from "~/component/MyImgButton";
import ReviewContext from "~/screens/Review/ReviewContext";

/*리얼후기 좋아요*/
const ReviewLike = (props) => {
    const { changeLike } = useContext(ReviewContext);
    const data = props.data;

    const ClickLike = useCallback(() => {
        let id = data.article_id;
        Http({
            method: 'PUT',
            url: '/review/like/' + id
        })
            .then(response => {
                if (props.type === 'main') {
                    props.change(props.index);
                } else {
                    changeLike(props.index);
                }

            })
            .catch(error => {
                ErrorSet(error);
            })
    }, [data.article_id]);

    /*좋아요 아이콘 토글*/
    const LikeSrc = useCallback(() => {
        if (data.is_like_article === 'y') {
            return (
                <MyImgButton src={require('~/assets/images/icon_heart_fill.png')}
                             style={styles.contentsHeart}
                             onPress={ClickLike}/>
            )
        } else {
            return (
                <MyImgButton src={require('~/assets/images/icon_heart.png')}
                             style={styles.contentsHeart}
                             onPress={ClickLike}/>
            )
        }
    }, [data.is_like_article]);

    return (
        <>
            <View style={styles.contentsHeartBox}>
                <View style={styles.likeBox}>
                    {LikeSrc()}
                    <MyText text={data.like_count}
                            size={'md'}
                            weight={'5'} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    contentsHeartBox: {
        flexDirection: 'row',
        position: 'relative',
        paddingBottom: 30,
        marginBottom: 15,
    },
    contentsHeart: {
        width: 18,
        height: 18,
        marginRight: 4
    },
    likeBox: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        right: 0,
        height: 18,
    },
})

export default memo(ReviewLike);
