import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";

const { t } = I18n;

/*공지사항 타이틀*/
const AnnounceTitle = (props) => {
    const { data } = props;

    /*타입별 텍스트 설정*/
    const SetTypeText = () => {
        if (data.type === 'EVENT') {
            return t('announce.type.event');
        } else if (data.type === 'IMPORTANT') {
            return t('announce.type.important');
        } else {
            return t('announce.type.normal');
        }
    }

    return (
        <>
            <View style={styles.dateBox}>
                <MyText text={SetTypeText()}
                        weight={'6'}
                        color={'primary'}
                        style={{ marginRight: 7 }} />
                <MyText text={data.created_date} />
            </View>
            <MyText text={data.title}
                    size={'lg'}
                    weight={'5'}
                    line={2}
                    style={styles.title} />
        </>
    )
};

const styles = StyleSheet.create({
    dateBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginVertical: 7,
        lineHeight: 23
    },
});

export default memo(AnnounceTitle);
