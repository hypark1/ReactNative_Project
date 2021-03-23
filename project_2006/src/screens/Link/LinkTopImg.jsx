import React, { memo, useCallback } from 'react';
import {Dimensions, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import MyImg from "~/component/MyImg";

const width = 1080;
const height = 250;
const screenWidth = Dimensions.get('window').width;
const imgWidth = (screenWidth);
const scaleFactor = width / imgWidth;
const imgHeight = height / scaleFactor;

const LinkTopImg = () => {
    const linkYoutube = useCallback(() => {
        Linking.openURL('https://youtu.be/_6G7DkVsj98');
    }, []);

    return (
        <>
            <TouchableOpacity activeOpacity={1}
                              style={[styles.titleBox, { height: imgHeight }]}
                              onPress={linkYoutube}>
                <MyImg src={require('~/assets/images/link_title.jpg')}
                       style={[styles.titleImg, { height: imgHeight }]} />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    titleBox: {
        flexDirection: 'row',
    },
    titleImg: {
        flex: 1,
    },
})


export default memo(LinkTopImg);
