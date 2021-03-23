import React, { memo } from 'react';
import { Text, StyleSheet } from "react-native";
import Fonts from "~/styles/Fonts";
import Colors from "~/styles/Colors";

/*기본 텍스트*/
const MyText = (props) => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: props.weight? Fonts.weight[props.weight] : Fonts.weight['4'],
            fontSize: props.size? Fonts.size[props.size]: Fonts.size.sm,
            color: props.color? Colors[props.color] : Colors.text,
            letterSpacing: props.en? 0 : -0.7,
            textAlign: props.align
        }
    });

    return (
        <Text style={[styles.text, props.style]}
              numberOfLines={props.line? props.line : null}>
            {props.text}
        </Text>
    );
};

export default memo(MyText);
