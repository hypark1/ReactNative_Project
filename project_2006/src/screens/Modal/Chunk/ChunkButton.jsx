import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';
import I18n from "~/locales/I18n";
import AnalyticsSet from "~/modules/AnalyticsSet";
import MyButton from "~/component/MyButton";
import ModalChunkGood from "~/screens/Modal/Chunk/ModalChunkGood";
import ModalChunkShare from "~/screens/Modal/Chunk/ModalChunkShare";

const { t } = I18n;

/*청크상세 버튼*/
const ChunkButton = (props) => {
    const [record, setRecord] = useState(false);
    const [recordDuration, setRecordDuration] = useState(0);
    const [native, setNative] = useState(false);
    const [nativeDuration, setNativeDuration] = useState(0);
    const [goodVisible, setGoodVisible] = useState(false);
    const [shareVisible, setShareVisible] = useState(false);
    const interval = useRef();

    let sound;
    if (props.data.sr_file_path) {
        /*학습자 녹음 음성 있을때*/
        sound = new Sound(props.data.sr_file_path, null, (error) => {
            if (error) {
                // do something
            }
            setRecordDuration(sound.getDuration())
        });
    }

    const sound2 = new Sound(props.data.audio_file_name, null, (error) => {
        if (error) {
            // do something
        }
        setNativeDuration(sound2.getDuration())
    });

    useEffect(() => {
        // componentDidMount, componentDidUpdate
        let Duration;
        if (record || native) {
            /*학습자 음성 || 원어민 음성이 재생되고있으면*/
            if (record) {
                /*학습자 음성 재생중*/
                Duration = recordDuration;
            } else if (native) {
                /*원어민 음성 재생중*/
                Duration = nativeDuration;
            }
            if (Duration < 1) {
                /*전체시간이 1초보다 짧으면*/
                Duration = 5;
            }
            interval.current = setTimeout(() => {
                /*음성 끝날때 stop*/
                StopRecord();
            }, Duration * 1000);
            return () => {
                //componentWillUnmount
                clearTimeout(interval.current);
            }
        }
    }, [record, native, recordDuration, nativeDuration]);

    /*음성 둘다 멈추기*/
    const StopRecord = useCallback(() => {
        if (props.data.sr_file_path) {
            sound.stop();
        }
        sound2.stop();
        setRecord(false);
        setNative(false);
    }, [sound, sound2]);

    /*학습자 음성듣기 클릭시*/
    const ClickRecordPlay = useCallback(() => {
        AnalyticsSet('click', 'Chunk_Detail_Record_Click');
        /*원어민 음성 멈춤*/
        sound2.stop();
        setNative(false);
        /*학습자 음성 재생*/
        if (props.data.sr_file_path) {
            sound.play();
        }
        setRecord(true);
    }, [sound, sound2]);

    /*원어민 음성듣기 클릭시*/
    const ClickNativePlay = useCallback(() => {
        AnalyticsSet('click', 'Chunk_Detail_Native_Click');
        /*학습자 음성 멈춤*/
        if (props.data.sr_file_path) {
            sound.stop();
        }
        setRecord(false);
        /*원어민 음성 재생*/
        sound2.play();
        setNative(true);
    }, [sound, sound2]);

    /*칭찬하기 버튼 클릭시*/
    const ClickGood = useCallback(() => {
        AnalyticsSet('click', 'Chunk_Detail_Compliment_Click');
        /*음성 둘다 멈추기*/
        StopRecord();
        /*칭찬하기 팝업 열기*/
        setGoodVisible(true);
    }, [sound, sound2]);

    /*공유하기 버튼 클릭시*/
    const ClickShare = useCallback(() => {
        AnalyticsSet('click', 'Chunk_Detail_Share_Click');
        /*음성 둘다 멈추기*/
        StopRecord();
        /*공유하기 팝업 열기*/
        setShareVisible(true);
    }, [sound, sound2]);

    /*칭찬하기 팝업 닫기*/
    const CloseGood = useCallback((val) => {
        setGoodVisible(false);
    }, []);

    /*공유하기 팝업 닫기*/
    const CloseShare = useCallback(() => {
        setShareVisible(false);
    }, []);

    return (
        <>
            <View style={styles.chunkButtonBox}>
                {
                    props.data.sr_file_path?
                        /*학습자 음성 있을때*/
                        <MyButton text={t('chunk.record')}
                                  img={record}
                                  src={require('~/assets/images/play.png')}
                                  type={'primary'}
                                  style={styles.chunkButton}
                                  onPress={ClickRecordPlay}/>
                        :
                        null
                }
                <MyButton text={t('chunk.native')}
                          img={native}
                          src={require('~/assets/images/play.png')}
                          type={'primary'}
                          style={styles.chunkButton}
                          onPress={ClickNativePlay}/>
                {
                    props.data.sr_file_path ?
                        /*학습자 음성 있을때*/
                        <MyButton text={t('chunk.good.title')}
                                  type={'white'}
                                  style={styles.chunkButton}
                                  onPress={ClickGood}/>
                        :
                        null
                }
                <MyButton text={t('chunk.share.title')}
                          type={'white'}
                          onPress={ClickShare}/>
            </View>
            <ModalChunkGood data={props.data}
                            visible={goodVisible}
                            onPress={CloseGood} />
            <ModalChunkShare data={props.data}
                             visible={shareVisible}
                             onPress={CloseShare} />
        </>
    );
};

const styles = StyleSheet.create({
    chunkButtonBox: {
        paddingVertical: 20,
        paddingHorizontal: 25
    },
    chunkButton: {
        marginBottom: 10
    },
})

export default memo(ChunkButton);
