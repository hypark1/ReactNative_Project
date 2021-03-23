import React, {memo, useState, useCallback, useContext} from 'react';
import { StyleSheet, Dimensions, FlatList, RefreshControl } from 'react-native';
import ChunkContext from "~/screens/Chunk/ChunkContext";
import ChunkListBox from "~/screens/Chunk/ChunkListBox";
import Colors from "~/styles/Colors";

const width = 1000;
const height = 550;
const screenWidth = Dimensions.get('window').width;
const imgWidth = (screenWidth) - 30;
const scaleFactor = width / imgWidth;
const imgHeight = height / scaleFactor;

/*청크리스트 - 큰그림*/
const ChunkListLg = (props) => {
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
        marginBottom: 25
    },
    chunkImgWrap: {
        flexDirection: 'row',
    },
    chunkImg: {
        width: imgWidth,
        height: imgHeight
    },
    chunkTextBox: {
        flexDirection: 'row',
        height: 65,
        borderTopWidth: 1,
        borderTopColor: Colors.line,
    },
    chunkText: {
        textAlign: 'center',
    }
})

export default memo(ChunkListLg);
