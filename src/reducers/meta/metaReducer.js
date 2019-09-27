import userActionTypes from "../user/userActionTypes";
import {getEventEmitter} from "../../EventEmitter";
import PubSubConstant from "../../pubSub/PubSubConstant";
import metaActionTypes from "./metaActionTypes";

const initialState = {
    coin_exchange_area: [],
    entrustList: []
};

export default function metaReducer(state = initialState, action) {
    switch (action.type) {
        case metaActionTypes.COIN_EXCHANGE_AREA: {
            return {
                ...state,
                coin_exchange_area: action.data,
            }
        }
        default:
            return state;
    }
}
