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

export function netOtcCoins( callback ) {
    request
        .post( '/otc/coins' )
        .send( {} )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


export function netOtcEntrustList( coin_id, type, callback ) {
    request
        .post( '/otc/entrustList' )
        .send( { coin_id: coin_id, type: type } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netOtcEntrust( entrust_id, callback ) {
    request
        .post( '/otc/entrust' )
        .send( { entrust_id: entrust_id } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netOtcOrder( id, callback ) {
    request
        .get( '/otc/order/' + id )
        .query( {} )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netOtcSecretRemark( secret_remark, callback ) {
    request
        .post( '/otc/secret_remark' )
        .send( { secret_remark: secret_remark } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netGetOtcSecretRemark( callback ) {
    request
        .get( '/otc/secret_remark' )
        .send( {} )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netOtcOrderCreate( entrust_id, coin_amount, callback ) {
    request
        .post( '/otc/order/create' )
        .send( { entrust_id: entrust_id, coin_amount: coin_amount } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netOtcOrderPay( order_id, callback ) {
    request
        .post( '/otc/order/pay' )
        .send( { order_id: order_id } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netOtcOrderConfirm( order_id, safePass, callback ) {
    request
        .post( '/otc/order/confirm' )
        .send( { order_id: order_id, safePass: safePass } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netOtcEntrustCreate( query, callback ) {
    request
        .post( '/otc/entrust/create' )
        .send( query )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


export function netOtcEntrustCancel( entrust_id, callback ) {
    request
        .post( '/otc/entrust/cancel' )
        .send( { entrust_id: entrust_id } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netOtcOrderCancel( entrust_id, callback ) {
    request
        .post( '/otc/order/cancel' )
        .send( { entrust_id: entrust_id } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


export function netOtcEntrustMy( callback ) {
    request
        .get( '/otc/entrust/my' )
        .query( {} )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


export function netOtcOrderMy( coin_id, callback ) {
    request
        .get( '/otc/order/my' )
        .query( { coin_id: coin_id } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}



