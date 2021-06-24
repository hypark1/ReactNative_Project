import React from 'react';
import I18n from "~/locales/I18n";
import moment from 'moment';

const { t } = I18n;

/*시간 format*/
const DateFormat = (value) => {
    let yy = moment(value).format('YYYY'+t('play.time.year'));
    let mm = moment(value).format('M'+t('play.time.month'));
    let dd = moment(value).format('D'+t('play.time.date'));
    let aa = moment(value).format('A');
    let hh = moment(value).format('h'+t('play.time.hour'));
    let date = {
        yymmdd: yy + ' ' + mm + ' ' + dd + ' ',
        hh: (aa === 'AM'? t('play.time.AM'): t('play.time.PM')) + ' ' + hh + ' ',
    }
    return date;
};

export default DateFormat;
