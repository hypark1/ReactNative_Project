import React, { memo, useState, useCallback, useContext } from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { useDispatch } from "react-redux";
import { setLoad } from '~/actions'
import I18n from "~/locales/I18n";
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import numReplace from "~/modules/numReplace";
import MyText from "~/component/MyText";
import MyTextInput from "~/component/MyTextInput";
import MyAlert from "~/component/MyAlert";
import LinkAccountInfo from "~/screens/Modal/Link/LinkAccountInfo";
import DinoButton from "~/screens/Modal/Dino/DinoButton";
import LinkContext from "~/screens/Link/LinkContext";
import Colors from "~/styles/Colors";
import Style from "~/styles/Style";

const { t } = I18n;

/*적립금지급신청 팝업*/
const LinkPoint = (props) => {
    const [number, setNumber] = useState('');
    const { data, change } = useContext(LinkContext);
    const earn = data.withdrawable_earn;
    const dispatch = useDispatch();

    const handleNumber = useCallback((value) => {
        setNumber(value);
    }, []);

    /*적립금 확인*/
    const validationLink = useCallback(() => {
        let point = number.trim();
        let won = point * 10000;
        if (point.length > 0) {
            /*적립금 입력했을때*/
            if (won !== 0 && won <= earn) {
                /*입력한 적립금이 0이 아니고, 지급가능금액보다 작을때*/
                dispatch(setLoad(true));
                PostPoint(won);
            } else if (won > earn) {
                /*입력한 적립금이 지급가능금액보다 클때*/
                MyAlert(t('link.point.big', { point: earn } ));
            } else {
                MyAlert(t('link.point.error'));
            }
            return;
        }
        MyAlert(t('link.point.null'));
    }, [number]);

    /*적립금 지급 신청하기*/
    const PostPoint = useCallback((value) => {
        let data = {
            amount: value
        }
        Http({
            method: 'POST',
            data: data,
            url: '/recommend/withdraw'
        })
            .then(response => {
                if (response.request.status === 200) {
                    MyAlert(t('link.point.done'));
                    /*팝업 닫기*/
                    props.onPress();
                    /*screen 정보 다시가져오기*/
                    change();
                }
                dispatch(setLoad(false));
            })
            .catch(error => {
                ErrorSet(error);
                dispatch(setLoad(false));
            })
    }, []);

    return (
        <>
            <ScrollView style={Style.ModalHeight}>
                {/*지급가능금액*/}
                <View style={styles.possibleBox}>
                    <MyText text={t('link.point.possible')}
                            size={'md'}
                            weight={'5'}
                            color={'white'} />
                    <View style={styles.possiblePoint}>
                        <MyText text={numReplace(earn)}
                                size={'xxl'}
                                weight={'7'}
                                color={'white'} />
                        <MyText text={t('link.won')}
                                size={'xl'}
                                weight={'5'}
                                color={'white'}
                                style={styles.possibleText}/>
                    </View>
                </View>
                {/*입력 input*/}
                <View style={styles.inputBox}>
                    <MyTextInput placeholder={t('link.point.placeholder')}
                                 value={number}
                                 onChangeText={handleNumber}
                                 keyboardType={'number-pad'} />
                    <MyText text={t('link.point.manwon')}
                            size={'xl'}
                            style={styles.inputText}/>
                </View>
                {/*안내사항*/}
                <LinkAccountInfo data={t('link.point.infoArr')} style={Style.infoBox} />
            </ScrollView>
            <DinoButton onPress={props.onPress}
                        submit={validationLink}
                        button={t('alert.apply')} />
        </>
    );
}

const styles = StyleSheet.create({
    possibleBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.black,
        padding: 15
    },
    possiblePoint: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    possibleText: {
        marginLeft: 5
    },
    inputBox: {
        height: 60,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputText: {
        marginLeft: 20
    }
})

export default memo(LinkPoint);
