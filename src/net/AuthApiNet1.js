import request from "superagent";
import superagent_prefix from "superagent-prefix";
import * as env from "../env";
import logger from "./logger/superagent-logger";

import header from "./header/headerRequest";
import apiDomainParse from "./parse/apiDomainParse";

header( request );
apiDomainParse( request );

export function netAuthLogin( account, password, imgCode, callback ) {
    let query = {
        loginPass: password,
        imgCode: imgCode
    };

    let accountType = "phone";
    if ( accountType.indexOf( "@" ) ) {
        query = { ...query, accountType: "email", email: account }
    } else {
        query = { ...query, accountType: "phone", phone: account }
    }

    request
        .post( '/User/login' )
        .send( query )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}
