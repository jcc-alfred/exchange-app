import {
    netExchangeDoBatchCancelEntrust,
    netExchangeGetCoinExchangeAreaList,
    netExchangeGetCoinExchangeList,
    netExchangeGetMarketList,
    netExchangeLastPrice
} from "../net/ExchangeApiNet";


export function exchangeGetMarketList( callback ) {
    return ( dispatch ) => {
        netExchangeGetMarketList( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function exchangeGetCoinExchangeList( callback ) {
    return ( dispatch ) => {
        netExchangeGetCoinExchangeList( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function exchangeGetCoinExchangeAreaList( callback ) {
    return ( dispatch ) => {
        netExchangeGetCoinExchangeAreaList( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function exchangeLastPrice( coin_name, callback ) {
    return ( dispatch ) => {
        netExchangeLastPrice( coin_name, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function exchangeDoBatchCancelEntrust( query, callback ) {
    return ( dispatch ) => {
        netExchangeDoBatchCancelEntrust( query, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}