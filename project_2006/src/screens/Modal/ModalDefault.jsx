import React from "react";
import {Modal, StyleSheet, View, TouchableWithoutFeedback, KeyboardAvoidingView, Platform} from "react-native";
import MyText from "~/component/MyText";
import ModalClose from "~/screens/Modal/ModalClose";
import Style from "~/styles/Style";
import Colors from "~/styles/Colors";

/*모달 팝업 default dom*/
const ModalDefault = (props) => {
    return (
        <>
            <Modal animationType={'fade'}
                   transparent={true}
                   visible={props.visible}
                   onRequestClose={props.onPress}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={props.onPress}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                    <View style={styles.modalBox}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'android'? null : 'position'}
                                              keyboardVerticalOffset={Platform.OS === 'android'? null : 100}
                                              enabled>
                            <View style={[Style.header, Style.headerPrimary ]}>
                                <View style={Style.headerTitle}>
                                    <MyText text={props.title}
                                            size={'lg'}
                                            weight={'6'}
                                            color={'white'}
                                            align={'center'} />
                                </View>
                                <View style={Style.headerRight}>
                                    <ModalClose onPress={props.onPress}
                                                type={'white'} />
                                </View>
                            </View>
                            <View style={styles.contentBox}>
                                {props.component}
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.8)'
    },
    modalBox: {
        flex: 0.8,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    contentBox: {
        padding: 20,
        backgroundColor: Colors.white
    },
    dinoBtnBox: {
        flexDirection: 'row',
        marginTop: 15,
    },
    dinoBtn: {
        flex: 10,
    }
});

export default ModalDefault;
