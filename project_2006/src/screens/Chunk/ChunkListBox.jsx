import React, { memo, useCallback } from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import MyImg from "~/component/MyImg";
import MyText from "~/component/MyText";
import Colors from "~/styles/Colors";

/*청크 리스트에 각각의 청크박스*/
const ChunkListBox = (props) => {
    const SetListBoxDom = useCallback(() => {
        let dom;
        if (props.item.episode_id) {
            /*배열중에 청크 정보 있는것*/
            dom = (
                <TouchableOpacity activeOpacity={1}
                                  style={[styles.chunkImgBox, props.style.chunkImgBox]}
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
            )
        } else {
            /*빈 배열*/
            dom = (
                <View style={[props.style.chunkImgBox]} />
            )
        }
        return dom;
    }, [props.item, props.style, props.index]);

    return (
        <>
            {SetListBoxDom()}
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
    }
})

export default memo(ChunkListBox);
