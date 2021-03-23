import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import I18n from "~/locales/I18n";
import numReplace from "~/modules/numReplace";
import MySelectBox from "~/component/MySelectBox";
import ReportContext from "~/screens/Report/ReportContext";
import ReportTitle from "~/screens/Report/ReportTitle";
import {useSelector} from "react-redux";

const { t } = I18n;

const CardList = [
    {
        src: require('~/assets/images/all_day.png'),
        title: t('report.total.learning_days'),
        day: '',
        text: '',
        color: 'blue'
    },
    {
        src: require('~/assets/images/all_period.png'),
        title: t('report.total.learning_time'),
        day: '',
        text: '',
        color: 'yellow',
        //button: '상세보기'
    },
    {
        src: require('~/assets/images/all_sentences.png'),
        title: t('report.total.learning_sentence'),
        day: '',
        text: '',
        color: 'orange'
    },
]

const yearArr = ['2019년', '2020년', '2021년'];
const monthArr = ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'];

/*월별현황*/
const ReportMonth = (props) => {
    const [monthVisible, setMonthVisible] = useState(false);
    const [card, setCard] = useState([]);
    const { ChangeYear, ChangeMonth, data } = useContext(ReportContext);
    const learner_name = useSelector((store) => store.reducer.learner_name);

    useEffect(() => {
        CardList[1].onPress = OpenMonth;
        if (data.info.learning_report) {
            let report = data.info.learning_report;
            CardList[0].day = numReplace(report.learning_days) + t('report.day');
            CardList[1].day = report.learning_time? report.learning_time : t('report.total.oooo');
            CardList[1].text = t('report.total.learning_time_text', { time: (report.average_learning_time? report.average_learning_time : t('report.total.oooo')) });
            CardList[2].day = numReplace(report.learning_sentence) + t('report.count');
        }
        setCard(CardList);
    }, [data])


    const OpenMonth = useCallback(() => {
        setMonthVisible(true);
    }, []);

    const CloseMonth = useCallback(() => {
        setMonthVisible(false);
    }, []);

    const YearChange = (value) => {
        let idx = value;
        if (idx) {
            ChangeYear(idx);
        }
    }

    const MonthChange = (value) => {
        let idx = value;
        if (idx) {
            ChangeMonth(idx);
        }
    }

    return (
        <>
            <View style={{ marginTop: 30 }}>
                <ReportTitle title={t('report.month.title')}
                             text={props.year + '.' + props.month} />
                <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
                    <MySelectBox list={yearArr}
                                 value={props.year + t('report.month.year')}
                                 onPress={YearChange} />
                    <MySelectBox list={monthArr}
                                 value={props.month + t('report.month.month')}
                                 onPress={MonthChange} />
                    <View style={{ flex: 1 }} />
                </View>
                { props.SetCardsDom(card) }
            </View>
        </>
    );
}

export default memo(ReportMonth);
