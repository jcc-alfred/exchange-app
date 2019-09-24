import { netUserSendCode } from "../net/UserApiNet";

export function userSendCode( query, callback ) {
    return ( dispatch ) => {
        netUserSendCode( query, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}