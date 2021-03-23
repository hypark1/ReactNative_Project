import React, { memo, useCallback } from 'react';
import MissionCreateBtn from "~/screens/Mission/MissionCreateBtn";
import MissionGoingDom from "~/screens/Mission/MissionGoingDom";

/*진행중인 챌린지*/
const MissionGoing = (props) => {
    /*진행중인 챌린지 dom*/
    const SetDom = useCallback(() => {
        let dom;
        if (props.value) {
            if (props.value.challenge_items) {
                /*진행중인 챌린지 있으면*/
                dom = (
                    <MissionGoingDom value={props.value}
                                     onPress={props.cancel}
                                     refresh={props.refresh}/>
                )
            } else {
                /*진행중인 챌린지 없으면*/
                dom = (
                    <MissionCreateBtn type={'going'}
                                      change={props.change}
                                      refresh={props.refresh}/>
                )
            }
            return dom;
        }
    }, [props.value]);

    return (
        <>
            { SetDom() }
        </>
    );
};

export default memo(MissionGoing);
