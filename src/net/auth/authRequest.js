/**
 * Add to the request prototype.
 */

import logger from "../logger/superagent-logger";
import request from "superagent";
import authRequestRetries from "./authRequestRetries";
import { getStore } from "../../setup";
import { netAuthLogin } from "../AuthApiNet1";
import PubSubConstant from "../../pubSub/PubSubConstant";
import * as env from "../../env";

const PubSub = require( 'pubsub-js' );

export default function ( superagent ) {
    const Request = superagent.Request;
    Request.prototype.authRequest = authRequest;
    return superagent;
};

/**
 * Export retries for extending
 */

module.exports.authRequestRetries = authRequestRetries;

function authRequest() {
    const self = this;
    const oldEnd = this.end;

    this.end = function ( fn ) {
        function attemptRetry() {
            return oldEnd.call( self, function ( err, res ) {
                if ( !shouldRetry( err, res ) ) {
                    return fn && fn( err, res );
                }

                authAndRetry( self, fn, err, res );
            } );
        }

        return attemptRetry();
    };

    return this;
}

function authAndRetry( oldRequest, fn, oldErr, oldRes ) {
    const header = oldRequest._header;
    const url = oldRequest.url;
    const method = oldRequest.method;
    const query = oldRequest._query;

    oldRequest._endCalled = false;

    const store = getStore();

    if (
        store &&
        store.getState().userStore.account &&
        store.getState().userStore.account.account &&
        store.getState().userStore.account.password
    ) {
        netAuthLogin(
            store.getState().userStore.account.account,
            store.getState().userStore.account.password,
            env.adminImageCode,
            ( err1, resBody1 ) => {
                if ( err1 ) {
                    if ( resBody1 && "password_error" === resBody1.msg ) {
                        PubSub.publish( PubSubConstant.PUB_SUB_SESSION_TIMEOUT, '' );

                        if ( fn ) {
                            fn( err1, resBody1 )
                        }
                    } else {
                        if ( fn ) {
                            fn( oldErr, oldRes )
                        }
                    }
                } else {
                    const _request = request( method, url )
                        .query( query )
                        .use( logger );

                    for ( const k in header ) {
                        if ( header.hasOwnProperty( k ) ) {
                            _request.set( k, header[ k ] );
                        }
                    }

                    _request
                        .end( ( err, res ) => {
                            if ( fn ) {
                                fn( err, res )
                            }
                        } );
                }
            } );
    } else {
        if ( fn ) {
            fn( oldErr, oldRes )
        }
    }
}


/**
 * Determine whether we should authRequest based upon common error conditions
 * @param  {Error}    err
 * @param  {Response} res
 * @return {Boolean}
 */
function shouldRetry( err, res ) {
    return authRequestRetries.some(
        function ( check ) {
            return check( err, res );
        }
    );
}
