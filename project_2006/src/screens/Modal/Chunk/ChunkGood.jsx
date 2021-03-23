import React, { useState, memo, useCallback, useEffect} from 'react';
import {View, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import I18n from "~/locales/I18n";
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import AnalyticsSet from "~/modules/AnalyticsSet";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import MyTextButton from "~/component/MyTextButton";
import MyTextInput from "~/component/MyTextInput";
import MyAlert from "~/component/MyAlert";
import DinoButton from "~/screens/Modal/Dino/DinoButton";
import Style from "~/styles/Style";
import Colors from "~/styles/Colors";

const { t } = I18n;
const contentArr = t('chunk.good.message');

/*청크상세 칭찬하기 팝업*/
const ChunkGood = (props) => {
    const [goodRadio, setGoodRadio] = useState(null);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [disable, setDisable] = useState(false);
    const learner_name = useSelector((store) => store.reducer.learner_name);

    useEffect(() => {
        setTitle(props.data.sentence);
    }, [props.data]);

    /*칭찬하기 버튼 클릭시*/
    const ValidationGood = useCallback(() => {
        if (!goodRadio) {
            /*선택 안했을때*/
            MyAlert(t('chunk.good.null'));
        } else {
            /*선택 했을때*/
            if (goodRadio === 6) {
                /*직접입력*/
                let length = text.trim().length;
                if (length > 200) {
                    /*200자이상*/
                    MyAlert(t('chunk.good.many'));
                    return;
                } else if (length === 0) {
                    /*입력 안함*/
                    MyAlert(t('chunk.good.text'));
                    return;
                }
            }
            PostCompliment();
        }
    }, [goodRadio, text, learner_name]);

    /*칭찬하기 api*/
    const PostCompliment = useCallback(() => {
        let contents = goodRadio === 6 ? text : contentArr[goodRadio -1];
        AnalyticsSet('click', 'Chunk_Detail_Compliment_' + goodRadio + '_Click');
        let data = {
            character_id: learner_name.subscriptions[learner_name.subscriptions.length -1].game_character_id,
            content: contents,
            subject: t('chunk.good.title')
        }
        if (data.character_id && data.content && data.subject) {
            Http({
                method: 'POST',
                url: '/learner/compliment',
                data: data,
            })
                .then(response => {
                    if (response.request.status === 204) {
                        props.onPress();
                        setTimeout(() => {
                            MyAlert(t('chunk.good.done'));
                        }, 500);
                    }
                })
                .catch(error => {
                    ErrorSet(error);
                })
        } else {
            MyAlert(t('error'));
        }
    }, [goodRadio, text, learner_name]);

    /*칭찬하기 문구 클릭*/
    const ClickRadioList = useCallback((id) => {
        /*클릭한 index 저장*/
        setGoodRadio(id);
        /*직접입력 클릭시 입력란 활성화*/
        id === 6 ? setDisable(true) : setDisable(false);
    }, []);

    /*입력하는 텍스트 저장*/
    const HandleText = useCallback((value) => {
        setText(value);
    }, []);

    const SetInputListDom = useCallback(() => {
        let dom = contentArr.map((val, index) => {
            return (
                <TouchableOpacity key={index}
                                  activeOpacity={1}
                                  onPress={ClickRadioList.bind(this, index+1)}>
                    <View style={Style.DinoChkBox}>
                        {
                            index+1 === goodRadio ?
                                /*선택한거*/
                                <MyImg src={require('~/assets/images/popup_radio_on.png')}
                                       style={Style.DinoChkImg} />
                                :
                                <MyImg src={require('~/assets/images/popup_radio.png')}
                                       style={Style.DinoChkImg} />
                        }
                        <View style={Style.DinoChkText}>
                            <MyTextButton text={val}
                                          onPress={ClickRadioList.bind(this, index+1)}
                                          size={'md'}
                                          weight={'5'} />
                        </View>
                    </View>
                </TouchableOpacity>
            )
        });
        return dom;
    }, [goodRadio]);

    return (
        <>
            <MyText text={title}
                    style={styles.title}
                    size={'xl'}
                    weight={'7'}
                    align={'center'}
                    color={'primary'}
                    en={true} />
            <ScrollView style={Style.DinoContents}>
                { SetInputListDom() }
                <View style={styles.typingWrap}>
                    <View style={{ flex: 1 }}>
                        <MyTextInput placeholder={t('placeholder.chunk')}
                                     value={text}
                                     onChangeText={HandleText}
                                     multiline={true}
                                     numberOfLines={4}
                                     editable={disable}
                                     textAlignVertical={'top'}/>
                    </View>
                </View>
            </ScrollView>
            <DinoButton onPress={props.onPress}
                        submit={ValidationGood} />
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        backgroundColor: Colors.background,
        padding: 20,
        marginBottom: 20
    },
    typingWrap: {
        flexDirection: 'row'
    }
})
export default memo(ChunkGood);
