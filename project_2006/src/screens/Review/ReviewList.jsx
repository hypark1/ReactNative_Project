import React, {memo, useState, useEffect, useContext, useCallback} from 'react';
import { LayoutAnimation, UIManager, Platform } from 'react-native';
import { useDispatch } from "react-redux";
import { setLoad } from '~/actions'
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import MyListDom from "~/component/MyListDom";
import ReviewContext from "~/screens/Review/ReviewContext";

const ReviewList = (props) => {
    const { data } = useContext(ReviewContext);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, []);

    /*리스트 상세 보여주기 토글*/
    const toggleList = useCallback((idx) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        visible === idx ? setVisible(false) : setVisible(idx);
        listCount(idx);
    }, [data, visible]);

    /*리얼후기 조회수 증가*/
    const listCount = useCallback((value) => {
        if(!(value === visible)) {
            let id = data[value].article_id;
            Http({
                method: 'PUT',
                url: '/review/count/' + id
            })
                .then(response => {
                })
                .catch(error => {
                    ErrorSet(error);
                })
        }
    }, [data, visible]);

    const ListDom = useCallback(() => {
        let dom = data.map((item, index) => {
            return (
                <MyListDom key={index}
                           index={index}
                           item={item}
                           visible={visible}
                           toggleList={toggleList} />
            )
        });
        return dom;
    }, [data, visible]);

    return (
        <>
            { ListDom() }
        </>
    )
};

export default memo(ReviewList);
