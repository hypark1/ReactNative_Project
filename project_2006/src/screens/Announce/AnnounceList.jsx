import React, { memo, useState, useEffect, useCallback } from 'react';
import {LayoutAnimation, UIManager, Platform, ScrollView, Dimensions, RefreshControl} from 'react-native';
import { useDispatch } from "react-redux";
import { setLoad } from '~/actions'
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import AnalyticsSet from "~/modules/AnalyticsSet";
import MyListDom from "~/component/MyListDom";
import MyListLoad from "~/component/MyListLoad";
import Colors from "~/styles/Colors";

/*공지사항 리스트*/
const AnnounceList = () => {
    const [visible, setVisible] = useState(false);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [pageVal, setPageVal] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        /*로딩화면 보이게*/
        dispatch(setLoad(true));
        /*리스트 가져올수있게*/
        setPageVal(true);
        /*리스트 가져오기*/
        getAnnounceList();
        AnalyticsSet('screen', 'Announce_PV');
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, []);

    /*공지사항 새로고침*/
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAnnounceList();
    }, []);

    /*리스트 상세 열기 토글*/
    const toggleList = (idx) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        visible === idx ? setVisible(false) : setVisible(idx);
        listCount(idx);
    };

    /*공지사항 리스트 가져오기*/
    const getAnnounceList = useCallback(() => {
        if (pageVal) {
            setPageVal(false);
            let data = {
                page: page
            }
            Http({
                method: 'GET',
                params: data,
                url: '/announce',
            })
                .then(response => {
                    if (response.request.status === 200) {
                        let res = JSON.parse(response.request._response);
                        let resData = res.content;
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


    /*공지사항 조회수 증가*/
    const listCount = useCallback((value) => {
        if(!(value === visible)) {
            let id = list[value].article_id;
            Http({
                method: 'GET',
                url: '/announce/' + id
            })
                .then(response => {
                })
                .catch(error => {
                    ErrorSet(error);
                })
        }
    }, [list, visible]);

    /*화면 아래로 가면 다음 리스트 불러오기*/
    const onScroll = (e) => {
        const windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if (windowHeight + offset >= height -100){
            if (total > page) {
                getAnnounceList();
            }
        }
    };

    /*공지사항 리스트 dom 만들기*/
    const ListDom = useCallback(() => {
        let dom = list.map((item, index) => {
            return (
                <MyListDom type={'announce'}
                           key={index}
                           index={index}
                           item={item}
                           visible={visible}
                           toggleList={toggleList} />
            )
        });
        return dom;
    }, [list, visible]);

    return (
        <>
            <ScrollView style={{ backgroundColor: Colors.white }}
                        scrollEventThrottle={16}
                        refreshControl={
                            <RefreshControl refreshing={refreshing}
                                            onRefresh={onRefresh} />
                        }
                        onScroll={onScroll}>
                { ListDom() }
                <MyListLoad total={total}
                            page={page} />
            </ScrollView>
        </>
    )
};

export default memo(AnnounceList);
