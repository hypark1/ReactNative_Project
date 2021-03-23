import React, {memo, useState, useCallback, useEffect, useContext} from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { useDispatch } from "react-redux";
import { setLoad } from '~/actions'
import I18n from "~/locales/I18n";
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import MyTextInput from "~/component/MyTextInput";
import MyAlert from "~/component/MyAlert";
import LinkAccountInfo from "~/screens/Modal/Link/LinkAccountInfo";
import DinoButton from "~/screens/Modal/Dino/DinoButton";
import LinkContext from "~/screens/Link/LinkContext";
import Colors from "~/styles/Colors";
import Fonts from "~/styles/Fonts";
import Style from "~/styles/Style";

const { t } = I18n;

const bankArr = t('link.account.bankArr');

/*지급계좌정보 팝업*/
const LinkAccount = (props) => {
    const { data, change } = useContext(LinkContext);
    const [bank, setBank] = useState(data.bank_name);
    const [name, setName] = useState(data.bank_account_owner);
    const [number, setNumber] = useState(data.bank_account_number);
    const dispatch = useDispatch();

    const ChangeBank = useCallback((value, index) => {
        setBank(bankArr[index]);
    }, []);

    const handleName = useCallback((value) => {
        setName(value);
    }, []);

    const handleNumber = useCallback((value) => {
        setNumber(value);
    }, []);

    /*은행, 이름, 계좌번호 확인*/
    const validationLink = useCallback(() => {
        if (bank !== bankArr[0]) {
            if (name.trim().length > 0) {
                if (number.trim().length > 0) {
                    var regexp = /^[0-9]*$/
                    let numberChk = regexp.test(number.trim());
                    if (numberChk) {
                        dispatch(setLoad(true));
                        PostLinkAccount();
                    } else {
                        MyAlert(t('link.account.accountNumber'));
                    }
                    return;
                }
            }
        }
        MyAlert(t('link.account.null'));
    }, [bank, name, number]);

    /*지급계좌정보 저장*/
    const PostLinkAccount = useCallback(() => {
        let data = {
            bank_account: number.trim(),
            bank_name: bank,
            bank_owner: name.trim()
        }
        Http({
            method: 'POST',
            data: data,
            url: '/recommend/bank'
        })
            .then(response => {
                if (response.request.status === 204) {
                    MyAlert(t('link.account.done'));
                    /*팝업닫기*/
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
    }, [bank, name, number]);

    return (
        <>
            <ScrollView style={Style.ModalHeight}>
                {/*입금 받을 은행*/}
                {/*<MyPicker value={bank}
                          onPress={ChangeBank}
                          list={bankArr}
                          placeholder={t('link.account.name')}
                          style={{ marginBottom: 5 }}/>*/}
                {/*예금주 성명*/}
                <View style={styles.inputBox}>
                    <MyTextInput placeholder={t('link.account.name')}
                                 value={name}
                                 onChangeText={handleName} />
                </View>
                {/*계좌 번호*/}
                <View style={styles.inputBox}>
                    <MyTextInput placeholder={t('link.account.number')}
                                 value={number}
                                 onChangeText={handleNumber}
                                 keyboardType={'number-pad'} />
                </View>
                {/*안내사항*/}
                <LinkAccountInfo data={t('link.account.infoArr')} style={Style.infoBox} />
            </ScrollView>
            <DinoButton onPress={props.onPress}
                        submit={validationLink}
                        button={t('alert.save')} />
        </>
    );
}

const styles = StyleSheet.create({
    selectBox: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 5,
        marginBottom: 15
    },
    inputBox: {
        height: 60,
        marginBottom: 5,
    },
    pickerBox: {
        position: 'absolute',
        right: 0,
        top: 0,
        width:'300%',
        height: 60
    },
    pickerText: {
        color: Colors.white,
        fontSize: Fonts.size.md,
        fontFamily: Fonts.weight['5'],
        marginLeft: 10
    }
})

export default memo(LinkAccount);
