import React, {memo, useContext, useState, useCallback} from 'react';
import { StyleSheet, Dimensions, FlatList, RefreshControl } from 'react-native';
import ChunkContext from "~/screens/Chunk/ChunkContext";
import ChunkListBox from "~/screens/Chunk/ChunkListBox";
import Colors from "~/styles/Colors";

const width = 420;
const height = 215;
const screenWidth = Dimensions.get('window').width;
const imgWidth = (screenWidth - 30) / 15 * 7;
const scaleFactor = width / imgWidth;
const imgHeight = height / scaleFactor;

/*청크리스트 - 작은그림*/
const ChunkListSm = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const { data } = useContext(ChunkContext);

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
                      data={data}
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
        paddingHorizontal: 15
    },
    chunkImgBox: {
        flexDirection: 'row',
        marginBottom: 15
    },
    chunkImgWrap: {
        flex: 7,
    },
    chunkImg: {
        height: imgHeight
    },
    chunkTextBox: {
        flex: 8,
        padding: 17,
        borderLeftWidth: 1,
        borderLeftColor: Colors.line,
        alignItems: 'flex-start',
    },
})

export default memo(ChunkListSm);
