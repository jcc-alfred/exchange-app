import url from "url";
import querystring from "querystring";
import superagent from "superagent";
import format from "string-format";

'use strict';

export default function ( options ) {
    if ( !options ) options = {};
    if ( options instanceof superagent.Request )
        return attachSuperagentLogger( {}, options );

    return attachSuperagentLogger.bind( null, options );
};

function attachSuperagentLogger( options, req ) {
    const start = new Date().getTime();
    const timestamp = new Date().toISOString();

    const uri = url.parse( req.url );
    const method = req.method;

    let requestUrl = '';
    if ( options.outgoing ) {
        requestUrl = format( '[{0} {1} {2} {3} {4} {5}]',
            (
                rightPad( uri.protocol.toUpperCase().replace( /[^\w]/g, '' ), 5 )
            ),
            (rightPad( method.toUpperCase(), 'delete'.length )),
            options.timestamp ? ('[' + timestamp + ']') : '',
            (' - '),
            (uri.href + (req.qs ? '' : '?' + querystring.encode( req.qs ))),
            ('(pending)')
        );
    } else {
        requestUrl = format( '[{0} {1} {2} {3}]',
            (
                rightPad( uri.protocol.toUpperCase().replace( /[^\w]/g, '' ), 5 )
            ),
            (rightPad( method.toUpperCase(), 'delete'.length )),
            options.timestamp ? ('[' + timestamp + ']') : '',
            (uri.href + ' ' + ((req._query && req._query.length > 0) ? req._query[ 0 ] : '')),
        );
    }

    console.log( "NET start %s ", requestUrl );

    console.log( 'NET request %s HTTPS header:' + JSON.stringify( req._header ), requestUrl );

    req.on( 'response', function ( res ) {
        const now = new Date().getTime();
        const elapsed = now - start;

        let st = res.status;
        if ( st < 300 ) {
            st = (st);
        } else if ( st < 400 ) {
            st = (st);
        } else {
            st = (st);
        }

        console.log( 'NET response [%s] %s %s',
            requestUrl,
            st,
            ('(') +
            (elapsed + 'ms') +
            (')')
        );

        console.log( 'NET response %s HTTPS header:' + JSON.stringify( res.headers ), requestUrl );
        console.log( 'NET response %s HTTPS text:' + JSON.stringify( res.text ), requestUrl );
    } );
}

function rightPad( str, len ) {
    const l = str.length;
    if ( l < len ) {
        for ( let i = 0, n = len - l; i < n; i++ ) {
            str += ' ';
        }
    }
    return str;
}
