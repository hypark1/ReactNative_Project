import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import MyImg from "~/component/MyImg";
import MyText from "~/component/MyText";
import MyTextButton from "~/component/MyTextButton";
import Colors from "~/styles/Colors";
import Style from "~/styles/Style";

/*전체/월별 학습현황 개별 card*/
const ReportCard = (props) => {
    return (
        <>
            <View style={[Style.reportCardBox, styles.container]}>
                <View style={styles.iconBox}>
                    <MyImg src={props.src}
                           style={styles.icon}/>
                </View>
                <View style={styles.textBox}>
                    <View>
                    <MyText text={props.title}
                            size={'sm'} />
                    <MyText text={props.day}
                            size={'xl'}
                            color={props.color}
                            style={styles.day} />
                    {
                        props.text?
                            /*설명이 있을때*/
                            <MyText text={props.text}
                                    size={'xs'}
                                    style={styles.day} />
                                    :
                            null
                    }
                    </View>
                </View>
                {
                    props.button ?
                        /*버튼이 있을때*/
                        <MyTextButton text={props.button}
                                      size={'xxs'}
                                      onPress={props.onPress}
                                      style={styles.button} />
                        :
                        null
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
    },
    iconBox: {
        flex: 2,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 60,
        height: 60
    },
    textBox: {
        flex: 3,
        justifyContent: 'center'
    },
    day: {
        marginTop: 10
    },
    button: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderWidth: 1,
        borderColor: Colors.line,
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: 30,
        borderRadius: 7
    }
})


export default memo(ReportCard);
