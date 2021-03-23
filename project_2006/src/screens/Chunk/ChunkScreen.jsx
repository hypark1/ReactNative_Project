import React, {useCallback, useState, useEffect, useRef} from 'react';
import { View, SafeAreaView, StyleSheet, BackHandler, ToastAndroid, Platform } from 'react-native';
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

const { t } = I18n;

/*청크 화면*/
const ChunkScreen = (props) => {
    const [tapVisible, setTapVisible] = useState([true, false, false]);
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

    const backPressed = useCallback(() => {
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
    }, [exitApp]);

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
                    /*로그인 토큰 있을때*/
                    if (push !== null && push.episode_id) {
                        /*푸시알림이 있을때*/
                        setChunkVisible(true); // 청크상세 노출
                        /*푸시알림으로 받은 정보로 변경*/
                        setChunkIdx(push.episode_id);
                        let learner_name = {
                            learner_id: push.learner_id,
                            gamified_service_id: push.gamified_service_id
                        }
                        setModalLearner(learner_name);
                        setModalValue({episode_id: push.episode_id});
                        /*푸시 정보 지우기*/
                        dispatch(setPush(null));
                    }
                }
            }, (err) => {
                console.log(err);
            });
    }, [push]);

    useEffect(() => {
        if (learner_name && route === 'Chunk') {
            /*학습자 정보가 있고, 청크 화면일때*/
            AnalyticsSet('screen', 'Chunk_PV');
            if (learner_name.gamified_service_id) {
                /*게임을 한 학습자만*/
                GetChunkList();
                setModalLearner(learner_name);
                return;
            }
            setChunkData([]);
        }
    }, [route, learner_name]);

    /*상단 탭 클릭*/
    const tapClick = (val) => {
        /*애널리틱스*/
        let text = ['Left', 'Middle', 'Right'];
        AnalyticsSet('click', 'Chunk_' + text[val] + '_Click');
        /*클릭한 index 만 true 되도록*/
        let visible = [false, false, false];
        visible[val] = true;
        setTapVisible(visible);
    };

    /*청크상세 열기*/
    const OpenChunk = useCallback((value, idx) => {
        AnalyticsSet('screen', 'Chunk_Detail_PV');
        setChunkVisible(true);
        setChunkIdx(value);
        setIndex(idx);
        setModalValue(chunkData[idx])
    }, [chunkData]);

    /*청크상세 닫기*/
    const CloseChunk = useCallback(() => {
        setChunkVisible(false);
    }, []);

    /*청크 상세가 정보가 없을때*/
    const ModalChunkNull = useCallback(() => {
        setModalLearner(null);
        setModalValue(null)
    }, []);

    /*리스트 레이아웃*/
    const SetListLayout = useCallback(() => {
        let dom;
        if (chunkData.length > 0) {
            /*학습한 청크가 있을때*/
            if (tapVisible[0]) {
                dom = (
                    <ChunkListLg onPress={OpenChunk}
                                   refresh={GetChunkList} />
                )
            } else if (tapVisible[1]) {
                dom = (
                    <ChunkListMd onPress={OpenChunk}
                                   refresh={GetChunkList} />
                )
            } else if (tapVisible[2]) {
                dom = (
                    <ChunkListSm onPress={OpenChunk}
                                   refresh={GetChunkList} />
                )
            }
        } else {
            /*학습한 청크가 없을때*/
            dom = (
                <View style={styles.chunkNull}>
                    <MyText text={t('chunk.none')}
                            align={'center'}
                            size={'xm'}/>
                </View>
            )
        }
        return dom;
    }, [tapVisible, chunkData]);

    /*학습한 청크 리스트 가져오기*/
    const GetChunkList = useCallback(() => {
        let data = {
            learnerid: learner_name.learner_id,
            serviceid: learner_name.gamified_service_id
        }
        Http({
            method: 'GET',
            url: '/learner/chunks',
            params: data,
        })
            .then(response => {
                if (response.request.status === 200) {
                    let res = JSON.parse(response.request._response);
                    if (JSON.stringify(chunkData) !== JSON.stringify(res.chunk_list)) {
                        /*이미 저장된 청크리스트와 지금 가져온 청크리스트가 다를때*/
                        setChunkData(res.chunk_list);
                        let arr = [...res.chunk_list];
                        if ((arr.length%2) === 1) {
                            /*청크리스트가 홀수일때 배열에 빈거 하나 추가 / 중간크기 리스트 마지막 설정때매*/
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

    return (
        <>
            <SafeAreaView style={Style.SafeAreaView}>
                <MyHeader title={t('menu.chunk')} navigation={props.navigation} />
                <ChunkContext.Provider value={{data: chunkData, dataMd: chunkDataMd, tapVisible: tapVisible}}>
                    <View style={styles.container}>
                        <ChunkTap onPress={tapClick} />
                        <View style={styles.chunkListBox}>
                            <SetListLayout />
                        </View>
                    </View>
                    <ModalChunk visible={chunkVisible}
                                onPress={CloseChunk}
                                value={modalValue}
                                idx={chunkIdx}
                                learner={modalLearner}
                                null={ModalChunkNull} />
                </ChunkContext.Provider>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
