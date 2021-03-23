import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import I18n from "~/locales/I18n";
import numReplace from "~/modules/numReplace";
import MyText from "~/component/MyText";
import LinkListAccount from "~/screens/Link/LinkListAccount";
import Colors from "~/styles/Colors";

const { t } = I18n;

const LinkList = (props) => {
    const ListAccountChk = () => {
        if (props.type === 'account') {
            /*지급 계좌*/
            return <LinkListAccount />
        } else {
            /*총 누적, 현재, 지급가능 적립금*/
            return (
                <>
                    <MyText text={numReplace(props.result)}
                            size={'xxl'}
                            weight={'7'}
                            style={styles.listResult} />
                    <MyText text={t('link.won')}
                            size={'xl'}
                            weight={'5'} />
                </>
            )
        }
    };

    return (
        <>
            <View style={styles.listBox}>
                <MyText text={props.title}
                        size={'md'}
                        weight={'5'} />
                <View style={styles.listResultBox}>
                    { ListAccountChk() }
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    listBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.line
    },
    listResultBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listResult: {
        marginRight: 3
    },
})

export default memo(LinkList);
