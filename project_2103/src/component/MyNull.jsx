import React, {memo, useCallback} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import I18n from "~/locales/I18n";
import LinkingSet from '~/modules/LinkingSet';
import MyText from '~/component/MyText';
import MyButton from '~/component/MyButton';
import MyImg from '~/component/MyImg';
import Style from '~/styles/Style';

const { t } = I18n;

const MyNull = (props) => {
    const ClickHomePage = useCallback(() => {
        LinkingSet('https://hodooenglish.com/ddangkongschool');
    }, []);

    const ClickPurchase = useCallback(() => {
        props.navigation.navigate('Purchase');
    }, []);

    return (
        <>
            <View style={styles.container}>
                <MyImg src={require('~/assets/images/notice_icon.png')}
                       style={styles.icon}/>
                <MyText text={props.text1} />
            </View>
            {
                Platform.OS === 'ios' ?
                    /*ios*/
                    props.type === 'play' ?
                        /*결제 버튼 나와야 할때*/
                        <View style={Style.btnBox}>
                            <MyButton text={t('play.null.purchase')}
                                      type={'primary'}
                                      style={props.style}
                                      onPress={() => ClickPurchase()} />
                        </View>
                        :
                        null
                    :
                    /*android*/
                    <>
                        {
                            props.text2?
                                <MyText text={props.text2}/>
                                :
                                null
                        }
                        {
                            props.btn?
                                <View style={Style.btnBox}>
                                    <MyButton text={props.btn}
                                              type={'primary'}
                                              style={props.style}
                                              onPress={() => ClickHomePage()} />
                                </View>
                                :
                                null
                        }
                    </>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 7
    },
    icon: {
        width: 13,
        height: 13,
        marginRight: 5
    }
});

export default memo(MyNull);
