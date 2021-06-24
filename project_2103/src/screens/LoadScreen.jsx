import React, { memo } from 'react';
import {Dimensions, Modal, StyleSheet, View} from "react-native";
import { useSelector } from "react-redux";
import MyImg from "~/component/MyImg";

const width = 158;
const height = 100;
const windowSize = Dimensions.get('window');
const imgWidth = (windowSize.width) /5;
const scaleFactor = width / imgWidth;
const imgHeight = height / scaleFactor;

/*로딩 화면*/
const LoadScreen = () => {
    const loadVisible = useSelector((store) => store.reducer.load);

    return (
        <>
            <Modal animationType="fade"
                   transparent={true}
                   visible={loadVisible}>
                <View style={styles.container}>
                    <MyImg src={require('~/assets/images/loading.gif')}
                           style={styles.img} />
                </View>
            </Modal>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.5)',
    },
    img: {
        width: imgWidth,
        height: imgHeight
    }
});

export default LoadScreen;
