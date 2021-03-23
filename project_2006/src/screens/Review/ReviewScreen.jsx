import React, { useState, useEffect, useCallback } from 'react';
import {Dimensions, RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import { useDispatch } from "react-redux";
import { setLoad } from '~/actions'
import I18n from "~/locales/I18n";
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import MyHeader from "~/component/MyHeader";
import MyListLoad from "~/component/MyListLoad";
import ReviewMain from "~/screens/Review/ReviewMain";
import ReviewList from "~/screens/Review/ReviewList";
import ReviewContext from "~/screens/Review/ReviewContext";
import Colors from "~/styles/Colors";
import Style from "~/styles/Style";

const { t } = I18n;

/*리얼후기 화면*/
const ReviewScreen = (props) => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [pageVal, setPageVal] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoad(true));
        setPageVal(true);
        getReviewList();
    }, []);

    /*새로고침*/
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getReviewList();
    }, []);

    /*리얼후기 리스트*/
    const getReviewList = useCallback(() => {
        if (pageVal) {
            /*리스트 가져오고 있지 않을때*/
            setPageVal(false);
            let data = {
                direction: 'ASC',
                page: page,
                size: 10
            }
            Http({
                method: 'GET',
                params: data,
                url: '/review/list',
            })
                .then(response => {
                    if (response.request.status === 200) {
                        let res = JSON.parse(response.request._response);
                        let resData = res.content;
                        /*원래 배열에 새로 추가*/
                        let currentData = list.concat(resData);
                        setList(currentData);
                        setTotal(res.total_pages);
                        let listPage = page;
                        setPage(listPage + 1);
                        setPageVal(true);
                    }
                    dispatch(setLoad(false));
                    setRefreshing(false);
                })
                .catch(error => {
                    ErrorSet(error, props.navigation);
                    dispatch(setLoad(false));
                    setRefreshing(false);
                })
        }
    }, [page, pageVal]);

    /*좋아요 클릭시*/
    const ChangeLike = useCallback((idx) => {
        let value = [...list];
        if (value[idx].is_like_article === 'y') {
            /*좋아요O을 클릭*/
            value[idx].like_count = value[idx].like_count - 1;
            value[idx].is_like_article = 'n';
        } else {
            /*좋아요X를 클릭*/
            value[idx].like_count = value[idx].like_count + 1;
            value[idx].is_like_article = 'y';
        }
        setList(value);
    }, [list]);

    /*스크롤 이벤트*/
    const onScroll = (e) => {
        const windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if(windowHeight + offset >= height -100){
            /*화면끝보다 100 덜왔을때*/
            if (total > page) {
                /*전체페이지값보다 현재페이지값이 작을때*/
                getReviewList();
            }
        }
    };

    return (
        <>
            <SafeAreaView style={Style.SafeAreaView}>
                <MyHeader title={t('menu.review')} navigation={props.navigation} />
                <ScrollView style={{ backgroundColor: Colors.white }}
                            scrollEventThrottle={16}
                            refreshControl={ <RefreshControl refreshing={refreshing}
                                                             onRefresh={onRefresh}/> }
                            onScroll={onScroll}>
                    <ReviewContext.Provider value={{ data: list, changeLike: ChangeLike }}>
                        <ReviewMain />
                        <ReviewList list={list} />
                        <MyListLoad total={total}
                                    page={page} />
                    </ReviewContext.Provider>
                </ScrollView>
            </SafeAreaView>
        </>
    )
};

export default ReviewScreen;
