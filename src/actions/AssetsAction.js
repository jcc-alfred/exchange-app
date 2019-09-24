import { netAssetsGetUserAssets } from "../net/AssetsApiNet";


export function assetsGetUserAssets( callback ) {
    return ( dispatch ) => {
        netAssetsGetUserAssets( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}



