import React, { memo } from 'react';
import { TouchableOpacity } from "react-native";
import MyText from "~/component/MyText";

/*기본 텍스트 버튼*/
const MyTextButton = (props) => {
    return (
        <>
            <TouchableOpacity activeOpacity={1}
                              style={[{ alignSelf: props.align[0] === 'middle'? 'center' : null,
                              alignItems: props.align[1] === 'center'? 'center' : null }, props.style]}
                              onPress={props.onPress}>
                <MyText text={props.text}
                        size={props.size? props.size : 'default'}
                        family={props.family}
                        color={props.color} />
            </TouchableOpacity>
        </>
    )
};

export default memo(MyTextButton);
