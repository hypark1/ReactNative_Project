import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import I18n from "~/locales/I18n";
import MyImg from '~/component/MyImg';
import MyNull from '~/component/MyNull';
import Style from '~/styles/Style';

const { t } = I18n;

const PlayNull = (props) => {
    return (
        <>
            <MyImg src={require('~/assets/images/play/speaker_icon.png')}
                   style={styles.icon}/>
            {
                props.purchase ?
                    <MyNull text1={t('play.null.text1')}
                            text2={t('play.null.text2')}
                            btn={t('play.null.btn')}
                            style={Style.btnSm}
                            type={'play'}
                            navigation={props.navigation}/>
                    :
                    <MyNull text1={t('play.null.text1')}
                            text2={t('play.null.text2')}
                            btn={t('play.null.btn')}
                            style={Style.btnSm}
                            navigation={props.navigation}/>

            }
        </>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 100,
        height: 100,
        marginBottom: 20,
        marginTop: -20
    }
});

export default memo(PlayNull);
