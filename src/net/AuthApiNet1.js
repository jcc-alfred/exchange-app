import request from "superagent";
import superagent_prefix from "superagent-prefix";
import * as env from "../env";
import logger from "./logger/superagent-logger";

import header from "./header/headerRequest";
import apiDomainParse from "./parse/apiDomainParse";
import NetUtil from "./NetUtil";

header( request );
apiDomainParse( request );

export function netAuthLoginPhonePassword( phoneRegion, phone, password, callback ) {
    request
        .post( '/auth/login' )
        .query(  {
            phoneRegion: phoneRegion,
            phone: phone ? phone.replace( /\s+/g, "" ) : '',
            password: password,
            "remember-me": 1
        }  )
        .use( superagent_prefix(env.apiDomain) )
        .use( logger )
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}
