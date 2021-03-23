import React, { memo } from 'react';
import { ImageBackground } from "react-native";

/*기본 배경이미지*/
const MyImgBackground = (props) => {
    return (
        <>
            <ImageBackground source={props.src}
                             style={props.style}
                             resizeMode={props.resizeMode} />
        </>
    );
};

export default memo(MyImgBackground);
