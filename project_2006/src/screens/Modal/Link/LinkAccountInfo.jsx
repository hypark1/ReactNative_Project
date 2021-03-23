import React, { memo, useCallback } from "react";
import { StyleSheet, View } from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import Colors from "~/styles/Colors";

const { t } = I18n;

const LinkAccountInfo = (props) => {
    /*안내사항 리스트 dom*/
    const LinkInfoList = useCallback(() => {
        let list = props.data.map((v, i) => {
            return (
                <View style={styles.infoArrBox}
                      key={v}>
                    <View style={styles.infoArrDot} />
                    <MyText text={v}
                            style={{ lineHeight: 20 }}/>
                </View>
            )
        });

        return list;
    }, [props.data]);

    return (
        <>
            <View style={props.style}>
                <MyText text={props.title? props.title : t('link.account.info')}
                        weight={'6'} />
                {LinkInfoList()}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    infoArrBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10
    },
    infoArrDot: {
        width: 5,
        height: 5,
        marginTop: 7,
        marginRight: 7,
        backgroundColor: Colors.black,
        borderRadius: 50
    }
})

export default memo(LinkAccountInfo);
