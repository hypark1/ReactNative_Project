import React, {memo, useContext, useCallback} from 'react';
import { View, StyleSheet } from 'react-native';
import MyImgButton from "~/component/MyImgButton";
import ChunkContext from "~/screens/Chunk/ChunkContext";

const tapArr = [
    [ require('~/assets/images/chunk_type01.png'), require('~/assets/images/chunk_type01_on.png')],
    [ require('~/assets/images/chunk_type02.png'), require('~/assets/images/chunk_type02_on.png')],
    [ require('~/assets/images/chunk_type03.png'), require('~/assets/images/chunk_type03_on.png')],
]

/*청크 상단탭*/
const ChunkTap = (props) => {
    const { tapVisible } = useContext(ChunkContext);

    const SetTapDom = useCallback(() => {
        let dom = tapArr.map((item, idx) => {
            return (
                <MyImgButton src={tapVisible[idx] ? item[1] : item[0]}
                             key={idx}
                             style={styles.tapIcon}
                             onPress={() => props.onPress(idx)}/>
            )
        });
        return dom;
    }, [tapVisible]);

    return (
        <>
            <View style={styles.tapBox}>
                <View style={styles.tapWrap}>
                    {SetTapDom()}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    tapBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tapWrap: {
        flexDirection: 'row'
    },
    tapIcon: {
        width: 50,
        height: 50,
        margin: 7
    },
})

export default memo(ChunkTap);
