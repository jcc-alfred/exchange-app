import {
    netOtcCoins,
    netOtcEntrust,
    netOtcEntrustCancel,
    netOtcEntrustCreate,
    netOtcEntrustList,
    netOtcEntrustMy,
    netOtcOrder,
    netOtcOrderCancel,
    netOtcOrderConfirm,
    netOtcOrderCreate,
    netOtcOrderMy,
    netOtcOrderPay,
    netOtcSecretRemark,
    netGetOtcSecretRemark
} from "../net/OtcApiNet";


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

export function otcOrder( id, callback ) {
    return ( dispatch ) => {
        netOtcOrder( id, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function otcSecretRemark( secret_remark, callback ) {
    return ( dispatch ) => {
        netOtcSecretRemark( secret_remark, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function otcGetSecretRemark( callback ) {
    return ( dispatch ) => {
        netGetOtcSecretRemark( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function otcOrderCreate( entrust_id, coin_amount, callback ) {
    return ( dispatch ) => {
        netOtcOrderCreate( entrust_id, coin_amount, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function otcOrderPay( order_id, callback ) {
    return ( dispatch ) => {
        netOtcOrderPay( order_id, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function otcOrderConfirm( order_id, safePass, callback ) {
    return ( dispatch ) => {
        netOtcOrderConfirm( order_id, safePass, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function otcEntrustCreate( query, callback ) {
    return ( dispatch ) => {
        netOtcEntrustCreate( query, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function otcEntrustCancel( entrust_id, callback ) {
    return ( dispatch ) => {
        netOtcEntrustCancel( entrust_id, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function otcOrderCancel( entrust_id, callback ) {
    return ( dispatch ) => {
        netOtcOrderCancel( entrust_id, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function otcEntrustMy( callback ) {
    return ( dispatch ) => {
        netOtcEntrustMy( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function otcOrderMy( coin_id, callback ) {
    return ( dispatch ) => {
        netOtcOrderMy( coin_id, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

