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

export function netAssetsGetUserAssets( refresh, callback ) {
    request
        .post( '/assets/getUserAssetsValue' )
        .send( { refresh: refresh || "false" } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netAssetsDoUserWithdraw( query, callback ) {
    request
        .post( '/assets/doUserWithdraw' )
        .send( query )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netAssetsCancelUserWithdraw( userWithdrawId, callback ) {
    request
        .post( '/assets/cancelUserWithdraw' )
        .send( { userWithdrawId: userWithdrawId } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}
