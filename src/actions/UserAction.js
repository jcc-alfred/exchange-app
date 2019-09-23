import { netUserGetAssets } from "../net/UserApiNet";

export function userGetAssets( callback ) {
    return ( dispatch ) => {
        netUserGetAssets( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}



