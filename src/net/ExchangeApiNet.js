import request from "superagent";
import superagent_prefix from "superagent-prefix";
import logger from "./logger/superagent-logger";
import * as env from "../env";
import apiDomainParse from "./parse/apiDomainParse";
import header from "./header/headerRequest";
import authRequest from "./auth/authRequest";

authRequest( request );
header( request );
apiDomainParse( request );


export function netExchangeGetMarketList( callback ) {
    request
        .post( '/exchange/getMarketList' )
        .send( {} )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


export function netExchangeGetCoinExchangeList( callback ) {
    request
        .post( '/exchange/getCoinExchangeList' )
        .send( {} )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netExchangeGetCoinExchangeAreaList( callback ) {
    request
        .post( '/exchange/getCoinExchangeAreaList' )
        .send( {} )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netExchangeLastPrice( coin_name, callback ) {
    request
        .post( '/exchange/lastprice' )
        .send( { coin_name: coin_name } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

/**
 *
 * @param query
 *              [
 *                  {
 *                      "entrustId":1,
 *                      "coinExchangeId": 1,
 *                      "entrustTypeId": 1
 *                  }
 *              ]
 *
 * @param callback
 */
export function netExchangeDoBatchCancelEntrust( query, callback ) {
    request
        .post( '/exchange/doBatchCancelEntrust' )
        .send( query )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

/**
 *
 * @param query
 *              {
 *                   "entrust_sns": [
 *                                      {
 *                                          "entrustId": 1,
 *                                          "coinExchangeId": 1,
 *                                          "entrustTypeId": 1
 *                                       },
 *                                       {
 *                                           "entrustId": 2,
 *                                           "coinExchangeId": 2,
 *                                           "entrustTypeId": 0
 *                                       }
 *                                  ]
 *               }
 * @param callback
 */
export function netExchangeGetUserDepositListByCoinId( query, callback ) {
    request
        .post( '/assets/getUserDepositListByCoinId' )
        .send( query )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netExchangeGetUserWithdrawListByCoinId( query, callback ) {
    request
        .post( '/assets/getUserWithdrawListByCoinId' )
        .send( query )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


export function netExchangeGetCoinList( callback ) {
    request
        .post( '/exchange/getCoinList' )
        .send( {} )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


export function netExchangeGetEntrustList( coinExchangeId, callback ) {
    request
        .post( '/exchange/getEntrustList' )
        .send( { coinExchangeId: coinExchangeId } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


export function netExchangeEntrustList( coinExchangeId, callback ) {
    request
        .post( '/exchange/entrustlist' )
        .send( { coinExchangeId: coinExchangeId } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


export function netExchangeGetIsExchangeSafe( coinExchangeId, callback ) {
    request
        .post( '/exchange/getIsExchangeSafe' )
        .send( { coinExchangeId: coinExchangeId } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


export function netExchangeDoEntrust( query, callback ) {
    request
        .post( '/exchange/doEntrust' )
        .send( query )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netExchangeGetUserEntrustList( query, callback ) {
    request
        .post( '/exchange/getUserEntrustList' )
        .send( {} )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netExchangeGetUserHistoryEntrustList( query, callback ) {
    request
        .post( '/exchange/getUserHistoryEntrustList' )
        .send( {} )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netExchangeDoCancelEntrust( query, callback ) {
    request
        .post( '/exchange/doCancelEntrust' )
        .send( query )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


