import { netUserSendCode } from "../net/UserApiNet";

export function userSendCode( callback ) {
    return ( dispatch ) => {
        netUserSendCode( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}