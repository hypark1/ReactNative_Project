import React, {memo, useCallback, useEffect, useState} from 'react';
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import ModalMain from "~/screens/Modal/ModalMain";

const PopupScreen = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        GetPopupList();
    }, []);

    /*팝업 공지 리스트*/
    const GetPopupList = useCallback(() => {
        Http({
            method: 'GET',
            url: '/popup',
        })
            .then(response => {
                if (response.request.status === 200) {
                    let res = JSON.parse(response.request._response);
                    setList(res);
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, []);

    const SetListDom = useCallback(() => {
        if (list.length > 0) {
            let dom = list.map((item, index) => {
                return (
                    <ModalMain data={item}
                               key={item.popup_notice_id}/>
                )
            })
            return dom;
        } else {
            return null
        }
    }, [list]);

    return (
        <>
            { SetListDom() }
        </>
    )
};

export default memo(PopupScreen);
