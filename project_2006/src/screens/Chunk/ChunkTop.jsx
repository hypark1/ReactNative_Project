import React, {useCallback, useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import I18n from "~/locales/I18n";
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import MyText from "~/component/MyText";
import ChunkContext from "~/screens/Chunk/ChunkContext";
import Colors from "../../styles/Colors";
import MyImg from "../../component/MyImg";

const { t } = I18n;

const ChunkTop = (props) => {
    const [icon, setIcon] = useState(false);
    const [point, setPoint] = useState(0);
    const { dataMd, learner } = useContext(ChunkContext);

    useEffect(() => {
        GetPointBalance();
    }, [learner, dataMd]);

    /*포인트 잔액 조회*/
    const GetPointBalance = useCallback(() => {
        Http({
            method: 'GET',
            url: '/point/balance',
        })
            .then(response => {
                if (response.request.status === 200) {
                    let res = JSON.parse(response.request._response);
                    if (res !== {}) {
                        setPoint(res.point);
                    }
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, []);

    /*포인트 획득 가능한 청크 에피소드아이디 배열 추출*/
    const PointY = useCallback(() => {
        let gainFilter = dataMd.filter((item) => {
            return item.is_gain_point === 'n'
        })
        let episodeIds = gainFilter.map((item) => {
            return item.episode_id
        })
        return episodeIds
    }, [dataMd]);

    /*포인트 보상 얻기 - 일괄*/
    const PostPointMulti = useCallback(() => {
        let value = {
            'episode_id': PointY()[0],
            'episode_ids': '[' + PointY() + ']',
            'game_type': learner.gamified_service_id === 1 ? 'h1' : 'hm',
            'learner_id': learner.learner_id,
            'point': 10
        }
        Http({
            method: 'POST',
            url: '/point/multi',
            data: value,
        })
            .then(response => {
                if (response.request.status === 200) {
                    props.refresh();
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, [dataMd]);

    /*모두 적립하기 클릭*/
    const ClickAllPoint = useCallback(() => {
        if (dataMd.length > 0) {
            Alert.alert(t('alert.title'), t('alert.point'), [
                    { text: t('alert.no'), },
                    { text: t('alert.ok'),
                        onPress: () => PostPointMulti(),
                    }
                ],
                { cancelable: false }
            );
        }
    }, [dataMd]);

    /*적립 포인트 클릭시 툴팁 토글*/
    const ClickNowPoint = useCallback(() => {
        setIcon(!icon);
    }, [icon]);

    return (
        <>
            <View style={styles.chunkTop}>
                <TouchableOpacity activeOpacity={1}
                                  style={[styles.chunkTopLeft, PointY().length > 0 ? styles.chunkTopLeftOn : styles.chunkTopLeftOff]}
                                  onPress={ClickAllPoint}>
                    {
                        PointY().length > 0 ?
                        <MyImg src={require('~/assets/images/chunk_pointBtn_on.png')}
                            style={styles.chunkBtnIcon}/>
                            :
                        <MyImg src={require('~/assets/images/chunk_pointBtn_off.png')}
                        style={styles.chunkBtnIcon} />
                    }
                    <MyText text={t('chunk.point.all')}
                            weight={'7'}
                            color={PointY().length > 0 ? 'primaryLine' : 'grayText'}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1}
                                  style={styles.chunkTopRight}
                                  onPress={ClickNowPoint}>
                    <MyImg src={require('~/assets/images/chunk_point_explain.png')}
                           style={styles.chunkExplain} />
                    <MyText text={t('chunk.point.now')}
                            size={'sm'}
                            weight={'5'}
                            color={'black'}
                            style={styles.chunkTopText} />
                    <MyText text={point? point + 'P' : '0P'}
                            size={'xl'}
                            weight={'7'}
                            color={'black'} />
                </TouchableOpacity>
                {
                    icon?
                    <View style={styles.tooltipBox}>
                        <MyImg src={require('~/assets/images/chunk_point_tooltip.png')}
                               resizeMode={'cover'}
                               style={styles.tooltipTop} />
                        <MyText text={'적립 포인트에 대한 설명이 들어갑니다. 적립 포인트에 대한 설명이 들어갑니다. 적립 포인트에 대한 설명이 들어갑니다. 적립 포인트에 대한 설명이 들어갑니다. '}
                                color={'black'} style={styles.tooltipText} />
                    </View>
                        :
                        null
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    chunkTop: { 
        paddingHorizontal: 16,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    chunkTopLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderWidth: 2,
        borderRadius: 7
    },
    chunkTopLeftOn: {
        backgroundColor: Colors.white,
        borderColor: Colors.primaryLine,
    },
    chunkTopLeftOff: {
        backgroundColor: Colors.grayBack,
        borderColor: Colors.grayLine,
    },
    chunkTopRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    chunkTopText: {
        marginRight: 7
    },
    chunkBtnIcon: {
        width: 20,
        height: 20,
        marginRight: 7
    },
    chunkExplain: {
        width: 18,
        height: 18,
        marginRight: 5
    },
    tooltipBox: {
        position: 'absolute',
        top: 38,
        right: 16,
        zIndex: 9,
        backgroundColor: Colors.tooltip,
        padding: 20,
        width: '60%'
    },
    tooltipTop: {
        position: 'absolute',
        width: '100%',
        height: 10,
        top: -10,
        left: 30
    },
    tooltipText: {
        lineHeight: 19
    }
})

export default ChunkTop;
