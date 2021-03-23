import React from 'react';

/*숫자에 , 추가되는 함수*/
const numReplace = (val) => {
    if (val === null) {
        /*값이 없을때*/
        return 0;
    } else {
        /*값이 있을때*/
        let num = val + '';
        num = num.split('.');
        /*3자리마다 , 추가*/
        let result = num[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (num[1]) {
            /*소수점이 있을때*/
            result += '.' + num[1];
        }
        return result;
    }
}

export default numReplace;
