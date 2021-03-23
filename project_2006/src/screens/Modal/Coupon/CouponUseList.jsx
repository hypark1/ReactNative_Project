import React, { memo } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import Colors from "~/styles/Colors";
import Style from "~/styles/Style";

const { t } = I18n;

/*이용권 사용하기 팝업 - 학습자 리스트*/
const CouponUseList = (props) => {
    /*학습자 이미지 설정*/
    const SetProfileImg = (value) => {
        if (value.gender ==='여자') {
            return require('~/assets/images/profile_w.jpg');
        } else if (value.gender ==='남자') {
            return require('~/assets/images/profile_m.jpg');
        } else {
            return require('~/assets/images/profile_dino.jpg');
        }
    }

    /*학습자 이용권 기간 설정*/
    const SetCouponDay = (value) => {
        let day = value.end_date;
        if (day) {
            /*종료일 있을때*/
            return t('coupon.use.date', { date: day });
        } else if (value.subscription_name) {
            /*정기결제 있을때*/
            return value.subscription_name + t('coupon.use.use');
        } else {
            /*이용권 없을때*/
            return t('coupon.use.nonono');
        }

    }

    const SetCouponUseDom = () => {
        let dom = props.data.map((item, idx) => {
            return (
                <TouchableOpacity style={props.value === idx ? [styles.userBox, styles.userBoxClicked] : [styles.userBox] }
                                  activeOpacity={1}
                                  key={idx}
                                  onPress={props.onPress.bind(this, idx)}>
                    <View style={styles.userImgBox}>
                        <View style={props.value === idx ? [styles.profileImgBox, styles.profileImgBoxClicked] : [styles.profileImgBox] }>
                            <MyImg src={SetProfileImg(item)}
                                   style={styles.profileImg} />
                        </View>
                    </View>
                    <View style={styles.userTextBox}>
                        <MyText text={item.learner_name}
                                size={'xl'}
                                weight={'5'}
                                color={props.value === idx ? 'primary' : 'text'} />
                        <MyText text={SetCouponDay(item)}
                                style={styles.userTextDate}
                                size={'xs'}
                                color={props.value === idx ? 'primary' : 'text'} />
                    </View>
                </TouchableOpacity>
            )
        });
        return dom;
    };

    return (
        <>
            <ScrollView style={Style.ModalHeight}>
                { SetCouponUseDom() }
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    userBox: {
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 4,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.line,
        borderColor: Colors.line,
    },
    userBoxClicked: {
        backgroundColor: Colors.white,
        borderColor: Colors.primary,
    },
    userImgBox: {
        flex: 3
    },
    profileImgBox: {
        height: 70,
        width: 70,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        backgroundColor: Colors.white,
        borderColor: Colors.userLine
    },
    profileImgBoxClicked: {
        borderColor: Colors.primary
    },
    profileImg: {
        height: 70,
        width: 70,
    },
    userTextBox: {
        flex: 5,
        justifyContent: 'center'
    },
    userTextDate: {
        marginTop: 5
    },
})

export default memo(CouponUseList);
