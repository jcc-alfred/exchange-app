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

/**
 *
 * @param query
 *          {
 *             "type": "phone",
 *             "areaCode":"65",
 *             "phoneNumber":"87140718"
 *           }
 *              or
 *           {
 *          	"type":"email",
 *          	"email":"jie.xiao@gtdollar.com"
 *           }
 * @param callback
 */
export function netUserSendCode( query, callback ) {
    request
        .post( '/user/sendcode' )
        .send( query )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}










