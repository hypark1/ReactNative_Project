import React, { useState, useEffect, memo, useCallback } from 'react';
import { View, TouchableOpacity, ScrollView } from "react-native";
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyTextButton from "~/component/MyTextButton";
import MyImg from "~/component/MyImg";
import MyAlert from "~/component/MyAlert";
import DinoButton from "~/screens/Modal/Dino/DinoButton";
import Style from "~/styles/Style";

const { t } = I18n;
const title = '김가온 학생이 생일 선물로 가장 받고 싶어하는 것을 모두 선택해주세요.';
const content = [
    { id: 0, text: '장난감', exam: '예) 팽이, 조립 및 놀이도구' },
    { id: 1, text: '게임류', exam: '예) 게임 내 아이템, 보드게임' },
    { id: 2, text: '특별한 경험', exam: '예) 여행, 놀이동산' },
    { id: 3, text: '꾸미는 장신구', exam: '예) 의류, 신발, 액세서리' },
    { id: 4, text: '해당 사항 없음' },
]

const DinoMultiple = (props) => {
    const [dinoCheck, setDinoCheck] = useState([]);

    const submitDino = useCallback(() => {
        let data = dinoCheck;
        if (!data.includes(true)) {
            MyAlert(t('dino.chkNull'));
        } else {
            MyAlert(data + t('dino.submit'));
        }
    }, [dinoCheck]);

    useEffect(() => {
        let arr = [];
        content.map((val, index) => {
            arr[index] = false;
        });
        setDinoCheck(arr);
    }, []);

    const DinoRadioClick = useCallback((idx) => {
        let arr = dinoCheck;
        arr[idx] = !arr[idx];
        setDinoCheck([...arr]);
    }, [dinoCheck]);

    return (
        <>
            <MyText text={title}
                    size={'md'}
                    weight={'5'}
                    style={Style.DinoTitle} />
            <ScrollView style={Style.DinoContents}>
                {
                    content.map((val, index) => {
                        return (
                            <TouchableOpacity key={val.id}
                                              activeOpacity={1}
                                              onPress={DinoRadioClick.bind(this, index)}>
                                <View style={Style.DinoChkBox}>
                                    {
                                        dinoCheck[index] ?
                                            <MyImg src={require('~/assets/images/popup_checkbox_on.png')}
                                                   style={Style.DinoChkImg} />
                                                   :
                                            <MyImg src={require('~/assets/images/popup_checkbox.png')}
                                                   style={Style.DinoChkImg} />
                                    }
                                    <View style={Style.DinoChkText}>
                                        <MyTextButton text={val.text}
                                                      onPress={DinoRadioClick.bind(this, index)}
                                                      size={'md'}
                                                      weight={'5'} />
                                        {
                                            val.exam?
                                            <MyTextButton text={val.exam}
                                                          onPress={DinoRadioClick.bind(this, index)}
                                                          size={'md'}
                                                          weight={'5'} />
                                            :
                                            null
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            <DinoButton onPress={props.onPress}
                        submit={submitDino} />
        </>
    )
}

export default memo(DinoMultiple);
