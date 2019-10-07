import { netMarketList, netMarketTradeKline } from "../net/MarketApiNet";

export function marketTradeKline( coinExchangeId, range, callback ) {
    return ( dispatch ) => {
        netMarketTradeKline( coinExchangeId, range, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}

export function marketList( callback ) {
    return ( dispatch ) => {
        netMarketList( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}