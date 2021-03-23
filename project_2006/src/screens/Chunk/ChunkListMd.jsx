import React, {memo, useContext, useEffect, useState, useCallback} from 'react';
import {StyleSheet, Dimensions, FlatList, RefreshControl} from 'react-native';
import ChunkContext from "~/screens/Chunk/ChunkContext";
import ChunkListBox from "~/screens/Chunk/ChunkListBox";
import Colors from "~/styles/Colors";

const width = 480;
const height = 275;
const screenWidth = Dimensions.get('window').width;
const imgWidth = (screenWidth / 2) - 25;
const scaleFactor = width / imgWidth;
const imgHeight = height / scaleFactor;

/*청크리스트 - 중간그림*/
const ChunkListMd = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const { dataMd } = useContext(ChunkContext);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        props.refresh();
        setTimeout(() => {
            setRefreshing(false);
        }, 700);
    }, []);

    return (
        <>
            <FlatList style={styles.chunkList}
                      keyExtractor = { (item, index) => index.toString() }
                      data={dataMd}
                      numColumns={2}
                      windowSize={4}
                      refreshControl={
                          <RefreshControl refreshing={refreshing}
                                          onRefresh={onRefresh} />
                      }
                      renderItem={({item, index}) =>
                          <ChunkListBox style={styles}
                                        item={item}
                                        index={index}
                                        onPress={props.onPress} />
                      }
            />
        </>
    );
};

const styles = StyleSheet.create({
    chunkList: {
        paddingHorizontal: 8
    },
    chunkImgBox: {
        flex: 1,
        marginHorizontal: 8,
        marginBottom: 16,
    },
    chunkImg: {
        height: imgHeight,
    },
    chunkTextBox: {
        height: 60,
        borderTopWidth: 1,
        borderTopColor: Colors.line,
    },
    chunkText: {
        textAlign: 'center',
    }
})

export default memo(ChunkListMd);
