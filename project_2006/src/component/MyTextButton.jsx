import React, { memo } from 'react';
import { TouchableOpacity } from "react-native";
import MyText from "~/component/MyText";

/*기본 텍스트 버튼*/
const MyTextButton = (props) => {
    return (
        <>
            <TouchableOpacity activeOpacity={1}
                              style={[{ alignSelf: props.align === 'middle'? 'center' : null }, props.style]}
                              onPress={props.onPress}>
                <MyText text={props.text}
                        size={props.size}
                        weight={props.weight}
                        color={props.color} />
            </TouchableOpacity>
        </>
    )
};

export default memo(MyTextButton);
