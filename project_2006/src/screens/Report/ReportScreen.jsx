import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from "react-redux";
import I18n from "~/locales/I18n";
import Http from "~/modules/Http";
import ErrorSet from "~/modules/ErrorSet";
import AnalyticsSet from "~/modules/AnalyticsSet";
import MyHeader from '~/component/MyHeader';
import MyText from "~/component/MyText";
import ReportContext from "~/screens/Report/ReportContext";
import ReportTotal from "~/screens/Report/ReportTotal";
import ReportMonth from "~/screens/Report/ReportMonth";
import ReportChart from "~/screens/Report/ReportChart";
import ReportCube from '~/screens/Report/ReportCube';
import ReportCard from "~/screens/Report/ReportCard";
import LinkAccountInfo from "~/screens/Modal/Link/LinkAccountInfo";
import Colors from "~/styles/Colors";
import Style from "~/styles/Style";

const { t } = I18n;

const ReportScreen = (props) => {
    const [reportData, setReportData] = useState(null);
    const [learningDays, setLearningDays] = useState(0);
    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [infoArr, setInfoArr] = useState([]);
    const [infoArr2, setInfoArr2] = useState([]);
    const [comment, setComment] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const learner_name = useSelector((store) => store.reducer.learner_name);
    const route = useSelector((store) => store.reducer.route);

    useEffect(() => {
        if (route === 'Report') {
            AnalyticsSet('screen', 'Report_PV');
            ReportReset();
        }
    }, [route, learner_name]);

    /*새로고침*/
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ReportReset();
    }, []);

    /*리포트 정보 리셋*/
    const ReportReset = () => {
        if (learner_name) {
            /*학습자 있을때*/
            let date = new Date();
            let todayYear = date.getFullYear();
            let todayMonth = ('0' + (date.getMonth() + 1)).slice(-2);
            setYear(todayYear);
            setMonth(todayMonth);
            let data = {
                learner_id: learner_name.learner_id,
                gamified_service_id: learner_name.gamified_service_id,
                month: todayMonth,
                year: todayYear,
            }
            PostLearnerReport(data);
        } else {
            /*학습자 없을때*/
            setReportData({type: null})
        }
    }

    /*리포트 정보 가져오기*/
    const PostLearnerReport = (value) => {
        Http({
            method: 'POST',
            url: '/learner/report',
            data: value,
        })
            .then(response => {
                if (response.request.status === 200) {
                    let res = JSON.parse(response.request._response);
                    if (res.attendance && res.info.learning_report) {
                        /*리포트 정보 있을때*/
                        setReportData(res);
                        setLearningDays(res.info.learning_report.learning_days);
                        let info = res.info.comments;
                        if (info.length > 0) {
                            /*대화학습, 이해력학습 설명 있을때*/
                            let conversation = [];
                            let comprehension = [];
                            for (let i=0; i<info.length; i++) {
                                if (info[i].type === 'conversation') {
                                    /*대화학습*/
                                    conversation.push(info[i].comment);
                                } else {
                                    /*이해력학습*/
                                    comprehension.push(info[i].comment);
                                }
                                if (i === info.length-1) {
                                    /*마지막에 저장*/
                                    setInfoArr(conversation);
                                    setInfoArr2(comprehension);
                                }
                            }
                            setComment(true);
                        } else {
                            /*대화학습, 이해력학습 설명 없을때*/
                            setComment(false);
                        }
                    } else {
                        /*리포트 정보 없을때*/
                        setReportData({type: null});
                    }
                }
                setRefreshing(false);
            })
            .catch(error => {
                ErrorSet(error, props.navigation);
                setRefreshing(false);
            })
    }

    /*전체/월별 학습현황 dom*/
    const SetCardsDom = (value) => {
        let dom = value.map((item, index) => {
            return (
                <ReportCard src={item.src}
                            title={item.title}
                            day={item.day}
                            color={item.color}
                            text={item.text}
                            key={index}
                            button={item.button}
                            onPress={item.onPress}/>
            )
        });
        return dom;
    }

    /*월별 학습현황 년도 변경 클릭시*/
    const ChangeYear = (value) => {
        AnalyticsSet('click', 'Report_Change_Year_Click');
        let num = Number(value.slice(0,4));
        setYear(num);
        let data = {
            learner_id: learner_name.learner_id,
            gamified_service_id: learner_name.gamified_service_id,
            month: month,
            year: num,
        }
        PostLearnerReport(data);
    }

    /*월별 학습현황 월 변경 클릭시*/
    const ChangeMonth = useCallback((value) => {
        AnalyticsSet('click', 'Report_Change_Month_Click');
        let num = value.slice(0,2);
        setMonth(num);
        let data = {
            learner_id: learner_name.learner_id,
            gamified_service_id: learner_name.gamified_service_id,
            month: num,
            year: year,
        }
        PostLearnerReport(data);
    }, [learner_name, year])

    return (
        <>
            <SafeAreaView style={Style.SafeAreaView}>
                <MyHeader title={t('menu.report')} navigation={props.navigation} />
                {
                    reportData ?
                        reportData.type !== null ?
                        /*리포트 정보 있을때*/
                        <ScrollView style={{backgroundColor: Colors.white}}
                                    refreshControl={ <RefreshControl refreshing={refreshing}
                                                        onRefresh={onRefresh}/> }>
                            <ReportContext.Provider
                                value={{data: reportData, ChangeYear: ChangeYear, ChangeMonth: ChangeMonth}}>
                                <ReportCube/>
                                <View style={{padding: 20}}>
                                    <ReportTotal SetCardsDom={SetCardsDom}/>
                                    <ReportMonth SetCardsDom={SetCardsDom}
                                                 year={year}
                                                 month={month}/>
                                    <ReportChart/>
                                    {
                                        learningDays > 0 && comment ?
                                            /*월별 학습일이 0 이상이고, 대화학습, 이해력학습 설명이 있을때*/
                                            <>
                                                <View style={[Style.reportCardBox, {paddingHorizontal: 20}]}>
                                                    <LinkAccountInfo title={t('report.conversation')}
                                                                     data={infoArr}
                                                                     style={{marginRight: 20, marginBottom: 20}}/>
                                                    <LinkAccountInfo title={t('report.comprehension')}
                                                                     data={infoArr2}
                                                                     style={{marginRight: 20}}/>
                                                </View>
                                            </>
                                            :
                                            null
                                    }
                                </View>
                            </ReportContext.Provider>
                        </ScrollView>
                        :
                        /*리포트 정보 없을때*/
                        <View style={styles.chunkNull}>
                            <MyText text={t('report.none')}
                                    align={'center'}
                                    size={'xm'}/>
                        </View>
                    :
                    null
                }
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    selectBox: {
        flex: 0.4,
        marginVertical: 15,
    },
    chunkNull: {
        flex: 1,
        justifyContent: 'center'
    }
})


export default ReportScreen;
