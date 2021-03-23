import React, { memo, useState, useCallback, useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import MyImg from "~/component/MyImg";
import Style from "~/styles/Style";

const ReviewVideo = (props) => {
    const [paused, setPaused] = useState(false);
    const [thumb, setThumb] = useState(true);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (!props.visible && load) {
            setPaused(true);
        }
    }, [props.visible, load]);

    /*동영상 로딩후 stop*/
    const VideoOnLoad = useCallback(() => {
        setPaused(true);
        setLoad(true);
    }, []);

    /*동영상 시작,정지*/
    const VideoPlay = useCallback(() => {
        setPaused(!paused);
        if (thumb) {
            setThumb(false);
        }
    }, [thumb, paused]);

    const VideoDom = useCallback(() => {
        if (paused) {
            return (
                <>
                    {
                        thumb?
                            <MyImg src={{uri: props.data}}
                                   style={[Style.reviewContents, { position: 'absolute', left: 0, top: 0 }]} />
                            :
                            null
                    }
                    <MyImg src={require('~/assets/images/bg_movie_thumb.png')}
                           style={styles.swiperVideo} />
                </>
            )
        }
    }, [paused, thumb]);

    return (
        <>
            <View style={[styles.videoBox, Style.reviewContents]}>
                <Video source={{uri:props.data}}
                       style={[styles.contentsImg, Style.reviewContents]}
                       onLoad={VideoOnLoad}
                       paused={paused}
                       resizeMode={'contain'}
                       volume={10} />
                <TouchableOpacity activeOpacity={1}
                                  onPress={VideoPlay}
                                  style={[Style.reviewContents, styles.swiperVideoBox]}>
                    {VideoDom()}
                </TouchableOpacity>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    videoBox: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    swiperVideoBox: {
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    swiperVideo: {
        width: 70,
        height: 70
    },
});

export default memo(ReviewVideo);
