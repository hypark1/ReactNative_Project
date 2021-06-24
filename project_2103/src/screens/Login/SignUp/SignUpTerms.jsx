import React, {memo} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import Colors from "~/styles/Colors";

const { t } = I18n;

const SignUpTerms = (props) => {
    return (
        <>
            <MyText text={t('term.' + props.type + '.title')}
                    align={'center'} style={{ marginBottom: 10 }} />
            <ScrollView style={[styles.container, { marginBottom: props.type === 'term' ? 20: 0}]}>
                <MyText text={t('term.' + props.type + '.contents')} />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.input,
        padding: 15,
        backgroundColor: Colors.white
    }
});

export default memo(SignUpTerms);
