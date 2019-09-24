import request from "superagent";
import superagent_prefix from "superagent-prefix";
import * as env from "../env";
import logger from "./logger/superagent-logger";

export function netMarketTradeKline( coinExchangeId, range, callback ) {
    request
        .post( '/market/trade/kline' )
        .send( { coinExchangeId: coinExchangeId, range: range } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


