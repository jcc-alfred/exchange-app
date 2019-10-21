import { netAssetsDoUserWithdraw, netAssetsGetUserAssets } from "../net/AssetsApiNet";


export function assetsGetUserAssets( callback ,refresh = false) {
    return ( dispatch ) => {
        netAssetsGetUserAssets( refresh,( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function assetsDoUserWithdraw( query, callback ) {
    return ( dispatch ) => {
        netAssetsDoUserWithdraw( query, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}
