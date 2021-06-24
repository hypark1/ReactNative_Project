import React, { memo } from 'react';
import FastImage from 'react-native-fast-image'

/*기본 이미지*/
const MyImg = (props) => {
    return (
        <>
            <FastImage source={props.src}
                   style={props.style}
                   resizeMode={props.resizeMode? props.resizeMode : FastImage.resizeMode.contain} />
        </>
    );
};

export default memo(MyImg);
