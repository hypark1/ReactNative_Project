import React, {memo} from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from "react-redux";
import MyImg from "~/component/MyImg";
import Colors from '~/styles/Colors';
import Style from '~/styles/Style';

const width = 158;
const height = 100;
const windowSize = Dimensions.get('window');
const imgWidth = (windowSize.width) /5;
const scaleFactor = width / imgWidth;
const imgHeight = height / scaleFactor;

const LoadPopup = () => {
    const loadVisible = useSelector((store) => store.reducer.load);

    return (
        <>
            {
                loadVisible?
                    <SafeAreaView style={[Style.SafeAreaView, styles.container]}>
                        <MyImg src={require('~/assets/images/loading.gif')}
                               style={styles.img} />
                    </SafeAreaView>
                :
                    null
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    img: {
        width: imgWidth,
        height: imgHeight
    }
});

export default memo(LoadPopup);
