import React, {memo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MyImg from "~/component/MyImg";

const width = 158;
const height = 100;
const windowSize = Dimensions.get('window');
const imgWidth = (windowSize.width) /6;
const scaleFactor = width / imgWidth;
const imgHeight = height / scaleFactor;

/*리스트 하단에 로딩 아이콘*/
const MyListLoad = (props) => {
    return (
        <>
            {
                props.total > props.page ?
                    <View style={styles.container}>
                        <MyImg src={require('~/assets/images/loading.gif')}
                               style={styles.img} />
                    </View>
                    :
                    null
            }
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 20
    },
    img: {
        width: imgWidth,
        height: imgHeight
    }
});

export default memo(MyListLoad);
