import { netOtcCoins, netOtcEntrust, netOtcEntrustList } from "../net/OtcApiNet";


export function otcCoins( callback ) {
    return ( dispatch ) => {
        netOtcCoins( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function otcEntrustList( coin_id, type, callback ) {
    return ( dispatch ) => {
        netOtcEntrustList( coin_id, type, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function otcEntrust( entrust_id, callback ) {
    return ( dispatch ) => {
        netOtcEntrust( entrust_id, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

