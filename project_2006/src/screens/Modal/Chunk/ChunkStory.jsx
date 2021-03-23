import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import Colors from "~/styles/Colors";

const { t } = I18n;

const ChunkStory = (props) => {
    const [story, setStory] = useState([]);

    useEffect(() => {
        /*let data = {...props.data}
        data.story.map((v, i) => {
            let n = v.indexOf(data.title);
            if (n > 0) {
                let arr
                arr = data.story[i].split(data.title);
                let tags =
                    <View style={{ flexDirection: 'row' }}>
                        <MyText text={arr[0]}
                                style={styles.chunkStory}
                                size={'md'}
                                weight={'6'}
                                en={true} />
                        <MyText text={data.title}
                                style={[styles.chunkStory, { backgroundColor: Colors.highLight, paddingHorizontal: 7 }]}
                                size={'md'}
                                weight={'6'}
                                en={true} />
                        {
                            arr[1] !== '' ?
                                <MyText text={arr[1]}
                                        style={styles.chunkStory}
                                        size={'md'}
                                        weight={'6'}
                                        en={true} />
                                :
                                null
                        }
                    </View>

                data.story[i] = tags
                setStory(data.story);
            } else {
                data.story[i] = <MyText text={data.story[i]}
                                        style={styles.chunkStory}
                                        size={'md'}
                                        weight={'6'}
                                        en={true} />
            }

        })*/
    }, [])

    return (
        <>
            <View style={styles.chunkStoryWrap}>
                <MyText text={t('chunk.story', { name: '김가온' })}
                        size={'md'}
                        weight={'5'}
                        align={'center'} />
                <View style={styles.chunkStoryBox}>
                    {
                        story.map((v, i) => {
                            return (
                                <View key={i}>
                                    {v}
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    chunkStoryWrap: {
        marginTop: 10
    },
    chunkStoryBox: {
        backgroundColor: Colors.white,
        padding: 20,
        paddingBottom: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: Colors.line
    },
    chunkStory: {
        marginBottom: 14,
        lineHeight: 25
    }
})

export default memo(ChunkStory);
