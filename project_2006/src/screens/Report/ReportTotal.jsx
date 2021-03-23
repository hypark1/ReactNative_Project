import React, {memo, useCallback, useEffect, useState, useContext} from 'react';
import { View } from 'react-native';
import I18n from "~/locales/I18n";
import numReplace from "~/modules/numReplace";
import ReportContext from "~/screens/Report/ReportContext";
import ReportTitle from "~/screens/Report/ReportTitle";

const { t } = I18n;

const CardList = [
    {
        src: require('~/assets/images/all_day.png'),
        title: t('report.total.total') + t('report.total.learning_days'),
        day: '',
        //text: t('report.total.learning_days_text'),
        color: 'blue'
    },
    {
        src: require('~/assets/images/all_period.png'),
        title: t('report.total.total') + t('report.total.learning_time'),
        day: '',
        text: t('report.total.learning_time_text'),
        color: 'yellow',
        //button: '상세보기'
    },
    {
        src: require('~/assets/images/all_sentences.png'),
        title: t('report.total.total') + t('report.total.learning_sentence'),
        day: '',
        //text: t('report.total.learning_sentence_text'),
        color: 'orange'
    },
    {
        src: require('~/assets/images/continuous_longest.png'),
        title: t('report.total.recent_continue_days'),
        day: '',
        text: '',
        color: 'green'
    },
    /*{
        src: require('~/assets/images/acquire_chunk.png'),
        title: '획득한 청크 카드',
        day: '225개',
        text: '남은 청크 카드 수 210개',
        color: 'red'
    },
    {
        src: require('~/assets/images/finish_workbook.png'),
        title: '완료한 워크북',
        day: '12개 에피소드',
        text: '일 평균 1.2개 (1일 1개 에피소드 권장)',
        color: 'blue',
        //button: '정오표'
    }*/
]

const ReportTotal = (props) => {
    const [totalVisible, setTotalVisible] = useState(false);
    const [workVisible, setWorkVisible] = useState(false);
    const [totalDays, setTotalDays] = useState('');
    const [card, setCard] = useState([]);
    const { data } = useContext(ReportContext);

    useEffect(() => {
        CardList[1].onPress = OpenTotal;
        CardList[CardList.length -1].onPress = OpenWork;
        if (data.info.learning_report) {
            let report = data.info.learning_report;
            let attendance = data.attendance;
            CardList[0].day = numReplace(report.total_learning_days) + t('report.day');
            CardList[1].day = report.total_learning_time? report.total_learning_time : t('report.total.oooo');
            CardList[1].text = t('report.total.learning_time_text', { time: (report.average_total_learning_time? report.average_total_learning_time : t('report.total.oooo')) });
            CardList[2].day = numReplace(report.total_learning_sentence) + t('report.count');
            CardList[3].day = attendance.recent_continuous_attendance_days + t('report.day');
            CardList[3].text = t('report.total.recent_continue_days_text') + attendance.highest_continuous_attendance_days + t('report.day') + ' (' + attendance.highest_continuous_attendance_from + '~)';
            setTotalDays(attendance.attendance_start_date + ' ~ ' + attendance.attendance_end_date);
        }
        setCard(CardList);
    }, [data]);

    const OpenTotal = useCallback(() => {
        setTotalVisible(true);
    }, []);

    const CloseTotal = useCallback(() => {
        setTotalVisible(false);
    }, []);

    const OpenWork = useCallback(() => {
        setWorkVisible(true);
    }, []);

    const CloseWork = useCallback(() => {
        setWorkVisible(false);
    }, []);

    return (
        <>
            <View style={{ marginTop: 10 }}>
                <ReportTitle title={t('report.total.title')}
                             text={totalDays} />
                { props.SetCardsDom(card) }
            </View>
        </>
    );
}

export default memo(ReportTotal);
