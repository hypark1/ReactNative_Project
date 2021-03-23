import React, { memo, useCallback, useContext, useState, useEffect } from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import I18n from "~/locales/I18n";
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import MyImg from "~/component/MyImg";
import MyText from "~/component/MyText";
import ChunkContext from "~/screens/Chunk/ChunkContext";
import Colors from "~/styles/Colors";

const { t } = I18n;

const ChunkListBox = (props) => {
    const [visible, setVisible] = useState(props.item.is_gain_point);
    const { learner, ReplaceChunkData } = useContext(ChunkContext);

    useEffect(() => {
        setVisible(props.item.is_gain_point);
    }, [props.item]);

    /*포인트 보상 얻기 - 단일*/
    const PostPointSingle = useCallback(() => {
        let value = {
            'episode_id': props.item.episode_id,
            'game_type': learner.gamified_service_id === 1 ? 'h1' : 'hm',
            'learner_id': learner.learner_id,
            'point': 10
        }
        Http({
            method: 'POST',
            url: '/point/single',
            data: value,
        })
            .then(response => {
                if (response.request.status === 200) {
                    ReplaceChunkData(props.index);
                    setVisible('y');
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, [props.item]);

    return (
        <>
            {
                props.item.episode_id?
                    <>
                        <View style={[styles.chunkImgBox, props.style.chunkImgBox]}>
                            {
                                visible === 'n' ?
                                    <TouchableOpacity activeOpacity={1}
                                                      style={[props.style.chunkImg, styles.chunkPointBox]}
                                                      onPress={PostPointSingle}>
                                        <MyText text={t('chunk.point.chunk', { point: 10 })}
                                                color={'white'}
                                                weight={'5'}/>
                                    </TouchableOpacity>
                                    :
                                    null
                            }
                            <TouchableOpacity activeOpacity={1}
                                              onPress={() => props.onPress(props.item.episode_id, props.index)}>
                                <View style={props.style.chunkImgWrap}>
                                    <MyImg src={{uri: props.item.image_file_name}}
                                           style={props.style.chunkImg}
                                           resizeMode={'cover'}/>
                                </View>
                                <View style={[styles.chunkTextBox, props.style.chunkTextBox]}>
                                    <MyText text={props.item.sentence}
                                            weight={'5'}
                                            en={true}
                                            line={2}
                                            style={[styles.chunkText, props.style.chunkText]} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <View style={[props.style.chunkImgBox]} />
            }
        </>
    );
};

const styles = StyleSheet.create({
    chunkImgBox: {
        borderWidth: 1,
        borderColor: Colors.line,
    },
    chunkTextBox: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    chunkText: {
        lineHeight: 23
    },
    chunkPointBox: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.75)',
        justifyContent: 'center',
        alignItems: 'center', }
})

export default memo(ChunkListBox);
