import settingActionTypes from "./settingActionTypes";
import userActionTypes from "../user/userActionTypes";
import * as Localization from 'expo-localization';

const initialState = {
    language: Localization.locale.indexOf( "zh" ) >= 0 ? "zh-Hans" : "en"
};

export default function settingReducer( state = initialState, action ) {
    switch ( action.type ) {
        case userActionTypes.LOGOUT: {
            return {
                ...state,
                displayCurrency: null,
            }
        }
        case settingActionTypes.LANGUAGE_UPDATE: {
            return {
                ...state,
                language: action.data,
            }
        }
        default:
            return state;
    }
}
