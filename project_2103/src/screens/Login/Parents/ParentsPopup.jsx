import React, {useState, useCallback, useEffect} from 'react';
import {Alert, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import MyImgButton from "~/component/MyImgButton";
import { setLoad } from '~/actions'
import Colors from '~/styles/Colors';
import Style from '~/styles/Style';
import {useDispatch} from "react-redux";

const { t } = I18n;

const screenHeight = Dimensions.get('window').height;

const first = Math.ceil(Math.random() * 9);
const second = Math.ceil(Math.random() * 9);
const result = first * second;

const ParentsPopup = (props) => {
    const [number1, SetNumber1] = useState('');
    const [number2, SetNumber2] = useState('');
    const [warning, setWarning] = useState(false);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        Orientation.lockToPortrait();
        dispatch(setLoad(false));
    }, []);

    useEffect(() => {
        setVisible(props.parentsVisible);
    }, [props.parentsVisible])

    const SetNumberDom = useCallback((value) => {
        let dom;
        if (value) {
            dom = (
                <TouchableOpacity activeOpacity={0.9}
                                  style={styles.number}
                                  onPress={() => ClickNumber(value)}>
                    <MyText text={value}
                            family={'GodoB'}
                            color={'primary'}
                            size={'lg'} />
                </TouchableOpacity>
            )
        } else {
            dom = (
                <View style={[styles.number, {borderWidth: 0, backgroundColor: Colors.white}]} />
            )
        }
        return dom;
    }, [number1, number2]);

    const ClickNumber = useCallback((value) => {
        if (number1 === '') {
            SetNumber1(value);
        } else if (number1 !== '') {
            if (number2 === '') {
                SetNumber2(value);
                console.log('ClickNumber')
                let answer = number1 + '' + value;
                if (answer < 10) {
                    answer = answer.replace(/(^0+)/, "");
                }
                if (result === Number(answer)) {
                    props.OpenLogin();
                } else {
                    setWarning(true);
                    setTimeout(() => {
                        ClearNumbers();
                    }, 300);
                }
            }
        }
    }, [number1, number2]);

    const ClearNumbers = useCallback(() => {
        SetNumber1('');
        SetNumber2('');
    } ,[]);

  return (
      <>
          <SafeAreaView style={[Style.SafeAreaView, styles.container]}>
              <View style={styles.popupBox}>
                  <View style={{ position: 'absolute', top: 20, right: 20}}>
                      <MyImgButton src={require('~/assets/images/popup_close2.png')}
                                   onPress={() => props.ClosePopup()}
                                   style={{width: 20, height: 20}} />
                  </View>
                  <MyText text={t('parents.title')}
                          family={'GodoB'}
                          size={'lg'}
                          color={'brown'}/>
                  <MyText text={t('parents.sub')}
                          size={'sm'}
                          style={{marginTop: 10, marginBottom: 18}}/>
                  <View style={styles.subBox}>
                      <View style={styles.questionBox}>
                          <MyText text={t('parents.question', {num1: first, num2: second})}
                                  color={'white'}
                                  family={'GodoB'}
                                  size={'lg'}/>
                      </View>
                      <View style={styles.answerBox}>
                          <View style={styles.answerLine}>
                              <MyText text={number1} family={'GodoB'} size={'xxl'} color={'brown'} />
                          </View>
                          <View style={styles.answerLine}>
                              <MyText text={number2} family={'GodoB'} size={'xxl'} color={'brown'} />
                          </View>
                          <MyImgButton src={require('~/assets/images/delete_icon.png')}
                                       style={styles.icon}
                                       onPress={() => ClearNumbers()}/>
                      </View>
                  </View>
                  {
                      warning?
                          <View style={styles.warningBox}>
                              <MyImg src={require('~/assets/images/warning_icon.png')}
                                     style={styles.warningIcon} />
                              <MyText text={t('parents.warning')}
                                      color={'red'} />
                          </View>
                          :
                          null
                  }
                  <View style={styles.numberBox}>
                      {SetNumberDom('1')}
                      {SetNumberDom('2')}
                      {SetNumberDom('3')}
                  </View>
                  <View style={styles.numberBox}>
                      {SetNumberDom('4')}
                      {SetNumberDom('5')}
                      {SetNumberDom('6')}
                  </View>
                  <View style={styles.numberBox}>
                      {SetNumberDom('7')}
                      {SetNumberDom('8')}
                      {SetNumberDom('9')}
                  </View>
                  <View style={styles.numberBox}>
                      {SetNumberDom(null)}
                      {SetNumberDom('0')}
                      {SetNumberDom(null)}
                  </View>
              </View>
          </SafeAreaView>
      </>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        width: '100%',
        height: screenHeight,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    popupBox: {
        flex: 0.85,
        padding: 20,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    subBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },
    questionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: Colors.primary,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 10
    },
    answerBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    answerLine: {
        width: 30,
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: Colors.brown,
        marginHorizontal: 3,
        alignItems: 'center',
    },
    icon: {
        width: 26,
        height: 20,
        marginLeft: 7
    },
    warningBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -10,
        marginBottom: 15
    },
    warningIcon: {
        width: 12,
        height: 12,
        marginRight: 5
    },
    numberBox: {
        flexDirection: 'row',
        width: '80%',
        maxWidth: 270,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    number: {
        backgroundColor: Colors.beige,
        borderColor: Colors.beigeBorder,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 58,
        height: 58,
        borderRadius: 58
    },
});

export default ParentsPopup;
