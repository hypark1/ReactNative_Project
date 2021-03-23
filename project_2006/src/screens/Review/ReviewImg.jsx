import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import MyImg from "~/component/MyImg";
import Style from "~/styles/Style";

const ReviewImg = (props) => {
    return (
        <>
            <MyImg src={{uri: 'https://static.hodooenglish.com/file/review/' + props.data}}
                   style={[styles.contentsImg, Style.reviewContents]}/>
        </>
    )
};

const styles = StyleSheet.create({
    contentsImg: {
        marginBottom: 15,
        backgroundColor: '#000'
    },
});

export default memo(ReviewImg);
