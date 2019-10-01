import { netUserSendCode } from "../net/UserApiNet";

import { netAuthSignUp } from "../net/AuthApiNet"

export function userSendCode( query, callback ) {
    return ( dispatch ) => {
        netUserSendCode( query, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export  function userSignUp(account, password, imgCode, callback ) {
    return (dispatch) => {
        netAuthSignUp(account,password,imgCode,( err, res ) => {
            //netAuthSignUp
            callback && callback(err,res)
        });
    };
}