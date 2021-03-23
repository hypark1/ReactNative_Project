import React, { memo } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import Colors from "~/styles/Colors";

const width = 1080;
const height = 628;
const screenWidth = Dimensions.get('window').width;
const imgWidth = (screenWidth);
const scaleFactor = width / imgWidth;
const imgHeight = height / scaleFactor;

/*청크상세 썸네일*/
const ChunkThumb = (props) => {
    return (
        <>
            <View style={styles.chunkImgBox}>
                <MyImg src={{uri: props.data.image_file_name}}
                       style={[styles.chunkImg, { height: imgHeight }]}
                       resizeMode={'cover'} />
            </View>
            <View style={styles.chunkTextBox}>
                <MyText text={props.data.sentence}
                        style={styles.chunkText}
                        size={'md'}
                        weight={'5'}
                        color={'black'}
                        en={true}
                        line={2}
                        align={'center'} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    chunkImgBox: {
        flexDirection: 'row'
    },
    chunkImg: {
        flex: 1
    },
    chunkTextBox: {
        flexDirection: 'row',
        backgroundColor: Colors.white
    },
    chunkText: {
        flex: 1,
        padding: 15,
        lineHeight: 25
    },
})

export default memo(ChunkThumb);
