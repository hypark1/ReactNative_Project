import React, { memo, useState, useContext, useCallback } from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useSelector} from "react-redux";
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyButton from "~/component/MyButton";
import MyAlert from "~/component/MyAlert";
import ModalCouponUse from "~/screens/Modal/Coupon/ModalCouponUse";
import CouponContext from "~/screens/Coupon/CouponContext";
import Colors from "~/styles/Colors";

const { t } = I18n;

/*이용권 리스트*/
const CouponList = () => {
    const [useVisible, setUseVisible] = useState(false);
    const [use, setUse] = useState({});
    const learner = useSelector((store) => store.reducer.learner);
    const device_id = useSelector((store) => store.reducer.device_id);
    const { data, change } = useContext(CouponContext);

    /*사용하기 버튼 클릭*/
    const ClickUse = useCallback((item) => {
        setUse(item)
        let length = learner.length;
        if (length > 1) {
            /*학습자가 1명 이상일때, 학습자 선택창 열기*/
            setUseVisible(true);
        } else if (length === 1) {
            /*학습자가 1명일때*/
            Alert.alert(t('alert.title'), t('coupon.use.question'), [
                    { text: t('alert.no'), },
                    { text: t('alert.ok'),
                        onPress: () => putCoupon()
                    }
                ],
                { cancelable: false }
            );
        } else {
            /*학습자 없음*/
            MyAlert(t('profile.null'));
        }
    }, [learner]);

    /*이용권 사용하기*/
    const putCoupon = useCallback(() => {
        let putData = {
            coupon_code: use.coupon_code,
            device_id: device_id,
            learner_id: learner[0].learner_id
        }
        Http({
            method: 'PUT',
            url: '/coupon',
            data: putData
        })
            .then(response => {
                MyAlert(t('coupon.use.done'));
            })
            .catch(error => {
                ErrorSet(error);
                /*쿠폰 리스트 가져오기*/
                change();
            })
    }, [use, device_id, learner]);

    /*이용권 적용 팝업 닫기*/
    const CloseUse = useCallback(() => {
        setUseVisible(false);
    }, []);

    const setListDom = () => {
        let dom;
        if (data.length > 0) {
            /*이용권이 있을때*/
            dom = data.map((item, index) => {
                let name = item.gamified_service_id ===1 ? t('coupon.pc') : t('coupon.m');
                name = name + item.coupon_name;

                return (
                    <View style={styles.couponBox} key={item.coupon_name + index}>
                        <View style={styles.couponText}>
                            <MyText text={name}
                                    style={styles.couponTitle}
                                    size={'md'}
                                    weight={'5'}
                                    line={2}/>
                            <MyText text={t('coupon.date', {date: item.valid_thru})}
                                    style={styles.couponDate} />
                        </View>
                        <View style={styles.couponButton}>
                            {
                                item.use ?
                                    null
                                    :
                                    <MyButton text={t('coupon.use.title')}
                                              type={'white'}
                                              onPress={ClickUse.bind(this, item)} />
                            }
                        </View>
                    </View>
                )
            })
        } else {
            /*이용권이 없을때*/
            dom = (
                <View style={styles.couponBox}>
                    <MyText text={t('coupon.null')}
                        style={{flex:1}}
                        align={'center'} />
                </View>
            )
        }
        return dom;
    }

    return (
        <>
            { setListDom() }
            <ModalCouponUse visible={useVisible}
                            onPress={CloseUse}
                            data={use} />
        </>
    );
}

const styles = StyleSheet.create({
    couponBox: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        padding: 25,
        borderTopWidth: 1,
        borderTopColor: Colors.line,
        borderBottomWidth: 1,
        borderBottomColor: Colors.line,
        marginBottom: 10
    },
    couponText: {
        flex: 5
    },
    couponTitle: {
        lineHeight: 23
    },
    couponDate: {
        marginTop: 10
    },
    couponButton: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30
    },
    couponCreate: {
        padding: 25
    }
})

export default memo(CouponList);
