import React, { useEffect, useState, useCallback } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import { useDispatch } from "react-redux";
import { setLoad } from '~/actions'
import I18n from "~/locales/I18n";
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import MyHeader from '~/component/MyHeader';
import MyText from "~/component/MyText";
import MyButton from "~/component/MyButton";
import MyAlert from "~/component/MyAlert";
import LinkTopImg from "~/screens/Link/LinkTopImg";
import LinkList from "~/screens/Link/LinkList";
import LinkContext from "~/screens/Link/LinkContext";
import ModalLinkShare from "~/screens/Modal/Link/ModalLinkShare";
import ModalLinkPoint from "~/screens/Modal/Link/ModalLinkPoint";
import Colors from "~/styles/Colors";
import Style from "~/styles/Style";

const { t } = I18n;

const LinkScreen = (props) => {
    const [data, setData] = useState({});
    const [link, setLink] = useState([]);
    const [share, setShare] = useState(false);
    const [point, setPoint] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoad(true));
        getRecommendData();
        getRecommendUrl();
    }, []);

    /*기본정보조회 (적립금,계좌정보)*/
    const getRecommendData = useCallback(() => {
        Http({
            method: 'GET',
            url: '/recommend/summary'
        })
            .then(response => {
                if (response.request.status === 200) {
                    let resData = JSON.parse(response.request._response);
                    setData(resData);
                }
                dispatch(setLoad(false));
            })
            .catch(error => {
                ErrorSet(error);
                dispatch(setLoad(false));
            })
    }, []);

    /*추천링크URL 리스트*/
    const getRecommendUrl = useCallback(() => {
        Http({
            method: 'GET',
            url: '/recommend/url'
        })
            .then(response => {
                if (response.request.status === 200) {
                    let resData = JSON.parse(response.request._response);
                    setLink(resData);
                }
                dispatch(setLoad(false));
            })
            .catch(error => {
                ErrorSet(error);
                dispatch(setLoad(false));
            })
    }, []);

    /*추천링크 생성*/
    const submitCreate = useCallback(() => {
        dispatch(setLoad(true));
        Http({
            method: 'POST',
            url: '/recommend/url'
        })
            .then(response => {
                if (response.request.status === 200) {
                    getRecommendUrl();
                    MyAlert(t('link.create.free'));
                }
            })
            .catch(error => {
                ErrorSet(error);
                dispatch(setLoad(false));
            })
    }, []);

    /*추천링크 text*/
    const SetLinkText = useCallback((value, type) => {
        if (value.length > 0) {
            let linkValue = value[0];
            let text = 'https://stg.hodooenglish.com/pricing/' + linkValue.reward_url_key
            if (type) {
                text +=  '\n' + t('link.account.linkDate', { date: linkValue.valid_thru })
            }
            return text
        } else {
            return t('link.text')
        }
    }, []);

    /*추천링크 있을때만 공유,적립금지급신청 버튼 보이게*/
    const SetLinkButton = useCallback((value) => {
        if (value.length > 0) {
            return (
                <>
                    <MyButton text={t('link.share')}
                              type={'white'}
                              style={styles.button}
                              onPress={OpenShare} />
                    <MyButton text={t('link.point.title')}
                              type={'white'}
                              style={styles.button}
                              onPress={OpenPoint} />
                </>
            )
        }
    }, [data]);

    /*공유하기 팝업 열고 닫기*/
    const OpenShare = useCallback(() => {
        setShare(true);
    }, []);
    const CloseShare = useCallback(() => {
        setShare(false);
    }, []);

    /*적립금지급신청 팝업 열고 닫기*/
    const OpenPoint = useCallback(() => {
        if (data.withdrawable_earn >= 10000) {
            setPoint(true);
        } else {
            MyAlert(t('link.point.down'));
        }
    }, [data]);

    const ClosePoint = useCallback(() => {
        setPoint(false);
    }, []);

    return (
        <>
            <SafeAreaView style={Style.SafeAreaView}>
                <MyHeader title={t('menu.link')}
                          navigation={props.navigation} />
                <LinkContext.Provider value={{ data: data, change: getRecommendData }}>
                    <ScrollView style={styles.container}>
                        {/*상단 이미지*/}
                        <LinkTopImg />
                        {/*적립금 리스트*/}
                        <View style={styles.listBox}>
                            <LinkList title={t('link.total')}
                                      result={data.total_earn} />
                            <LinkList title={t('link.now')}
                                      result={data.balance_earn} />
                            <LinkList title={t('link.possible')}
                                      result={data.withdrawable_earn} />
                            <LinkList title={t('link.account.title')}
                                      type={'account'} />
                        </View>
                        {/*추천링크 url*/}
                        <View style={styles.textBox}>
                            <MyText text={SetLinkText(link, 'date')}
                                    align={'center'}
                                    style={styles.text}/>
                        </View>
                        {/*공유하기, 지급신청, 추천링크생성 버튼*/}
                        <View style={[styles.buttonBox, Style.screenBottom]}>
                            {SetLinkButton(link)}
                            <MyButton text={t('link.create.title')}
                                      type={'primary'}
                                      style={styles.button}
                                      onPress={submitCreate} />
                        </View>
                    </ScrollView>
                    {/*공유하기 팝업*/}
                    {
                        link ?
                            <ModalLinkShare visible={share}
                                            data={SetLinkText(link)}
                                            onPress={CloseShare} />
                            :
                            null
                    }
                    {/*적립금 지급 신청 팝업*/}
                    <ModalLinkPoint visible={point}
                                    onPress={ClosePoint} />
                </LinkContext.Provider>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    listBox: {
        backgroundColor: Colors.white
    },
    textBox: {
        margin: 20,
        backgroundColor: Colors.white,
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignItems: 'center'
    },
    text: {
        lineHeight: 23
    },
    buttonBox: {
        marginHorizontal: 20,
    },
    button: {
        marginBottom: 10
    }
})


export default LinkScreen;
