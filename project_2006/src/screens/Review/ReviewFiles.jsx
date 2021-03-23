import React, { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import ReviewVideo from "~/screens/Review/ReviewVideo";
import ReviewImg from "~/screens/Review/ReviewImg";

const ReviewFiles = (props) => {
    const FileDom = useCallback(() => {
        let dom = props.data.bbs_files.map((item, index) => {
            return (
                <View key={index}
                      style={styles.fileDom}>
                    {FileContents(item)}
                </View>
            )
        });
        return dom;
    }, [props.data, props.visible]);

    const FileContents = useCallback((value) => {
        if(value.file_type === 'IMAGE') {
            return <ReviewImg data={value.file_path} />
        } else {
            return <ReviewVideo data={value.file_url}
                                thumb={value.video_thumbnail_url}
                                visible={props.visible} />
        }
    }, [props.visible]);

    return (
        <>
            { FileDom() }
        </>
    )
};

const styles = StyleSheet.create({
    fileDom: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    }
})
export default memo(ReviewFiles);
