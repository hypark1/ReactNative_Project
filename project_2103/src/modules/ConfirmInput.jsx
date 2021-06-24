import React from 'react';

/*input 특수문자 확인*/
const ConfirmInput = (value) => {
    let special_pattern = /[`~!+=_@#})>,.♥♡★☆※♩♪♬$%^<{}(&*|\\\'\"\-;:\/?]/gi;
    let result = special_pattern.test(value);

    return result;
};

export default ConfirmInput;
