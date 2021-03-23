import React, { memo, useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, StyleSheet } from "react-native";
import MyText from "~/component/MyText";
import MyImg from "~/component/MyImg";
import Colors from "~/styles/Colors";

/*기본 버튼*/
const MyButton = (props) => {
    const [type, setType] = useState({});

    useEffect(() => {
        TypeSetting();
    }, []);

    const TypeSetting = useCallback(() => {
        const value = {};
        if (props.type === 'primary') {
            value.backgroundColor = Colors.primary;
            value.color = Colors.white;
            value.borderColor = Colors.primary;
        } else if (props.type === 'white') {
            value.backgroundColor = Colors.white;
            value.color = Colors.primary;
            value.borderColor = Colors.primary;
        } else if (props.type === 'gray') {
            value.backgroundColor = Colors.gray;
            value.color = Colors.white;
            value.borderColor = Colors.gray;
        }
        setType(value);
    }, []);

    return (
        <>
            <TouchableOpacity activeOpacity={0.9}
                              style={[styles.container, {
                                  backgroundColor: type.backgroundColor,
                                  borderWidth: props.border? props.border : 2,
                                  borderColor: type.borderColor, },
                                  props.style]}
                              onPress={props.onPress}>
                <MyText text={props.text}
                        style={{color: type.color}}
                        size={props.size? props.size : 'xm'}
                        weight={props.weight? props.weight : '6'} />
                {
                    props.img ?
                        <MyImg src={props.src}
                               style={styles.img}/>
                        :
                        null
                }
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 52
    },
    img: {
        width: 20,
        height: 20,
        marginLeft: 5
    }
});

export default memo(MyButton);
