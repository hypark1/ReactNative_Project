import React, { memo, useEffect, useState, useContext, useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MyImg from "~/component/MyImg";
import MyText from "~/component/MyText";
import ReportCubeIcons from '~/screens/Report/ReportCubeIcons'
import ReportContext from "~/screens/Report/ReportContext";
import Colors from "~/styles/Colors";
import Fonts from "~/styles/Fonts";

const cubeArr = ['1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '2.3', '2.4'];

const width = 524;
const height = 60;
const screenWidth = Dimensions.get('window').width;
const imgWidth = (screenWidth /6) *4;
const scaleFactor = width / imgWidth;
const imgHeight = height / scaleFactor;

/*리포트 상단 큐브 그림*/
const ReportCube = (props) => {
    const [idx, setIdx] = useState(null);
    const [cubeName, setCubeName] = useState('');
    const [cubeStory, setCubeStory] = useState('');
    const [cubeEpisode, setCubeEpisode] = useState('');
    const { data } = useContext(ReportContext);

    useEffect(() => {
        if (data.info.learning_report) {
            /*리포트 정보 있을때*/
            let report = data.info.learning_report
            if (report.cube) {
                /*큐브 정보 있을때*/
                const cube = report.cube;
                setCubeName(cube);
                const story = ('0' + report.story).slice(-2); // 두자리 숫자로 만들기
                setCubeStory(story);
                const episode = ('0' + report.episode).slice(-2);
                setCubeEpisode(episode);
                const cubeIdx = () => {
                    for (let i =0; i<cubeArr.length; i++) {
                        if (cubeArr[i] === cube) {
                            return i;
                        }
                    }
                }
                /*현재 큐브의 index 저장*/
                setIdx(cubeIdx);
            } else {
                /*큐브 정보 없을때*/
                setCubeName(0);
                setCubeStory('00');
                setCubeEpisode('00');
                setIdx(null);
            }
        }
    }, [data]);

    /*상단 어두운 큐브 아이콘 있는 영역*/
    const SetCubeDom = useCallback(() => {
        let dom = cubeArr.map((item, index) => {
            return (
                <View key={index}>
                    <ReportCubeIcons item={item}
                                     index={index}
                                     cubeIdx={idx} />
                </View>
            )
        })
        return dom;
    }, [idx, data]);

    return (
        <>
                <View style={styles.container}>
                    <View style={styles.cubeListBox}>
                        <SetCubeDom />
                    </View>
                    <MyImg src={require('~/assets/images/cube_progress.png')}
                           style={styles.cubeWhiteBox}
                           resizeMode="contain" />
                    <View style={styles.cubeInfoBox}>
                        <MyText text={'CUBE ' + cubeName}
                                size={'xs'}
                                weight={'7'}
                                style={styles.cubeTitle} />
                        <MyText text={'STORY'}
                                en={true}
                                style={styles.cubeSubTitle}/>
                        <MyText text={cubeStory}
                                en={true}
                                style={[styles.cubeSubNum, { marginRight: 8 }]} />
                        <MyText text={'EPISODE'}
                                en={true}
                                style={styles.cubeSubTitle}/>
                        <MyText text={cubeEpisode}
                                en={true}
                                style={styles.cubeSubNum} />
                    </View>
                </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#303030',
        alignItems: 'center',
        paddingTop: 20
    },
    cubeListBox: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cubeList: {
        alignItems: 'center',
        width: 40
    },
    cubeText: {
        width: '130%'
    },
    cubeIconBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cubeIcon: {
        width: 38,
        height: 38
    },
    cubeLine: {
        width: 8,
        height: 8,
        marginHorizontal: -3
    },
    cubeWhiteBox: {
        width: imgWidth,
        height: imgHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cubeInfoBox: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 4,
        alignItems: 'center'
    },
    cubeTitle: {
        marginRight: 17
    },
    cubeSubTitle: {
        marginRight: 3,
        fontSize: Fonts.size['xxs'],
        fontFamily: Fonts.weight['5']
    },
    cubeSubNum: {
        fontSize: Fonts.size['xxs'],
        fontFamily: Fonts.weight['5'],
        color: Colors.blue
    }
})


export default memo(ReportCube);
