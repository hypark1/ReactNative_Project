import React, { memo } from 'react';
import MyTextButton from "~/component/MyTextButton";

const LoginTextButton = (props) => {
    return (
        <>
            <MyTextButton text={props.text}
                          onPress={props.onPress}
                          style={props.style}
                          size={'xs'}
                          weight={'5'}
                          color={'darkGray'}
                          align={'middle'} />
        </>
    )
};

export default memo(LoginTextButton);
