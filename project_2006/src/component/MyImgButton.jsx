import React, { memo } from 'react';
import { TouchableOpacity } from "react-native";
import MyImg from "~/component/MyImg";

/*이미지 버튼*/
const MyImgButton = (props) => {
    return (
        <>
            <TouchableOpacity activeOpacity={1}
                              onPress={props.onPress}>
                <MyImg src={props.src}
                       style={props.style} />
            </TouchableOpacity>
        </>
    );
};

export default memo(MyImgButton);
