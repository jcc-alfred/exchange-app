import I18n from "../../I18n";
import Keys from "../../configs/Keys";

/**
 * Add to the request prototype.
 */




export default function ( superagent ) {
    const Request = superagent.Request;
    Request.prototype.apiDomainParse = apiDomainParse;
    return superagent;
};

function apiDomainParse( manualParse ) {
    const self = this;
    const oldEnd = this.end;

    this.end = function ( fn ) {
        function attemptParse() {
            return oldEnd.call( self, function ( errTmp, resTmp ) {
                let err1 = errTmp;
                let res1 = resTmp;

                if ( manualParse ) {
                    let { err, res } = manualParse( err1, res1 );

                    err1 = err;
                    res1 = res;
                }

                return fn && fn(
                    parseError( err1, res1 ),
                    ( res1 && res1.body ) ? res1.body : res1,
                    self
                );
            } );
        }

        return attemptParse();
    };

    return this;
}

export function parseError( err, res ) {
    if ( err ) {
        if ( err.status === 404 || !err.status ) {
            return Error( I18n.t( Keys.no_internet_connection ) );
        }

        if ( err.response && err.response.body ) {
            let error1 = Error( err.response.body.message );
            error1.status = err.response.body.status;

            return error1;
        }


        return err;
    }

    if ( !res ) {
        return err;
    }

    if ( res.body && res.body.code !== 1 ) {
        const error = Error( res.body.msg );
        error.code = res.body.code;

        return error;
    }

    console.log( err );
    console.log( res.body );

    return null;
}
