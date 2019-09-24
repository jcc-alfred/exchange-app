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


export function netAuthSignUp( account, password, imgCode, callback ) {
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
        .post( '/User/signUp' )
        .send( query )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );
}
