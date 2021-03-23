import React, { memo, useContext, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import I18n from "~/locales/I18n";
import MyText from "~/component/MyText";
import LinkButton from "~/screens/Link/LinkButton";
import LinkContext from "~/screens/Link/LinkContext";

const { t } = I18n;

const LinkListAccount = () => {
    const { data } = useContext(LinkContext);

    const bankValueChk = useCallback(() => {
        if (data.bank_account_owner) {
            /*지급 계좌 있을때*/
            return (
                <>
                    <View style={styles.bankIs}>
                        <MyText text={data.bank_account_number}
                                size={'md'}
                                color={'darkGray'}
                                en={true} />
                        <View style={styles.bankRow}>
                            <MyText text={data.bank_name}
                                    color={'darkGray'}
                                    style={styles.bankName} />
                            <MyText text={data.bank_account_owner}
                                    color={'darkGray'} />
                        </View>
                    </View>
                    <LinkButton title={t('link.account.button.edit')} />
                </>
            )
        } else {
            /*지급 계좌 없을때*/
            return <LinkButton title={t('link.account.button.create')} />
        }
    }, [data]);

    return (
        <>
            <View style={styles.container}>
                {bankValueChk()}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bankIs: {
        alignItems: 'flex-end',
        marginRight: 13,
        marginTop: -4
    },
    bankRow: {
        flexDirection: 'row'
    },
    bankName: {
        marginRight: 5
    }
})

export default memo(LinkListAccount);
