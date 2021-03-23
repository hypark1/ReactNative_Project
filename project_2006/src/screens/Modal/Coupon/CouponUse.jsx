import React, { memo, useState, useCallback, useContext, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setLoad, setCoupon } from '~/actions'
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import AnalyticsSet from "~/modules/AnalyticsSet";
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyButton from "~/component/MyButton";
import MyAlert from "~/component/MyAlert";
import CouponUseList from "~/screens/Modal/Coupon/CouponUseList";
import CouponContext from "~/screens/Coupon/CouponContext";

const { t } = I18n;

/*이용권 사용하기 팝업*/
const CouponUse = (props) => {
    const [userChk, setUserChk] = useState(null);
    const [learner, setLearner] = useState([]);
    const device_id = useSelector((store) => store.reducer.device_id);
    const coupon = useSelector((store) => store.reducer.coupon);
    const dispatch = useDispatch();
    const { change } = useContext(CouponContext);

    useEffect(() => {
        GetLearnerCoupon();
    }, [coupon]);

    /*이용권 사용 가능한 학습자 리스트 가져오기*/
    const GetLearnerCoupon = useCallback(() => {
        let data = {
            gamifiedServiceId: props.data.gamified_service_id
        }
        Http({
            method: 'GET',
            url: '/learner/coupon',
            params: data
        })
            .then(response => {
                if (response.request.status === 200) {
                    let resData = JSON.parse(response.request._response);
                    setLearner(resData);
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, []);

    /*학습자 선택*/
    const ClickUser = useCallback((idx) => {
        setUserChk(idx);
    }, []);

    /*확인 클릭시 학습자 선택 확인*/
    const submitUser = useCallback(() => {
        if (userChk !== null) {
            /*선택한 학습자 있을때*/
            PutCoupon();
        } else {
            /*선택한 학습자 없을때*/
            MyAlert(t('coupon.use.null'));
        }
    }, [userChk]);

    /*이용권 적용하기*/
    const PutCoupon = useCallback(() => {
        AnalyticsSet('click', 'Coupon_Use');
        let data = {
            coupon_code: props.data.coupon_code,
            device_id: device_id,
            learner_id: learner[userChk].learner_id
        }
        Http({
            method: 'PUT',
            url: '/coupon',
            data: data
        })
            .then(response => {
                dispatch(setCoupon(!coupon));
                MyAlert(t('coupon.use.done'));
                /*이용권 사용하기 팝업 닫기*/
                props.onPress();
                /*이용권 리스트 새로고침*/
                change();
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, [props.data, device_id, learner, userChk, coupon]);

    return (
        <>
            <View style={styles.textBox}>
                <MyText text={t('coupon.use.text')}
                        size={'md'}
                        weight={'5'} />
            </View>
            <CouponUseList value={userChk}
                           data={learner}
                           onPress={ClickUser} />
            <View style={styles.button}>
                <MyButton text={t('alert.ok')}
                          type={'primary'}
                          onPress={submitUser} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    textBox: {
        alignItems: 'center',
        marginBottom: 15
    },
    button: {
        marginTop: 20,
    }
})

export default memo(CouponUse);
