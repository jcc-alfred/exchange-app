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


export function netAuthLoginPhoneVerify( phoneRegion, phone, phoneVerificationCode, callback ) {
    request
        .post( '/auth/login' )
        .query( {
            phoneRegion: phoneRegion,
            phone: phone ? phone.replace( /\s+/g, "" ) : '',
            phoneVerificationCode: phoneVerificationCode,
            liveData: env.liveData,
        } )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}


export function netAuthLogout( callback ) {
    request
        .post( '/auth/logout' )
        .query( {} )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}
