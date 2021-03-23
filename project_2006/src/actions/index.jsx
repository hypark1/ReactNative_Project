export const SET_LOAD = "SET_LOAD";
export const SET_LEARNER = "SET_LEARNER";
export const SET_LEARNERNAME = "SET_LEARNERNAME";
export const SET_ROUTE = "SET_ROUTE";
export const SET_DEVICEID = "SET_DEVICEID";
export const SET_COUPON = "SET_COUPON";
export const SET_PUSH = "SET_PUSH";

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

export const setLearnerName = (data) => {
    return {
        type: SET_LEARNERNAME,
        payload: data,
    };
};

export const setRoute = (data) => {
    return {
        type: SET_ROUTE,
        payload: data,
    };
};

export const setDeviceId = (data) => {
    return {
        type: SET_DEVICEID,
        payload: data,
    };
};

export const setCoupon = (data) => {
    return {
        type: SET_COUPON,
        payload: data,
    };
};

export const setPush = (data) => {
    return {
        type: SET_PUSH,
        payload: data,
    };
};
