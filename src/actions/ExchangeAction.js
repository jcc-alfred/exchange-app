import {
    netExchangeDoBatchCancelEntrust,
    netExchangeDoCancelEntrust,
    netExchangeDoEntrust,
    netExchangeEntrustList,
    netExchangeGetCoinExchangeAreaList,
    netExchangeGetCoinExchangeList,
    netExchangeGetCoinList,
    netExchangeGetEntrustList,
    netExchangeGetIsExchangeSafe,
    netExchangeGetMarketList,
    netExchangeGetUserDepositListByCoinId,
    netExchangeGetUserEntrustList,
    netExchangeGetUserHistoryEntrustList,
    netExchangeGetUserWithdrawListByCoinId,
    netExchangeLastPrice
} from "../net/ExchangeApiNet";
import metaActionTypes from "../reducers/meta/metaActionTypes";
import { netDocGetHomeNewsList } from "../net/DocApiNet";


export function exchangeGetMarketList( callback ) {
    return ( dispatch ) => {
        netExchangeGetMarketList( ( err, res ) => {
            if ( !err ) {
                dispatch(
                    {
                        type: metaActionTypes.MARKET_LIST,
                        data: res.data
                    }
                )
            }
            callback && callback( err, res )
        } );
    };
}

export function exchangeUpdateMarketList( marketList ) {
    return ( dispatch ) => {
        dispatch(
            {
                type: metaActionTypes.MARKET_LIST,
                data: marketList
            }
        )
    };
}


export function changeTradePageCoinExchange( coinEx ) {
    return ( dispatch ) => {
        dispatch(
            {
                type: metaActionTypes.CHANGE_TRADE_EX,
                data: coinEx
            }
        );
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
            if ( !err ) {
                dispatch( {
                    type: metaActionTypes.COIN_EXCHANGE_AREA,
                    data: res.data
                } )
            }
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

export function exchangeGetUserDepositListByCoinId( query, callback ) {
    return ( dispatch ) => {
        netExchangeGetUserDepositListByCoinId( query, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function exchangeGetUserWithdrawListByCoinId( query, callback ) {
    return ( dispatch ) => {
        netExchangeGetUserWithdrawListByCoinId( query, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function exchangeGetCoinList( callback ) {
    return ( dispatch ) => {
        netExchangeGetCoinList( ( err, res ) => {
            if ( !err ) {
                dispatch( {
                    type: metaActionTypes.COIN_LIST,
                    data: res.data
                } )
            }

            callback && callback( err, res )
        } );
    };
}

export function exchangeGetEntrustList( coinExchangeId, callback ) {
    return ( dispatch ) => {
        netExchangeGetEntrustList( coinExchangeId, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function exchangeEntrustList( coinExchangeId, callback ) {
    return ( dispatch ) => {
        netExchangeEntrustList( coinExchangeId, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function exchangeGetIsExchangeSafe( coinExchangeId, callback ) {
    return ( dispatch ) => {
        netExchangeGetIsExchangeSafe( coinExchangeId, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function exchangeDoEntrust( query, callback ) {
    return ( dispatch ) => {
        netExchangeDoEntrust( query, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}


export function exchangeDoCancelEntrust( query, callback ) {
    return ( dispatch ) => {
        netExchangeDoCancelEntrust( query, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function exchangeGetUserHistoryEntrustList( callback ) {
    return ( dispatch ) => {
        netExchangeGetUserHistoryEntrustList( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function exchangeGetUserEntrustList( callback ) {
    return ( dispatch ) => {
        netExchangeGetUserEntrustList( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}
