import userActionTypes from "./userActionTypes";
import { getEventEmitter } from "../../EventEmitter";
import PubSubConstant from "../../pubSub/PubSubConstant";

const initialState = {
        isLoggedIn: false,
        account: {
            phoneRegion: null,
            phone: null,
            password: null
        },
        requestCookie: {
            token: '',
        },
        userInfo: {},
        loginHistoryForDebug: [
            {
                phoneRegion: 'SG',
                phone: '712345678',
                password: '12345678'
            },
            {
                phoneRegion: 'SG',
                phone: '77777777',
                password: '12345678'
            }
        ]
    }
;

export default function userReducer( state = initialState, action ) {
    switch ( action.type ) {
        case userActionTypes.LOGIN: {
            getEventEmitter().emit( PubSubConstant.PUB_SUB_LOGIN_SUCCESS, '' );

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
        case userActionTypes.LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
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
                requestCookie: Object.assign( {}, state.requestCookie, action.data )
            }
        }
        case userActionTypes.RECORD_LOGIN_HISTORY: {
            return {
                ...state,
                loginHistoryForDebug: recordLoginHistory( state, action.data )
            }
        }
        default:
            return state;
    }
}


function recordLoginHistory( state, data ) {

    const loginHistoryForDebug = state.loginHistoryForDebug.slice();

    for ( let index = 0; index < loginHistoryForDebug.length; index++ ) {
        if ( data.phone === loginHistoryForDebug[ index ].phone && data.phoneRegion === loginHistoryForDebug[ index ].phoneRegion ) {
            loginHistoryForDebug.splice( index, 1 );
            break;
        }
    }

    loginHistoryForDebug.unshift( data );

    return loginHistoryForDebug;
}



