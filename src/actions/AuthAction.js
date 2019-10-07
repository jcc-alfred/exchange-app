import { netAuthLogin } from "../net/AuthApiNet1";
import userActionTypes from "../reducers/user/userActionTypes";
import { netAuthForgotLoginPassword, netAuthSignUp } from "../net/AuthApiNet";
import { userMe } from "./UserAction";

export function authLogin( account, password, imageCode, callback ) {
    return ( dispatch ) => {
        netAuthLogin( account, password, imageCode, ( err, res ) => {
            if ( !err ) {
                dispatch( {
                    type: userActionTypes.LOGIN,
                    data: {
                        account: account,
                        password: password
                    }
                } );

                dispatch( {
                    'type': userActionTypes.RECORD_LOGIN_HISTORY,
                    data: {
                        account: account,
                        password: password
                    }
                } );

                dispatch( {
                    type: userActionTypes.UPDATE_USER_INFO,
                    data: res.data.userInfo,
                } );

                dispatch( userMe( null ) );
            }
            callback && callback( err, res )
        } );
    };
}

export function authSignUp( query, callback ) {
    return ( dispatch ) => {
        netAuthSignUp( query, ( err, res ) => {
            if ( !err ) {
                dispatch( {
                    type: userActionTypes.LOGIN,
                    data: {
                        account: query.accountType === 'email' ? query.email : query.areaCode + query.phoneNumber,
                        password: query.loginPass
                    }
                } );

                dispatch( {
                    'type': userActionTypes.RECORD_LOGIN_HISTORY,
                    data: {
                        account: query.accountType === 'email' ? query.email : query.areaCode + query.phoneNumber,
                        password: query.loginPass
                    }
                } );

                dispatch( {
                    type: userActionTypes.UPDATE_USER_INFO,
                    data: res.data.userInfo,
                } );
                dispatch( userMe( null ) );
            }
            callback && callback( err, res )
        } );
    };
}

export function authForgotLoginPassword( query, callback ) {
    return ( dispatch ) => {
        netAuthForgotLoginPassword( query, ( err, res ) => {
            if ( !err ) {
                dispatch( {
                    type: userActionTypes.LOGIN,
                    data: {
                        account: query.accountType === 'email' ? query.email : query.areaCode + query.phoneNumber,
                        password: query.loginPass
                    }
                } );

                dispatch( {
                    'type': userActionTypes.RECORD_LOGIN_HISTORY,
                    data: {
                        account: query.accountType === 'email' ? query.email : query.areaCode + query.phoneNumber,
                        password: query.loginPass
                    }
                } );

                dispatch( {
                    type: userActionTypes.UPDATE_USER_INFO,
                    data: res.data.userInfo,
                } );

                dispatch( userMe( null ) );
            }
            callback && callback( err, res )
        } );
    };
}

export function authLogout( callback ) {
    return ( dispatch ) => {
        dispatch( {
            type: userActionTypes.LOGOUT,
        } );

        callback && callback( null, null )
    };
}
