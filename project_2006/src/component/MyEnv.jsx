import React, { memo } from 'react';
import {StyleSheet, View} from "react-native";
import Config from "react-native-config";
import MyText from "~/component/MyText";
import Colors from "~/styles/Colors";

/*헤더에 dev,stg 표시*/
const MyEnv = () => {
    return (
        <>
            {
                Config.ENV === 'dev' ?
                    <View style={styles.envBox}>
                        <MyText text={Config.DISPLAY_NAME.slice(0,3)}
                                color={'red'}
                                size={'xl'}
                                weight={'7'} />
                    </View>
                    :
                    null
            }
        </>
    );
};

const styles = StyleSheet.create({
    envBox: {
        position: 'absolute',
        zIndex: 99,
        top: 5,
        left: 60,
        backgroundColor: Colors.black,
        width: 70,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default memo(MyEnv);
