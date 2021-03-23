import React, { useState, memo, useCallback } from 'react';
import { StyleSheet, View } from "react-native";
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import MyTextInput from "~/component/MyTextInput";
import MyAlert from "~/component/MyAlert";
import DinoButton from "~/screens/Modal/Dino/DinoButton";
import Style from "~/styles/Style";

const { t } = I18n;
const title = "김가온 학생이 생일 선물로 가장 받고 싶어하는 것은 무엇인가요?"

const DinoInput = (props) => {
    const [dinoInput, setDinoInput] = useState('');

    const handleDinoInput = useCallback((value) => {
        setDinoInput(value);
    }, []);

    const submitDino = useCallback(() => {
        let data = dinoInput.trim();
        if (data.length === 0) {
            MyAlert(t('dino.inputNull'));
        } else if (data.length > 50) {
            MyAlert(t('dino.inputLength'));
        } else {
            MyAlert(data + t('dino.submit'));
        }
    }, [dinoInput]);

    return (
        <>
            <MyText text={title}
                    size={'md'}
                    weight={'5'}
                    style={Style.DinoTitle} />
            <View style={styles.input}>
                <MyTextInput placeholder={t('placeholder.dino')}
                             value={dinoInput}
                             onChangeText={handleDinoInput} />
            </View>
            <DinoButton onPress={props.onPress}
                        submit={submitDino} />
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 60
    }
});

export default memo(DinoInput);
