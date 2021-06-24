import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, KeyboardAvoidingView, Platform, Keyboard, Alert} from 'react-native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import {useDispatch} from "react-redux";
import { setLoad, setLearnerInsert } from '~/actions'
import I18n from "~/locales/I18n";
import Http from "~/modules/Http";
import HttpPA from "~/modules/HttpPA";
import ErrorSet from "~/modules/ErrorSet";
import ErrorSetPA from "~/modules/ErrorSetPA";
import ConfirmInput from "~/modules/ConfirmInput";
import MyTextInput from "~/component/MyTextInput";
import MyButton from "~/component/MyButton";
import MyAlert from "~/component/MyAlert";
import MyText from "~/component/MyText";
import MyBack from "~/component/MyBack";
import MyTitle from "~/component/MyTitle";
import MySelectBox from "~/component/MySelectBox";
import LoadPopup from "~/screens/LoadPopup";
import Style from '~/styles/Style';
import Colors from "~/styles/Colors";

const { t } = I18n;

const firstYear = 1950;
const lastYear = new Date().getFullYear();

const LearnerInsertScreen = (props) => {
    const [name, setName] = useState('');
    const [nameWarn, setNameWarn] = useState(false);
    const [year, setYear] = useState(null);
    const [yearArr, setYearArr] = useState([]);
    const [month, setMonth] = useState(null);
    const [monthArr, setMonthArr] = useState([]);
    const [parents, setParents] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            getDeviceId();
        }, 1000);
        setName('');
        setYear(null);
        setMonth(null);
        let arr1 = [];
        for (let i=lastYear; i>firstYear; i--) {
            arr1.push({label: i + '', value: i});
        }
        setYearArr(arr1);
        let arr2 = [];
        for (let i=1; i<13; i++) {
            let num = i;
            if (i < 10) {
                num = '0' + i;
            }
            arr2.push({label: num + '', value: num + ''});
        }
        setMonthArr(arr2);
    }, []);

    /*이름 입력값 저장*/
    const HandleName = useCallback((value) => {
        let trim = value.trim();
        if (trim.length === 15) {
            MyAlert(t('login.signUp.name.max', {num: 15}));
        } else if( ConfirmInput(trim) === true ) {
            MyAlert(t('login.signUp.name.confirm'));
        } else {
            setName(trim);
        }
    }, []);

    /*년도 선택값 저장*/
    const ChangeYear = useCallback((text, index) => {
        setYear(text);
    }, []);

    /*월 선택값 저장*/
    const ChangeMonth = useCallback((text, index) => {
        setMonth(text);
    }, []);

    /*상단 타이틀*/
    const SetTopDom = useCallback(() => {
        let dom;
        if (props.route.params.type === 'learner') {
            /*설정에서 온 학습자 추가화면*/
            dom = (
                <>
                    <MyTitle title={t('learner.select.plusTitle')} />
                </>
            )
        } else {
            /*회원가입에서 온 학습자 추가화면*/
            dom = (
                <>
                    <MyTitle title={t('login.signUp.learner.title')}
                             sub={t('login.signUp.learner.sub')} />
                </>
            )
        }
        return dom;
    }, []);

    /*학습자 이름 Text*/
    const SetTitleName = useCallback((props) => {
        let dom = (
            <>
                <MyText text={t('login.signUp.learner.name.title')}
                        size={'sm'}
                        color={nameWarn ? 'red' : 'text'}
                        style={props.style}/>
                <View style={[Style.dot, styles.dot]} />
            </>
        )
        return dom;
    }, [nameWarn]);

    /*생년월 Text*/
    const SetTitleBirth = useCallback((props) => {
        let dom = (
            <MyText text={t('login.signUp.learner.birth.title')}
                    size={'sm'}
                    style={props.style}/>
        )
        return dom;
    }, []);

    /*생년월 input*/
    const SetInputBirth = useCallback(() => {
        let dom = (
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <MySelectBox placeholder={t('login.signUp.learner.birth.year')}
                                 items={yearArr}
                                 value={year}
                                 onValueChange={(text, index) => ChangeYear(text, index)} />
                </View>
                <View style={{flex: 0.1}} />
                <View style={{flex: 1}}>
                    <MySelectBox placeholder={t('login.signUp.learner.birth.month')}
                                 items={monthArr}
                                 value={month}
                                 onValueChange={(text, index) => ChangeMonth(text, index)} />
                </View>
            </View>
        )
        return dom;
    }, [yearArr, monthArr, year, month]);

    /*학습자 정보 받는 영역*/
    const SetInputDom = () => {
        let dom;
        if (props.route.params.type === 'learner') {
            /*설정에서 온 학습자 추가화면*/
            dom = (
                <>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <SetTitleName />
                        </View>
                        <View style={{flex: 3}}>
                            <MyTextInput placeholder={t('login.signUp.learner.name.placeholder')}
                                         value={name}
                                         style={{borderColor: nameWarn? Colors.red : Colors.input}}
                                         onChangeText={HandleName}
                                         maxLength={15} />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1}}>
                            <SetTitleBirth />
                        </View>
                        <View style={{flex: 3}}>
                            <SetInputBirth />
                        </View>
                    </View>
                </>
            )
        } else {
            /*회원가입에서 온 학습자 추가화면*/
            dom = (
                <>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <View style={{flexDirection: 'row'}}>
                            <SetTitleName style={{ marginBottom: 10 }}/>
                        </View>
                        <MyTextInput placeholder={t('login.signUp.learner.name.placeholder')}
                                     value={name}
                                     style={{borderColor: nameWarn? Colors.red : Colors.input}}
                                     onChangeText={HandleName}
                                     maxLength={15} />
                        <SetTitleBirth style={{ marginTop: 10, marginBottom: 10 }}/>
                        <SetInputBirth />
                    </View>
                </>
            )
        }
        return dom;
    }

    /*디바이스 아이디 가져오기*/
    const getDeviceId = useCallback(() => {
        RNSecureKeyStore.get('ddangkongDeviceId')
            .then((res) => {
                console.log('ddangkongDeviceId')
                console.log(res)
                if (res !== null) {
                    const id = Number(res);
                    GetLearnerList(id);
                }
            }, (err) => {
                console.log(err);
            });
    }, []);

    /*학습자 리스트 가져오기*/
    const GetLearnerList = useCallback((value) => {
        let data = {
            appId: t('appID'),
            deviceId: value
        }
        console.log('LearnerInsertScreenGetLearnerList')
        console.log(data)
        HttpPA({
            method: 'GET',
            url: '/learner/common-list',
            params: data
        })
            .then(response => {
                if (response.request.status === 200) {
                    let resData = JSON.parse(response.request._response);
                    console.log('GetLearnerList2', resData)
                    setParents(resData);
                }
            })
            .catch(error => {
                ErrorSetPA(error);
            })
    }, []);

    /*학습자 정보 입력 확인*/
    const ConfirmLearner = useCallback(() => {
        let value = name.trim();
        if (value === '') {
            /*이름 입력 안했을때*/
            MyAlert(t('login.signUp.learner.name.placeholder'));
            setNameWarn(true);
        } else if (value.length < 2) {
            /*이름 2자이하일때*/
            MyAlert(t('login.signUp.learner.name.min'));
            setNameWarn(true);
        } else if ((!year && month) || (year && !month)) {
            /*year 과 month 중 하나만 입력*/
            MyAlert(t('login.signUp.learner.birth.null'));
            setNameWarn(false);
        } else {
            PostLearnerAdd();
            setNameWarn(false);
        }
    }, [name, year, month]);

    /*학습자 추가*/
    const PostLearnerAdd = useCallback(() => {
        dispatch(setLoad(true));
        let data = {
            birthday: year + '-' + month + '-01',
            name: name,
            parentAccountId: parents[0].account_id
        }
        if (!year && !month) {
            data.birthday = null
        }
        Http({
            method: 'POST',
            data: data,
            url: '/api/account/insertLearner'
        })
            .then(response => {
                dispatch(setLoad(false));
                if (response.request.status === 200) {
                    Alert.alert(t('alert.title'), t('login.signUp.learner.confirm.alert'), [
                            { text: t('alert.ok'),
                                onPress: () => {
                                    if (props.route.params.type === 'learner') {
                                        /*설정에서 온 학습자 추가화면*/
                                        let length = parents[0].learners.length;
                                        dispatch(setLearnerInsert(length));
                                        props.navigation.goBack();
                                    } else {
                                        /*회원가입에서 온 학습자 추가화면*/
                                        props.navigation.replace('PlayList');
                                    }
                                }
                            }
                        ],
                        { cancelable: false }
                    );
                    Keyboard.dismiss();
                }
            })
            .catch(error => {
                ErrorSet(error);
                dispatch(setLoad(false));
            })
    }, [name, year, month, parents]);

    return (
        <>
            <LoadPopup />
            <SafeAreaView style={[Style.SafeAreaView, { backgroundColor: props.route.params.type === 'learner'? Colors.background_orange: null}]}>
                <View style={Style.headerWrap}>
                    {
                        props.route.params.type === 'learner'?
                            <MyBack navigation={props.navigation} />
                            :
                            null
                    }
                    <KeyboardAvoidingView behavior={Platform.OS === 'android'? null : 'padding'}
                                          keyboardVerticalOffset={null}
                                          style={Style.keyboard}
                                          enabled>
                        <View style={Style.ScreenWrap}>
                            { SetTopDom() }
                            { SetInputDom() }
                            <View style={Style.btnBox}>
                                <MyButton text={t('login.signUp.learner.confirm.btn')}
                                          type={'primary'}
                                          style={Style.btnMd}
                                          onPress={() => ConfirmLearner()} />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    dot: {
        position: 'relative',
        right: 0,
        borderRadius: 4,
        marginLeft: 3
    }
});

export default LearnerInsertScreen;
