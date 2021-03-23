import React, { memo, useCallback, useState, useContext } from "react";
import { StyleSheet, View } from 'react-native';
import { useSelector } from "react-redux";
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import AnalyticsSet from "~/modules/AnalyticsSet";
import I18n from "~/locales/I18n";
import MyTextInput from "~/component/MyTextInput";
import MyButton from "~/component/MyButton";
import MyAlert from "~/component/MyAlert";
import CouponContext from "~/screens/Coupon/CouponContext";

const { t } = I18n;

/*쿠폰 등록하기 팝업*/
const CouponRegister = (props) => {
    const [code, setCode] = useState('');
    const device_id = useSelector((store) => store.reducer.device_id);
    const { change } = useContext(CouponContext);

    /*입력하는 코드 저장*/
    const HandleCode = useCallback((value) => {
        setCode(value);
    }, []);

    /*등록하기 클릭시 코드 확인*/
    const submitCode = useCallback(() => {
        let data = code.trim();
        if (data.length === 0) {
            /*입력X*/
            MyAlert(t('coupon.register.null'));
        } else {
            /*입력O*/
            postCoupon();
        }
    }, [code]);

    /*이용권 등록하기 api*/
    const postCoupon = useCallback(() => {
        AnalyticsSet('click', 'Coupon_Create');
        let data = {
            coupon_code: code.trim(),
            device_id: device_id,
        }
        Http({
            method: 'POST',
            url: '/coupon',
            data: data
        })
            .then(response => {
                MyAlert(t('coupon.register.done'));
                /*이용권 등록하기 팝업 닫기*/
                props.onPress();
                /*이용권 리스트 새로고침*/
                change();
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, [code, device_id]);

    return (
        <>
            <View>
                <View style={styles.inputBox}>
                    <MyTextInput placeholder={t('placeholder.code')}
                                 value={code}
                                 onChangeText={HandleCode}
                                 autoCapitalize={'characters'} />
                </View>
                <View style={styles.buttonBox}>
                    <MyButton text={t('alert.ok')}
                              type={'primary'}
                              onPress={submitCode} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    inputBox: {
        height: 70
    },
    buttonBox: {
        marginVertical: 10,
        alignItems: 'center'
    }
})

export default memo(CouponRegister);
