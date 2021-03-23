import React, {memo, useState, useCallback, useEffect, useContext} from "react";
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import { useDispatch } from "react-redux";
import { setLoad } from '~/actions'
import I18n from "~/locales/I18n";
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import MyTextInput from "~/component/MyTextInput";
import MyAlert from "~/component/MyAlert";
import LinkAccountInfo from "~/screens/Modal/Link/LinkAccountInfo";
import DinoButton from "~/screens/Modal/Dino/DinoButton";
import LinkContext from "~/screens/Link/LinkContext";
import Colors from "~/styles/Colors";
import Fonts from "~/styles/Fonts";
import Style from "~/styles/Style";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLegend } from "victory-native";
import MyText from "../../../component/MyText";
import MyImg from "../../../component/MyImg";

const { t } = I18n;
const tdHeight= 25;

/*정오표 팝업*/
const ReportWork = (props) => {
    const SetTitleDom = (props) => {
        let height = props.title === '답변' ? 30 : 55
        return (
            <View style={[props.style, { backgroundColor: '#f7f7f7', borderRightWidth: 1, borderBottomWidth: 1, borderColor: Colors.line, justifyContent: 'center', alignItems: 'center', height: height }]}>
                <MyText text={props.title} />
            </View>
        )
    }

    const SetEpisodeDom = (props) => {
        let width = 80
        return (
            <View style={{ width: width, height: 25, borderBottomWidth: 1, borderRightWidth: 1, borderColor: Colors.line }}>
                <MyImg src={props.src} style={{ width: width, height: 21 }} />
            </View>
        )
    }

    const SetResultDom = (props) => {
        let result
        if (props.result === 'good') {
            result = require('~/assets/images/img_text_good.png')
        } else if (props.result === 'awesome') {
            result = require('~/assets/images/img_text_awesome.png')
        } else {
            result = require('~/assets/images/img_text_oops.png')
        }

        return (
            <View style={{ height: 25, borderBottomWidth: 1, borderRightWidth: 1, borderColor: Colors.line, justifyContent: 'center', alignItems: 'center' }}>
                <MyImg src={result} style={{ width: 70, height: 20 }} />
            </View>
        )
    }

    const SetSectionDom = (props) => {
        return (
            <View style={[styles.tableTd, styles.tableSection, { height: tdHeight * props.line, borderLeftWidth: 1, borderRightWidth: 1, borderColor: Colors.line }]}>
                <MyImg src={props.src}
                       style={{ flex: 1, height: 50 }} />
            </View>
        )
    }

    const SetTdDom = (props) => {
        return (
            <View style={[styles.tableTd, { flexDirection: 'row', borderRightWidth: 1, borderColor: Colors.line, justifyContent: 'center', alignItems: 'center', height: tdHeight }]}>
                <MyText text={props.text} size={'xxs'} />
            </View>
        )
    }

    const SetPercentDom = (props) => {
        return (
            <View style={{ backgroundColor: Colors.black, justifyContent: 'center', alignItems: 'center', height: 30, borderRightWidth: 1, borderColor: '#000' }}>
                <MyText text={props.percent + '%'} color={'white'} weight={'7'} size={'xs'}/>
            </View>
        )
    }

    return (
        <>
            <ScrollView style={Style.ModalReviewHeight}>
                <MyText text={'Cube 1.3 > Story 2. Amy’s True Friend'} align={'center'} weight={'6'} />
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flex: 2, borderTopWidth: 1, borderColor: Colors.line}}>
                        <SetTitleDom title={'섹션'} style={{ borderLeftWidth: 1, borderColor: Colors.line }} />
                        <SetSectionDom src={require('~/assets/images/img_text_section_01.png')} line={4} />
                        <SetSectionDom src={require('~/assets/images/img_text_section_02.png')} line={3} />
                        <SetSectionDom src={require('~/assets/images/img_text_section_03.png')} line={2} />
                        <SetSectionDom src={require('~/assets/images/img_text_section_04.png')} line={2} />
                        <SetSectionDom src={require('~/assets/images/img_text_section_05.png')} line={1} />
                        <SetSectionDom src={require('~/assets/images/img_text_section_06.png')} line={1} />
                        <View style={{ backgroundColor: Colors.black, justifyContent: 'center', alignItems: 'flex-end', height: 30 }}>
                            <MyText text={'정답율'} color={'white'} weight={'7'} size={'xs'}/>
                        </View>
                    </View>
                    <View style={{ flex: 1, borderTopWidth: 1, borderColor: Colors.line}}>
                        <SetTitleDom title={'문항'} />
                        <SetTdDom text={'1'} />
                        <SetTdDom text={'2'} />
                        <SetTdDom text={'3'} />
                        <SetTdDom text={'4'} />
                        <SetTdDom text={'1'} />
                        <SetTdDom text={'2'} />
                        <SetTdDom text={'3'} />
                        <SetTdDom text={'1'} />
                        <SetTdDom text={'2'} />
                        <SetTdDom text={'1'} />
                        <SetTdDom text={'2'} />
                        <SetTdDom text={'1'} />
                        <SetTdDom text={'1'} />
                        <View style={{ backgroundColor: Colors.black, justifyContent: 'center', alignItems: 'center', height: 30 }}>
                        </View>
                    </View>
                    <View style={{ flex: 3, borderTopWidth: 1, borderColor: Colors.line}}>
                        <SetTitleDom title={'답변'} />
                        <ScrollView horizontal={true} >
                            <View>
                                <SetEpisodeDom src={require('~/assets/images/img_text_episode01.png')} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetPercentDom percent={85} />
                            </View>
                            <View>
                                <SetEpisodeDom src={require('~/assets/images/img_text_episode02.png')} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetPercentDom percent={83} />
                            </View>
                            <View>
                                <SetEpisodeDom src={require('~/assets/images/img_text_episode03.png')} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetPercentDom percent={90} />
                            </View>
                            <View>
                                <SetEpisodeDom src={require('~/assets/images/img_text_episode04.png')} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetPercentDom percent={89} />
                            </View>
                            <View>
                                <SetEpisodeDom src={require('~/assets/images/img_text_episode05.png')} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetResultDom result={'opps'} />
                                <SetResultDom result={'good'} />
                                <SetPercentDom percent={72} />
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <MyText text={'* ‘OOPS’ 만 오답으로 처리됩니다.'} align={'right'} size={'xxs'} color={'lightGray'} style={{ marginTop: 10 }} />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    tableSection: {
        flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center'
    },
    tableTd: {
        borderBottomWidth: 1, borderColor: Colors.line
    },
})

export default memo(ReportWork);
