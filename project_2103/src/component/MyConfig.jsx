import React, { memo, useCallback } from 'react';
import {StyleSheet, View} from 'react-native';
import Config from "react-native-config";
import MyText from "./MyText";
import Colors from "../styles/Colors";

/*dev 표시*/
const MyConfig = (props) => {
    const SetConfigDom = useCallback(() => {
        let dom = null;
        if (Config.ENV !== 'production') {
            dom = (
                <View style={styles.container}>
                    <MyText text={'DEV'}
                            family={'GodoB'}
                            size={'md'}
                            color={'red'} />
                </View>
            )
        }
        return dom;
    }, [Config]);

    return (
        <>
            { SetConfigDom() }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        zIndex: 9,
        padding: 20,
        backgroundColor: Colors.black
    },
});

export default memo(MyConfig);
