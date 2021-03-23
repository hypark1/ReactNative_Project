import React, {memo, useCallback} from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from "~/locales/I18n";
import MyImg from "~/component/MyImg";
import MyText from "~/component/MyText";

const { t } = I18n;

const ReviewMainList = (props) => {
    const { data, imgWidth, imgHeight } = props;

    /*이미지, 영상 나누기*/
    const MainContents = useCallback(() => {
        let dom;
        if (data.bbs_files[0].file_type === 'IMAGE') {
            dom = <MyImg src={{uri: 'https://static.hodooenglish.com/file/review/' + data.bbs_files[0].file_path}}
                         style={{ width: imgWidth, height: imgHeight }} />
        } else {
            dom =
                <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', height: imgHeight}} >
                    <MyImg src={{uri: data.bbs_files[0].video_thumbnail_url}}
                           style={{ position: 'absolute', left: 0, top: 0, width: imgWidth, height: imgHeight }}/>
                    <MyImg src={require('~/assets/images/bg_movie_thumb.png')}
                           style={styles.swiperVideo} />
                </View>
        }
        return dom;
    }, [data, imgWidth, imgHeight]);

    return (
        <>
            <View style={{ width: imgWidth, height: imgHeight }}>
                <MainContents />
                <View style={styles.slideText}>
                    <MyText text={t('review.writer', {name: data.name})}
                            color={'white'}
                            size={'xs'}/>
                    <MyText text={data.title}
                            line={1}
                            color={'white'}
                            size={'lg'}
                            weight={'6'}
                            style={styles.title}/>
                    <MyText text={data.text}
                            line={1}
                            color={'white'}
                            size={'xm'}
                            style={{width: imgWidth - 40}}/>
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    slideText: {
        position: 'absolute',
        left: 0,
        bottom: 40,
        marginHorizontal: 20
    },
    title: {
        marginTop: 5,
        marginBottom: 3
    },
    swiperVideo: {
        width: 80,
        height: 80
    },
});

export default memo(ReviewMainList);
