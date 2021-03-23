import React, { memo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const ReviewMainPagination = (props) => {
    const { idx, list, ChangeIdx, ChangeLeft, ResetRolling, imgWidth } = props;

    /*리얼후기 상단 롤링 페이지네이션*/
    const setDot = useCallback((value) => {
        if (idx === value) {
            return <View style={[styles.swiperDotActive, styles.swiperDotCom]} />
        } else {
            return <View style={[styles.swiperDot, styles.swiperDotCom]} />
        }
    }, [idx]);

    /*리얼후기 상단 페이지네이션 클릭시*/
    const ClickDot = useCallback((value) => {
        ResetRolling();
        if (value === list.length-1) {
            ChangeLeft(imgWidth * -(list.length-1));
            ChangeIdx(list.length-1);
        } else {
            ChangeLeft(imgWidth - (imgWidth * (value +1)));
            ChangeIdx(value);
        }
    }, [list, imgWidth]);

    /*페이지네이션*/
    const PaginationDom = useCallback(() => {
        let dom = <></>;
        if (list.length > 1) {
            dom = list.map((item, index) => {
                return (
                    (list.length -1 !== index) ?
                        <TouchableOpacity key={index}
                                          activeOpacity={1}
                                          onPress={ClickDot.bind(this, index + 1)}>
                            {setDot(index + 1)}
                        </TouchableOpacity>
                        :
                        null
                )
            })
        }
        return dom
    }, [list, idx]);

    return (
        <>
            <View style={styles.pagination}>
                <PaginationDom />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    pagination: {
        position: 'absolute',
        bottom: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    swiperDotCom: {
        width: 12,
        height: 12,
        borderRadius: 7,
        marginLeft: 7,
        marginRight: 7
    },
    swiperDot: {
        backgroundColor: 'rgba(255,255,255,.3)',
    },
    swiperDotActive: {
        backgroundColor: '#63bfbf',
    }
});

export default memo(ReviewMainPagination);
