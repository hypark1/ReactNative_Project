import { SET_LOAD, SET_LEARNER, SET_LEARNERNAME, SET_ROUTE, SET_DEVICEID, SET_COUPON, SET_PUSH } from "~/actions";
import { combineReducers } from "redux";

const initState = {
    load: false,
    learner: [],
    learner_name: null,
    route: 'Chunk',
    device_id: 0,
    coupon: false,
    push: null
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
        case SET_LEARNERNAME:
            return {
                ...state,
                learner_name: action.payload
            }
        case SET_ROUTE:
            return {
                ...state,
                route: action.payload
            }
        case SET_DEVICEID:
            return {
                ...state,
                device_id: action.payload
            }
        case SET_COUPON:
            return {
                ...state,
                coupon: action.payload
            }
        case SET_PUSH:
            return {
                ...state,
                push: action.payload
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({ reducer });

export default rootReducer;
