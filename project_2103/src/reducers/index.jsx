import { SET_LOAD, SET_LEARNER, SET_LEARNERINFO, SET_LEARNERSELECT, SET_LEARNERINSERT, SET_DEVICEID, SET_CLASSINTERVAL } from "~/actions";
import { combineReducers } from "redux";

const initState = {
    load: false,
    learner: [],
    learner_info: null,
    learner_select: null,
    learner_insert: null,
    device_id: 0,
    class_interval: true,
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOAD:
            return {
                ...state,
                load: action.payload
            }
        case SET_LEARNER:
            return {
                ...state,
                learner: action.payload
            }
        case SET_LEARNERINFO:
            return {
                ...state,
                learner_info: action.payload
            }
        case SET_LEARNERSELECT:
            return {
                ...state,
                learner_select: action.payload
            }
        case SET_LEARNERINSERT:
            return {
                ...state,
                learner_insert: action.payload
            }
        case SET_DEVICEID:
            return {
                ...state,
                device_id: action.payload
            }
        case SET_CLASSINTERVAL:
            return {
                ...state,
                class_interval: action.payload
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({ reducer });

export default rootReducer;
