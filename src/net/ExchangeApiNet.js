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
        .query( {} )
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
        .query( {} )
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
        .query( {} )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

