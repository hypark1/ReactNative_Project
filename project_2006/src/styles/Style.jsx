import React from 'react';
import {Dimensions, StyleSheet} from "react-native";
import Colors from "~/styles/Colors";

const windowSize = Dimensions.get('window');

const Style = StyleSheet.create({
    SafeAreaView: {
      flex: 1,
    },
    header: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 2,
        position: 'relative'
    },
    headerWhite: {
        borderBottomColor: Colors.primary,
        backgroundColor: Colors.white
    },
    headerPrimary: {
        borderBottomColor: Colors.primary,
        backgroundColor: Colors.primary
    },
    headerTitle: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex:9,
        height: 50,
        justifyContent: 'center',
    },
    headerRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    ModalHeight: {
        maxHeight: (windowSize.height)/5 *2,
    },
    ModalReviewHeight: {
        maxHeight: (windowSize.height)/5 *3,
    },
    DinoContents: {
        maxHeight: (windowSize.height)/5 *2,
        paddingHorizontal: 10
    },
    DinoTitle: {
        lineHeight: 23,
        marginBottom: 20
    },
    DinoChkBox: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    DinoChkImg: {
        width: 17,
        height: 17,
        marginTop: 2
    },
    DinoChkText: {
        flex: 15,
        marginLeft: 7
    },
    screenBottom: {
        paddingBottom: 20
    },
    reviewContents: {
        width: '100%',
        height: (windowSize.width /2) ,
    },
    reportCardBox: {
        marginTop: 10,
        paddingVertical: 30,
        borderWidth: 1,
        borderColor: Colors.line,
        borderTopColor: Colors.black
    },
    infoBox: {
        backgroundColor: Colors.background,
        padding: 20,
        marginTop: 15
    },
});

export default Style;
