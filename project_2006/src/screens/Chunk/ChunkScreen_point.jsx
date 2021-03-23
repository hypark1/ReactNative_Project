import React, {useCallback, useState, useEffect, useRef} from 'react';
import {View, SafeAreaView, StyleSheet, BackHandler, ToastAndroid, Platform, TouchableOpacity} from 'react-native';
import RNSecureKeyStore from "react-native-secure-key-store";
import { useDispatch, useSelector } from "react-redux";
import { setPush, setLoad } from '~/actions'
import I18n from "~/locales/I18n";
import Http from "~/modules/Http";
import ErrorSet from "~/modules/ErrorSet";
import AnalyticsSet from "~/modules/AnalyticsSet";
import MyText from "~/component/MyText";
import MyHeader from '~/component/MyHeader';
import ChunkContext from "~/screens/Chunk/ChunkContext";
import ChunkListMd from "~/screens/Chunk/ChunkListMd";
import ChunkListLg from "~/screens/Chunk/ChunkListLg";
import ChunkListSm from "~/screens/Chunk/ChunkListSm";
import ChunkTap from "~/screens/Chunk/ChunkTap";
import ModalChunk from "~/screens/Modal/Chunk/ModalChunk";
import Colors from "~/styles/Colors";
import Style from "~/styles/Style";
import ChunkTop from "./ChunkTop";

const { t } = I18n;

const ChunkScreen = (props) => {
    const [chunkVisible, setChunkVisible] = useState(false);
    const [chunkIdx, setChunkIdx] = useState(0);
    const [index, setIndex] = useState(0);
    const [exitApp, setExitApp] = useState(undefined);
    const [chunkData, setChunkData] = useState([]);
    const [chunkDataMd, setChunkDataMd] = useState([]);
    const [modalValue, setModalValue] = useState(null);
    const [modalLearner, setModalLearner] = useState(null);
    const push = useSelector((store) => store.reducer.push);
    const learner_name = useSelector((store) => store.reducer.learner_name);
    const route = useSelector((store) => store.reducer.route);
    const dispatch = useDispatch();
    const timeout = useRef();

    /*뒤로가기 버튼 눌렀을때*/
    const backPressed = () => {
        // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
        if (props.navigation.isFocused()) {
            if (exitApp == undefined || !exitApp) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(t('alert.exit'), ToastAndroid.SHORT);
                }
                setExitApp(true);

                timeout.current = setTimeout(() => {
                    setExitApp(false);
                },2000);
            } else {
                clearTimeout(timeout.current);
                BackHandler.exitApp();  // 앱 종료
            }
            return true;
        }
    }

    /*뒤로가기 연속 눌렀을때 꺼짐*/
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backPressed);

        return () => {
            //setExitApp(false);
            BackHandler.removeEventListener('hardwareBackPress', backPressed);
        }
    }, [exitApp]);

    useEffect(() => {
        RNSecureKeyStore.get('GSP')
            .then((res) => {
                if (JSON.parse(res).token !== null) {
                    if (push !== null) {
                        setChunkVisible(true);
                        setChunkIdx(push.episode_id);
                        let learner_name = {
                            learner_id: push.learner_id,
                            gamified_service_id: push.gamified_service_id
                        }
                        setModalLearner(learner_name);
                        setModalValue({episode_id: push.episode_id})
                        dispatch(setPush(null));
                    }
                }
            }, (err) => {
                console.log(err);
            });
    }, [push]);

    useEffect(() => {
        if (learner_name && route === 'Chunk') {
            AnalyticsSet('screen', 'Chunk_PV');
            console.log('ChunkScreen')
            if (learner_name.gamified_service_id) {
                GetChunkList();
                setModalLearner(learner_name);
                return;
            }
            setChunkData([]);
        }
    }, [route, learner_name]);

    /*청크 상세 열기*/
    const OpenChunk = useCallback((value, idx) => {
        AnalyticsSet('screen', 'Chunk_Detail_PV');
        setChunkVisible(true);
        setChunkIdx(value);
        setIndex(idx);
        setModalValue(chunkData[idx])
    }, [chunkData]);

    /*청크 상세 닫기*/
    const CloseChunk = useCallback(() => {
        setChunkVisible(false);
    }, []);

    const ModalChunkError = useCallback(() => {
        setModalLearner(null);
        setModalValue(null)
    }, []);

    const SetListLayout = useCallback(() => {
        let dom;
        if (chunkData.length > 0) {
            dom = <ChunkListMd onPress={OpenChunk}
                               refresh={GetChunkList} />
        } else {
            dom = <View style={styles.chunkNull}>
                      <MyText text={t('chunk.none')}
                                align={'center'}
                                size={'xm'}/>
                  </View>
        }
        return dom;
    }, [chunkData]);

    /*획득한 청크 목록 가져오기*/
    const GetChunkList = useCallback(() => {
        console.log('GetChunkList')
        let data = {
            learner_id: learner_name.learner_id,
            game_type: learner_name.gamified_service_id === 1 ? 'h1' : 'hm'
        }
        console.log(data)
        Http({
            method: 'POST',
            url: '/learner/chunks',
            data: data,
        })
            .then(response => {
                if (response.request.status === 200) {
                    let res = JSON.parse(response.request._response);
                    if (JSON.stringify(chunkData) !== JSON.stringify(res)) {
                        setChunkData(res);
                        let arr = [...res];
                        if ((arr.length%2) === 1) {
                            arr.push({});
                        }
                        setChunkDataMd(arr);
                    }
                }
            })
            .catch(error => {
                ErrorSet(error, props.navigation);
            })
    }, [learner_name, chunkData]);

    /*청크 포인트 단일 획득시*/
    const ReplaceChunkData = useCallback((index) => {
        let arr = [...chunkDataMd];
        arr[index].is_gain_point = 'y'
        setChunkDataMd(arr);
    }, [chunkDataMd]);

    return (
        <>
            <SafeAreaView style={Style.SafeAreaView}>
                <MyHeader title={t('menu.chunk')} navigation={props.navigation} />
                <ChunkContext.Provider value={{data: chunkData, dataMd: chunkDataMd, learner: learner_name, ReplaceChunkData: ReplaceChunkData}}>
                    <View style={styles.container}>
                        <ChunkTop refresh={GetChunkList}/>
                        <View style={styles.chunkListBox}>
                            <SetListLayout />
                        </View>
                    </View>
                    <ModalChunk visible={chunkVisible}
                                onPress={CloseChunk}
                                value={modalValue}
                                idx={chunkIdx}
                                learner={modalLearner}
                                error={ModalChunkError} />
                </ChunkContext.Provider>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
        backgroundColor: Colors.background
    },
    chunkListBox: {
        flex: 8
    },
    chunkNull: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default ChunkScreen;
