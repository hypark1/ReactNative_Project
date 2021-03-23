import React, { memo } from 'react';
import { StyleSheet, View } from "react-native";
import I18n from "~/locales/I18n";
import MyButton from "~/component/MyButton";

const { t } = I18n;

const DinoButton = (props) => {
    return (
        <>
            <View style={styles.dinoBtnBox}>
                <MyButton text={t('alert.no')} type="gray" style={styles.dinoBtn} onPress={props.onPress} />
                <View style={{ flex: 1 }} />
                <MyButton text={props.button? props.button : t('alert.ok')} type="primary" style={styles.dinoBtn} onPress={props.submit} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    dinoBtnBox: {
        flexDirection: 'row',
        marginTop: 15,
    },
    dinoBtn: {
        flex: 10,
    }
});

export default memo(DinoButton);
