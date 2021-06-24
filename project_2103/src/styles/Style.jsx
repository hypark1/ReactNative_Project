import React from 'react';
import {StyleSheet} from "react-native";
import Colors from '~/styles/Colors';

const Style = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.background_gray
    },
    ScreenWrap: {
        flex: 1,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wideWrap: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    w100: {
        width: '100%'
    },
    w65: {
        width: '65%'
    },
    headerWrap: {
        flex:1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLeft: {
        position: 'absolute',
        top: 20,
        left: 20
    },
    headerRight: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    keyboard: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnBox: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnMd: {
        flex: 1
    },
    btnSm: {
        paddingHorizontal: 60
    },
    dot: {
        width: 4,
        height: 4,
        backgroundColor: Colors.red,
        borderRadius: 4,
        position: 'absolute',
        right: -6,
        top: -1
    },
});

export default Style;
