import React, { useState, useCallback, useEffect } from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import AnalyticsSet from "~/modules/AnalyticsSet";
import I18n from "~/locales/I18n";
import MyHeader from '~/component/MyHeader';
import CouponList from "~/screens/Coupon/CouponList";
import CouponRegister from "~/screens/Coupon/CouponRegister";
import CouponContext from "~/screens/Coupon/CouponContext";
import Style from "~/styles/Style";

const { t } = I18n;

/*이용권 화면*/
const CouponScreen = (props) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        AnalyticsSet('screen', 'Coupon_PV');
        getCouponList();
    }, []);

    /*쿠폰 리스트 가져오기*/
    const getCouponList = useCallback(() => {
        Http({
            method: 'GET',
            url: '/coupon'
        })
            .then(response => {
                if (response.request.status === 200) {
                    let resData = JSON.parse(response.request._response);
                    setList(resData);
                }
            })
            .catch(error => {
                ErrorSet(error, props.navigation);
            })
    }, []);

    return (
        <>
            <SafeAreaView style={Style.SafeAreaView}>
                <MyHeader title={t('menu.coupon')} navigation={props.navigation} />
                <ScrollView>
                    <CouponContext.Provider value={{ data: list, change: getCouponList }}>
                        <CouponList />
                        <CouponRegister />
                    </CouponContext.Provider>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

export default CouponScreen;
