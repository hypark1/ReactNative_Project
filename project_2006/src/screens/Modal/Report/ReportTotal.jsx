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
const windowSize = Dimensions.get('window');
const imgWidth = (windowSize.width /5 * 4) + 10;

/*일 평균 학습시간 팝업*/
const ReportTotal = (props) => {
    const sampleData = [
        {x: '10', y: 50, label: '',},
        {x: '20', y: 40, label: '',},
        {x: '30', y: 50, label: '',},
        {x: '40', y: 100, label: '',},
        {x: '50', y: 80, label: '',},
        {x: '60', y: 50, label: '',},
        {x: '70', y: 20, label: '',},
        {x: '80', y: 50, label: '',},
        {x: '90', y: 120, label: '',},
        {x: '100', y: 50, label: '',},
    ]
    return (
        <>
            <ScrollView style={Style.ModalReviewHeight}>
                <View style={{ marginLeft: -10, position: 'relative' }}>
                    <MyText text={'(명)'} size={'xxs'} style={{ position: 'absolute', bottom: 60 + ( 120 * 2), left: 17 }}/>
                    <View style={{ marginTop: -20, marginBottom: -18 }}>
                        <VictoryChart theme={VictoryTheme.material} width={imgWidth} height={350}
                                      domainPadding={10} style={{ margin: 0, padding: 0 }}>
                            <VictoryBar style={{ data: { fill: Colors.blue } }}
                                        data={sampleData} />
                        </VictoryChart>
                    </View>
                    <MyText text={'(분)'} size={'xxs'} align={'right'} style={{ marginRight: 7 }} />
                    <View style={{ position: 'absolute', bottom: 45 + ( 80 * 2), left: '44%', alignItems: 'center' }}>
                        {/* 12 , 20, 28, 36, 44, 52, 61, 69, 77, 85 */}
                        <MyText text={'48분'} color={'blue'} weight={'5'} />
                        <MyImg src={require('~/assets/images/chart_point.png')}
                               style={{ width: 50, height: 50 }} />
                    </View>
                </View>
                <MyText text={'*같은 해에 태어난 또래 학습자들의 통계입니다.'}
                        size={'xxs'}
                        align={'right'}
                        color={'lightGray'}
                        style={{ marginTop: 10 }} />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
})

export default memo(ReportTotal);
