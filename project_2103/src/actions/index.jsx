export const SET_LOAD = "SET_LOAD";
export const SET_LEARNER = "SET_LEARNER";
export const SET_LEARNERINFO = "SET_LEARNERINFO";
export const SET_LEARNERSELECT = "SET_LEARNERSELECT";
export const SET_LEARNERINSERT = "SET_LEARNERINSERT";
export const SET_DEVICEID = "SET_DEVICEID";
export const SET_CLASSINTERVAL = "SET_CLASSINTERVAL";

export const setLoad = (data) => {
    return {
        type: SET_LOAD,
        payload: data,
    };
};

export const setLearner = (data) => {
    return {
        type: SET_LEARNER,
        payload: data,
    };
};

export const setLearnerInfo = (data) => {
    return {
        type: SET_LEARNERINFO,
        payload: data,
    };
};

export const setLearnerSelect = (data) => {
    return {
        type: SET_LEARNERSELECT,
        payload: data,
    };
};

export const setLearnerInsert = (data) => {
    return {
        type: SET_LEARNERINSERT,
        payload: data,
    };
};

export const setDeviceId = (data) => {
    return {
        type: SET_DEVICEID,
        payload: data,
    };
};

export const setClassInterval = (data) => {
    return {
        type: SET_CLASSINTERVAL,
        payload: data,
    };
};
