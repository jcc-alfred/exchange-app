import { netAssetsDoUserWithdraw, netAssetsGetUserAssets } from "../net/AssetsApiNet";
import userActionTypes from "../reducers/user/userActionTypes";


export function assetsGetUserAssets( callback ,refresh = false) {
    return ( dispatch ) => {
        netAssetsGetUserAssets( refresh,( err, res ) => {
            if ( !err ) {
                dispatch(
                    {
                        type: userActionTypes.UPDATE_USER_ASSET,
                        data: res.data
                    }
                )
            }
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
