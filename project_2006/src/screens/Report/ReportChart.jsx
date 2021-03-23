import React, {memo, useState, useEffect, useContext, useCallback} from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryPie, VictoryLabel, VictoryAxis, VictoryLegend } from "victory-native";
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import ReportContext from "~/screens/Report/ReportContext";
import ReportTitle from "~/screens/Report/ReportTitle";
import Colors from "~/styles/Colors";
import Fonts from "~/styles/Fonts";
import Style from "~/styles/Style";

const { t } = I18n;

/*차트 기본 셋팅*/
const chartColor = ['#f27318', '#b1c42c', '#64bfc0', '#ffb420', '#a0a0a0' ];

const ChartPieStyle = {
    data: {
        fillOpacity: 1, stroke: "#fff", strokeWidth: 2
    },
    labels: {
        fontSize: Fonts.size.xs, fill: Colors.white
    }
}

const chartConfig = [
    {x: 1, y: 0, label: '0%', text: t('report.chart.talking')},
    {x: 2, y: 0, label: '0%', text: t('report.chart.test')},
    {x: 3, y: 0, label: '0%', text: t('report.chart.word_sentence')},
    {x: 4, y: 0, label: '0%', text: t('report.chart.talking_review')},
    {x: 5, y: 0, label: '0%', text: t('report.chart.etc')}
];

/*리포트 차트*/
const ReportChart = (props) => {
    const [chartDataConfig, setChartDataConfig] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [chartColorConfig, setChartColorConfig] = useState([]);
    const { data } = useContext(ReportContext);

    useEffect(() => {
        /*기본 정보 지우기*/
        setChartDataConfig([]);
        setChartColorConfig([]);
        if (data.attendance) {
            /*전체학습현황 있을때*/
            let report = data.info.learning_report;
            /*값들을 숫자로 변경*/
            let talking = Number(report.percentage_talking.replace('%',''));
            let test = Number(report.percentage_test.replace('%',''));
            let word_sentence = Number(report.percentage_word_sentence.replace('%',''));
            let talking_review = Number(report.percentage_talking_review.replace('%',''));
            let etc = Number(report.percentage_etc.replace('%',''));
            chartConfig[0].y = talking;
            chartConfig[0].label = talking + '%';
            chartConfig[1].y = test;
            chartConfig[1].label = test + '%';
            chartConfig[2].y = word_sentence;
            chartConfig[2].label = word_sentence + '%';
            chartConfig[3].y = talking_review;
            chartConfig[3].label = talking_review + '%';
            chartConfig[4].y = etc;
            chartConfig[4].label = etc + '%';
            setChartData(chartConfig);

            let arr = [];
            let color = [];
            if (talking > 0) {
                chartConfig[0].y = talking;
                chartConfig[0].label = talking + '%';
                arr.push(chartConfig[0]);
                color.push(chartColor[0]);
            }
            if (test > 0) {
                chartConfig[1].y = test;
                chartConfig[1].label = test + '%';
                arr.push(chartConfig[1]);
                color.push(chartColor[1]);
            }
            if (word_sentence > 0) {
                chartConfig[2].y = word_sentence;
                chartConfig[2].label = word_sentence + '%';
                arr.push(chartConfig[2]);
                color.push(chartColor[2]);
            }
            if (talking_review > 0) {
                chartConfig[3].y = talking_review;
                chartConfig[3].label = talking_review + '%';
                arr.push(chartConfig[3]);
                color.push(chartColor[3]);
            }
            if (etc > 0) {
                chartConfig[4].y = etc;
                chartConfig[4].label = etc + '%';
                arr.push(chartConfig[4]);
                color.push(chartColor[4]);
            }
            setChartDataConfig(arr);
            setChartColorConfig(color);
        }
    }, [data]);

    /*차트 하단 설명 dom*/
    const ChartLabelBox = useCallback((props) => {
        const { idx } = props;

        return (
            <View style={styles.chartLabelBox}>
                <View style={[{ backgroundColor: chartColor[idx]}, styles.chartLabelDot]} />
                <MyText text={chartData[idx].text} />
            </View>
        )
    }, [props, chartData]);

    /*차트 dom*/
    const SetChartDom = useCallback(() => {
        let dom
        if (chartDataConfig.length > 0) {
            /*차트 정보 있을때*/
            dom = (
                <>
                    <VictoryPie
                        width={250}
                        height={250}
                        data={chartDataConfig}
                        padding={0}
                        labelRadius={90}
                        animate={{ duration: 2000 }}
                        colorScale={chartColorConfig}
                        style={ChartPieStyle}
                        labelComponent={
                            <VictoryLabel verticalAnchor="middle" textAnchor="middle" />
                        } />
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View style={{  flexDirection: 'row', flex: 1 }}>
                            <ChartLabelBox idx={0} />
                            <ChartLabelBox idx={1} />
                            <ChartLabelBox idx={2} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{  flexDirection: 'row', flex: 1 }}>
                            <ChartLabelBox idx={3} />
                            <ChartLabelBox idx={4} />
                            <View style={{ flex: 1 }} />
                        </View>
                    </View>
                </>
            )
        } else {
            /*차트 정보 없을때*/
            dom = <MyText text={t('report.chart.none')} />
        }
        return dom;
    }, [chartDataConfig, chartColorConfig]);

    return (
        <>
            <View style={styles.chartBox}>
                <ReportTitle title={t('report.chart.title')} />
                <View style={Style.reportCardBox}>
                    <View style={styles.chartPie}>
                        <SetChartDom />
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    chartBox: {
        marginTop: 30
    },
    chartPie: {
        alignItems: 'center',
        padding: 20
    },
    chartLabelBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    chartLabelDot: {
        width: 10,
        height: 10,
        marginRight: 5
    }
})

export default memo(ReportChart);
