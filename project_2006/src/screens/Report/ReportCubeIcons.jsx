import React, { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import MyImg from "~/component/MyImg";
import MyText from "~/component/MyText";

const cubeArr = ['1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '2.3', '2.4'];

/*큐브 아이콘*/
const ReportCubeIcons = (props) => {
    /*아이콘 상단 text*/
    const SetCubTextDom = useCallback(() => {
        let dom;
        if (props.index === props.cubeIdx) {
            /*현재 진행중인 큐브일때*/
            dom = (
                <MyText text={'CUBE ' + props.item}
                          size={'xxs'}
                          color={'reportOn'}
                          style={styles.cubeText} />
            )
        } else {
            /*현재 진행중인 큐브X*/
            dom = (
                <MyText text={props.item}
                        size={'xxs'} />
            )
        }
        return dom;
    }, []);

    /*큐브 아이콘 dom*/
    const SetCubeIconDom = useCallback(() => {
        let dom;
        if (props.index < props.cubeIdx) {
            /*진행한 큐브*/
            dom = <MyImg src={require('~/assets/images/cube_on.png')}
                         style={styles.cubeIcon}/>
        } else if (props.index === props.cubeIdx) {
            /*진행중인 큐브*/
            dom = <MyImg src={require('~/assets/images/cube_now.png')}
                         style={styles.cubeIcon}/>
        } else {
            /*진행안한 큐브*/
            dom = <MyImg src={require('~/assets/images/cube_off.png')}
                         style={styles.cubeIcon}/>
        }
        return dom;
    }, []);

    /*큐브 아이콘 사이 line*/
    const SetCubeLineDom = useCallback(() => {
        let dom = null;
        if (cubeArr.length -1 > props.index) {
            /*진행중인 큐브 index보다 기본 큐브 마지막 index가 더 클때*/
            if (props.index < props.cubeIdx) {
                /*진행한 큐브*/
                dom = <MyImg src={require('~/assets/images/cube_connect_on.png')}
                             style={styles.cubeLine}/>
            } else {
                /*진행할 큐브*/
                dom = <MyImg src={require('~/assets/images/cube_connect.png')}
                             style={styles.cubeLine}/>
            }
        }
        return dom;
    }, []);

    return (
        <>
            <View key={props.item}
                  style={styles.cubeList}>
                { SetCubTextDom()}
                <View style={styles.cubeIconBox}>
                    { SetCubeIconDom() }
                    { SetCubeLineDom() }
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
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
})


export default memo(ReportCubeIcons);
