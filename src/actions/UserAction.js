import { netUserMe, netUserSendCode } from "../net/UserApiNet";

import { netAuthSignUp } from "../net/AuthApiNet"
import userActionTypes from "../reducers/user/userActionTypes";

export function userSendCode( query, callback ) {
    return ( dispatch ) => {
        netUserSendCode( query, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function userSignUp( account, password, imgCode, callback ) {
    return ( dispatch ) => {
        netAuthSignUp( account, password, imgCode, ( err, res ) => {
            //netAuthSignUp
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