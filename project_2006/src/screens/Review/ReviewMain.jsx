import React, {memo, useState, useRef, useEffect, useCallback, useContext} from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, LayoutAnimation } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Http from '~/modules/Http';
import ErrorSet from "~/modules/ErrorSet";
import ReviewMainList from "~/screens/Review/ReviewMainList";
import ReviewMainPagination from "~/screens/Review/ReviewMainPagination";
import ModalReview from "~/screens/Modal/Review/ModalReview";

const width = 720;
const height = 480;
const screenWidth = Dimensions.get('window').width;
const imgWidth = (screenWidth);
const scaleFactor = width / imgWidth;
const imgHeight = height / scaleFactor;

const gestureConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
}

const ReviewMain = (props) => {
    const [list, setList] = useState([]);
    const [idx, setIdx] = useState(1);
    const [left, setLeft] = useState(-imgWidth);
    const [reviewVisible, setReviewVisible] = useState(false);
    const [modalData, setModalData] = useState(1);
    const interval = useRef();

    useEffect(() => {
        getReviewTop();
    }, []);

    /*리얼후기 상단*/
    const getReviewTop = useCallback(() => {
        Http({
            method: 'GET',
            url: '/review/top-list',
        })
            .then(response => {
                if (response.request.status === 200) {
                    let resData = JSON.parse(response.request._response);
                    let resArr = [];
                    if (resData.length > 1) {
                        /*값이 2개 이상*/
                        resArr = [resData[resData.length-1]].concat(resData);
                        setLeft(-imgWidth);
                    } else {
                        /*값이 1개 이하*/
                        setLeft(0);
                    }
                    setList(resArr);
                }
            })
            .catch(error => {
                ErrorSet(error);
            })
    }, []);

    /*리얼후기 상단 롤링*/
    useEffect(() => {
        // componentDidMount, componentDidUpdate
        interval.current = setInterval(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            let swipeIndex;
            let swipeLeft;
            if (idx > list.length -2) {
                /*현재 index가 리스트 길이보다 크면*/
                swipeIndex = 1;
                swipeLeft = -imgWidth;
            } else {
                /*현재 index가 리스트 길이보다 작으면*/
                swipeIndex = idx + 1;
                swipeLeft = imgWidth - (imgWidth * (idx +2));
            }
            setLeft(swipeLeft);
            setIdx(swipeIndex);
            if (swipeIndex > list.length -2 && list.length > 0) {
                /*현재 index가 리스트 길이보다 크고, 리스트가 있을때*/
                setTimeout(() => {
                    setLeft(0);
                }, 500)
            }
        }, /*Duration*/3000);
        return () => {
            //componentWillUnmount
            clearInterval(interval.current);
        }
    }, [list, left, idx, imgWidth]);

    const ResetRolling = useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        clearInterval(interval.current);
    }, []);

    /*리얼후기 상단 왼쪽 스와이프*/
    const onSwipeLeft = useCallback(() => {
        if (idx !== list.length -1) {
            /*현재 index 가 마지막이 아닐때*/
            ResetRolling();
            let swipeLeft = left - imgWidth;
            setLeft(swipeLeft);
            let swipeIndex = Math.round(swipeLeft/ imgWidth) * (-1);
            setIdx(swipeIndex);
        }
        let length = list.length < 1 ? 5 : list.length;
        if (idx >= length -2) {
            setTimeout(() => {
                setLeft(0);
            }, 500)
        }
    }, [idx, list, imgWidth]);

    /*리얼후기 상단 오른쪽 스와이프*/
    const onSwipeRight = useCallback(() => {
        if (idx !== 1 && idx !== list.length -1) {
            ResetRolling();
            let swipeLeft = left + imgWidth;
            setLeft(swipeLeft);
            let swipeIndex = Math.round(swipeLeft/ imgWidth) * (-1);
            setIdx(swipeIndex);
        }
    }, [idx, list, left, imgWidth]);

    /*리얼후기 상세 열고 닫기*/
    const OpenModal = useCallback((value) => {
        setReviewVisible(true);
        setModalData(value);
    }, []);

    const CloseModal = useCallback(() => {
        setReviewVisible(false);
    }, []);

    /*상단 dom*/
    const MainList = useCallback(() => {
        let dom = list.map((item, index) => {
            return (
                <TouchableOpacity activeOpacity={1}
                                  key={index}
                                  onPress={OpenModal.bind(this, index)}>
                    <ReviewMainList data={item}
                                    imgWidth={imgWidth}
                                    imgHeight={imgHeight} />
                </TouchableOpacity>
            )
        })
        return dom;
    }, [list, imgWidth, imgHeight]);

    /*팝업에서 좋아요 클릭시*/
    const ChangeLikeMain = useCallback((idx) => {
        let value = [...list];
        if (value[idx].is_like_article === 'y') {
            value[idx].like_count = value[idx].like_count - 1;
            value[idx].is_like_article = 'n';
        } else {
            value[idx].like_count = value[idx].like_count + 1;
            value[idx].is_like_article = 'y';
        }
        setList(value);
    }, [list]);

    const ChangeLeft = useCallback((value) => {
        setLeft(value);
    }, []);

    const ChangeIdx = useCallback((value) => {
        setIdx(value);
    }, []);

    return (
        <>
            <GestureRecognizer onSwipeLeft={onSwipeLeft}
                               onSwipeRight={onSwipeRight}
                               config={gestureConfig}>
                <View>
                    <View style={[styles.bannerBox, { left: left, width: imgWidth * list.length }]}>
                        <View style={styles.bannerImgBox}>
                            <MainList />
                        </View>
                    </View>
                    <ReviewMainPagination idx={idx}
                                          list={list}
                                          ChangeLeft={ChangeLeft}
                                          ChangeIdx={ChangeIdx}
                                          ResetRolling={ResetRolling}
                                          imgWidth={imgWidth} />
                </View>
            </GestureRecognizer>
            <ModalReview visible={reviewVisible}
                         data={list[modalData]}
                         index={modalData}
                         change={ChangeLikeMain}
                         onPress={CloseModal}/>
        </>
    )
};

const styles = StyleSheet.create({
    bannerBox: {
        height: imgHeight,
        backgroundColor: '#000',
        position: 'relative'
    },
    bannerImgBox: {
        flexDirection: 'row'
    },
    swiperVideo: {
        width: 80,
        height: 80
    },
});

export default memo(ReviewMain);
