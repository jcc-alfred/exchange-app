import userActionTypes from "./userActionTypes";
import {getEventEmitter} from "../../EventEmitter";
import PubSubConstant from "../../pubSub/PubSubConstant";

const initialState = {
        isLoggedIn: false,
        account: {
            account: null,
            password: null
        },
        requestCookie: {
            token: '',
        },
        safePass: '',
        userInfo: {},
        loginHistoryForDebug: [
            {
                account: 'jie.xiao@gtdollar.com',
                password: '123456'
            }
        ],
    }
;

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case userActionTypes.LOGIN: {
            getEventEmitter().emit(PubSubConstant.PUB_SUB_LOGIN_SUCCESS, '');

            return {
                ...state,
                isLoggedIn: true,
                account: action.data
            }
        }
        case userActionTypes.UPDATE_USER_INFO: {
            return {
                ...state,
                userInfo: action.data
            }
        }
        case userActionTypes.SAVE_SAFE_PASS:{
            return{
                ...state,
                safePass:action.data
            }
        }
        case userActionTypes.LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                safePass:'',
                account: {},
                requestCookie: {
                    token: '',
                },
                userInfo: {},
                userFiles: {},
                systemNotification: [],
                userNotification: [],
            }
        }

        case userActionTypes.UPDATE_HTTP_REQUEST_COOKIE: {
            return {
                ...state,
                requestCookie: Object.assign({}, state.requestCookie, action.data)
            }
        }
        case userActionTypes.RECORD_LOGIN_HISTORY: {
            return {
                ...state,
                loginHistoryForDebug: recordLoginHistory(state, action.data)
            }
        }
        default:
            return state;
    }
}


function recordLoginHistory(state, data) {

    const loginHistoryForDebug = state.loginHistoryForDebug.slice();

    for (let index = 0; index < loginHistoryForDebug.length; index++) {
        if (data.account === loginHistoryForDebug[index].account) {
            loginHistoryForDebug.splice(index, 1);
            break;
        }
    }

    loginHistoryForDebug.unshift(data);

    return loginHistoryForDebug;
}



