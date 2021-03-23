import React, { memo, useState, useCallback } from 'react';
import MissionCreateBtn from "~/screens/Mission/MissionCreateBtn";
import MissionDoneList from "~/screens/Mission/MissionDoneList";
import ModalMissionView from "~/screens/Modal/Mission/ModalMissionView";

/*완료한 챌린지*/
const MissionDone = (props) => {
    const [visible, setVisible] = useState(false);
    const [idx, setIdx] = useState(0);

    /*챌린지 상세보기 팝업 열기*/
    const OpenMissionView = useCallback((value) => {
        setIdx(value)
        setVisible(true)
    },[]);

    /*챌린지 상세보기 팝업 닫기*/
    const CloseMissionView = useCallback(() => {
        setVisible(false);
        props.change(idx + 'change');
    }, [idx]);

    /*챌린지 완료 dom*/
    const SetDoneDom = useCallback(() => {
        let dom;
        if (props.value) {
            if (props.value.length > 0) {
                /*완료된 챌린지 있으면*/
                dom = (
                    <>
                        <MissionDoneList value={props.value}
                                         open={OpenMissionView}
                                         close={CloseMissionView}
                                         refresh={props.refresh}/>
                        <ModalMissionView visible={visible}
                                          onPress={CloseMissionView}
                                          id={props.value[idx].hdm_challenge_id} />
                    </>
                )
            } else {
                /*완료된 챌린지 없으면*/
                dom = (
                    <MissionCreateBtn type={'done'}
                                      going={props.going}
                                      refresh={props.refresh}/>
                )
            }
            return dom;
        }
    }, [idx, props.value, visible]);

    return (
        <>
            { SetDoneDom() }
        </>
    );
};

export default memo(MissionDone);
