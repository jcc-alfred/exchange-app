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


export function netPhotoUpload( path, callback ) {
    const photo = {
        uri: path,
        type: 'image/jpeg',
        name: path.substr( path.lastIndexOf( "/" ) + 1 ),
    };

    let currentRequest = request
        .post( '/photo/upload' )
        .type( 'multipart/form-data' );


    currentRequest.attach( 'file', photo )
        .use( superagent_prefix( env.apiDomain ) )
        .use( logger )
        .authRequest()
        .headerRequest()
        .apiDomainParse()
        .end( callback );

}