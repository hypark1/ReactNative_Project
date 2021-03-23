import React, { memo } from 'react';
import { StyleSheet, View} from 'react-native';
import Colors from "~/styles/Colors";
import MyText from "~/component/MyText";

const ReportTitle = (props) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.dot} />
                <MyText text={props.title}
                        size={'xm'}
                        weight={'6'}
                        style={styles.title} />
                {
                    props.text ?
                        <MyText text={props.text}
                                size={'xm'} />
                        :
                        null
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dot: {
        width:5,
        height: 5,
        backgroundColor: Colors.text,
        borderRadius: 50,
        marginRight: 5
    },
    title: {
        marginRight: 10
    },
})


export default memo(ReportTitle);
