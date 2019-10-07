import { netUserMe, netUserSendCode } from "../net/UserApiNet";

import { netSafeAddUserKYC, netSafeAddUserSeniorKYC } from "../net/AuthApiNet"
import userActionTypes from "../reducers/user/userActionTypes";

export function userSendCode( query, callback ) {
    return ( dispatch ) => {
        netUserSendCode( query, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function userMe( callback ) {
    return ( dispatch ) => {
        netUserMe( ( err, res ) => {
            if ( !err ) {
                dispatch( {
                    type: userActionTypes.UPDATE_USER_INFO,
                    data: res.data.userInfo,
                } );

                dispatch( {
                    'type': userActionTypes.UPDATE_USER_IDENTITY,
                    data: res.data.userIdentity
                } );

            }
            callback && callback( err, res )
        } );
    };
}

export function safeAddUserKYC( query, callback ) {
    return ( dispatch ) => {
        netSafeAddUserKYC( query, ( err, res ) => {
            if ( !err ) {
                dispatch( userMe( null ) );
            }

            callback && callback( err, res )
        } );
    };
}

export function safeAddUserSeniorKYC( query, callback ) {
    return ( dispatch ) => {
        netSafeAddUserSeniorKYC( query, ( err, res ) => {
            if ( !err ) {
                dispatch( userMe( null ) );
            }

            callback && callback( err, res )
        } );
    };
}