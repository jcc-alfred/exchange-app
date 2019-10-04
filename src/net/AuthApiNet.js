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


export function netAuthSignUp( query, callback ) {
    let query1 = {
        ...query,
        imgCode: env.adminImageCode
    };

    request
        .post( '/User/signUp' )
        .send( query1 )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netAuthForgotLoginPassword( query, callback ) {
    let query1 = {
        ...query,
        imgCode: env.adminImageCode
    };

    request
        .post( '/user/forgotLoginPass' )
        .send( query1 )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netSafeAddUserKYC( query, callback ) {
    let query1 = {
        ...query
    };

    request
        .post( '/safe/addUserKYC' )
        .send( query1 )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}

export function netSafeAddUserSeniorKYC( query, callback ) {
    let query1 = {
        ...query
    };

    request
        .post( '/safe/addUserSeniorKYC' )
        .send( query1 )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}