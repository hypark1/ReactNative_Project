import React, { memo, useState, useEffect, useCallback } from 'react';
import { Modal, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Http from "~/modules/Http";
import ErrorSet from "~/modules/ErrorSet";
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import ModalClose from "~/screens/Modal/ModalClose";
import ChunkStory from "~/screens/Modal/Chunk/ChunkStory";
import ChunkThumb from "~/screens/Modal/Chunk/ChunkThumb";
import ChunkButton from "~/screens/Modal/Chunk/ChunkButton";
import Style from "~/styles/Style";
import Colors from "~/styles/Colors";

const { t } = I18n;

/*청크 상세*/
const ModalChunk = (props) => {
    const [chunkData, setChunkData] = useState(null);

    useEffect(() => {
        GetChunkView();
    }, [props.visible, props.value])

    /*청크 상세 가져오기*/
    const GetChunkView = useCallback(() => {
        if (props.visible && props.value) {
            let data = {
                episodeId: props.value.episode_id,
                learnerid: props.learner.learner_id,
                serviceid: props.learner.gamified_service_id,
            }
            Http({
                method: 'GET',
                url: '/learner/chunks/' + data.episodeId,
                params: data,
            })
                .then(response => {
                    if (response.request.status === 200) {
                        let res = JSON.parse(response.request._response);
                        console.log(res)
                        if (res.chunk_list.length === 0) {
                            /*청크상세 정보가 없을때*/
                            setChunkData(null);
                            props.null();
                            props.onPress();
                        } else {
                            /*청크상세 정보가 있을때*/
                            setChunkData(res.chunk_list[0])
                        }
                    }
                })
                .catch(error => {
                    ErrorSet(error);
                })
        }
    }, [props.visible, props.value, props.learner]);

    return (
        <>
            <Modal animationType="fade"
                   transparent={false}
                   visible={props.visible}
                   onRequestClose={props.onPress}>
                <SafeAreaView style={Style.SafeAreaView}>
                <View style={[Style.header, Style.headerWhite]}>
                    <View style={Style.headerTitle}>
                        <MyText text={t('chunk.title')}
                                size={'lg'}
                                weight={'6'}
                                color={'primary'}
                                align={'center'} />
                    </View>
                    <View style={Style.headerRight}>
                        <ModalClose onPress={props.onPress} />
                    </View>
                </View>
                <ScrollView style={styles.chunkWrap}>
                    {
                        chunkData?
                            /*청크상세 정보 있을때*/
                            <>
                                <ChunkThumb data={chunkData} />
                                {
                                    chunkData.episode_id ?
                                        /*episode_id 있을때*/
                                        <ChunkButton data={chunkData}/>
                                        :
                                        null
                                }
                            </>
                            :
                            null
                    }
                    {/*<ChunkStory data={chunkData} />*/}
                </ScrollView>
                </SafeAreaView>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    chunkWrap: {
        backgroundColor: Colors.background
    },
    chunkButtonBox: {
        paddingVertical: 20,
        paddingHorizontal: 25
    },
    chunkButton: {
        marginBottom: 10
    },
})

export default memo(ModalChunk);
