import React, { memo, useRef, useState, useEffect, useCallback } from 'react';
import {StyleSheet, TouchableOpacity} from "react-native"
import ReactNativePickerModule from "react-native-picker-module"

/*학습자 선택*/
const DrawerPicker = (props) => {
    const [list, setList] = useState([]);
    const [click, setClick] = useState(false);
    const pickerRef = useRef();

    useEffect(() => {
        let value = props.list;
        if (value) {
            let arr = [];
            value.map(async (item, index) => {
                arr.push({ label: item.learner_name, value: index });
                if (value.length -1 === index) {
                    await setList(arr);
                    if (click) {
                        pickerRef.current.show();
                    }
                }
            });
        }
    }, [props.list, click]);

    /*학습자 변경*/
    const onValueChange = useCallback((value) => {
        let idx = value;
        if (!idx) {
            /*선택한 학습자 없으면 첫번째 학습자로*/
            idx = 0;
        }
        props.onValueChange(idx);
    }, [props.list]);

    /*학습자 변경 버튼 선택시*/
    const ClickPicker = useCallback( () => {
        /*학습자 리스트 가져오기*/
        props.getLearnerList();
        setTimeout(() => {
            /*학습자 선택 리스트 보이게*/
            setClick(true);
        }, 200)
    }, []);

    return (
        <>
            <TouchableOpacity activeOpacity={1}
                              style={styles.picker}
                              onPress={ClickPicker}>
                <ReactNativePickerModule pickerRef={pickerRef}
                                         items={list}
                                         value={props.selectedValue}
                                         onValueChange={onValueChange} />
            </TouchableOpacity>
        </>
    )
};

const styles = StyleSheet.create({
    picker: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 500,
        height: 500,
        //backgroundColor: 'red'
        //backgroundColor: 'transparent' // 화살표없애기
    },
});

export default memo(DrawerPicker);
