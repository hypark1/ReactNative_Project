import React, { useState, memo, useCallback, useEffect } from 'react';
import { View, Modal, StyleSheet, Dimensions, Linking } from 'react-native';
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import I18n from "~/locales/I18n";
import MyButton from "~/component/MyButton";
import MyCheckBox from "~/component/MyCheckBox";
import MyImgBackground from "~/component/MyImgBackground";

const { t } = I18n;

const screenWidth = Math.round(Dimensions.get('window').width);
const imgHeight = screenWidth/9 *20;

/*이벤트 전체 팝업*/
const ModalMain = (props) => {
    const [visible, setVisible] = useState(false);
    const [close, setClose] = useState(false);

    useEffect(() => {
        RNSecureKeyStore.get('GSP_Modal')
            .then((res) => {
                let arr = JSON.parse(res);
                let data = arr[props.data.popup_notice_id];
                if (data) {
                    if (data.value) {
                        // 7일간 보지않기 체크한 경우
                        let storageSession = new Date(data.date).getDate();
                        let date = new Date().getDate();
                        let num = (date - storageSession);
                        // 7일 지났는지 체크
                        if (num >= 7) {
                            setVisible(true);
                        } else {
                            setVisible(false);
                        }
                    }
                } else {
                    setVisible(true);
                }
            }, (err) => {
                console.log(err);
            });
    }, []);

    const CloseChk = useCallback(() => {
        setClose(!close);
    }, [close]);

    const CloseModal = useCallback(() => {
        setVisible(!visible);
        RNSecureKeyStore.get('GSP_Modal')
            .then((res) => {
                let arr = JSON.parse(res);
                arr[props.data.popup_notice_id] = {
                    id: props.data.popup_notice_id,
                    value: close,
                    date: new Date()
                }
                RNSecureKeyStore.set('GSP_Modal', JSON.stringify(arr), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
            }, (err) => {
                console.log(err);
            });
    }, [visible, close]);

    const GoLinkUrl = useCallback(() => {
        Linking.openURL(props.data.landing_url);
    }, []);

    return (
        <>
            <Modal animationType={'none'}
                   transparent={false}
                   visible={visible} >
                <View style={styles.container}>
                    <MyImgBackground src={{ uri: props.data.image_url }}
                                     style={[styles.image, { height: imgHeight }]}
                                     resizeMode={'stretch'} />
                    <View style={styles.buttonBox}>
                        <MyButton text={props.data.button_text}
                                  type={'primary'}
                                  style={styles.button1}
                                  onPress={GoLinkUrl} />
                        <MyButton text={t('modal.close')}
                                  type={'white'}
                                  style={styles.button2}
                                  onPress={CloseModal} />
                        <MyCheckBox text={t('modal.7days')}
                                    value={close}
                                    onPress={CloseChk} />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
    },
    image: {
        position:'absolute',
        top: 0,
        width: '100%',
    },
    buttonBox: {
        width: '85%',
        position: 'absolute',
        bottom: 18
    },
    button1: {
        marginBottom: 12
    },
    button2: {
        marginBottom: 15,
    }
});

export default memo(ModalMain);
