import { getStore } from "../../setup";
import userActionTypes from "../../reducers/user/userActionTypes";

export default function ( superagent ) {
    const Request = superagent.Request;
    Request.prototype.headerRequest = headerRequest;
    return superagent;
};

function headerRequest() {
    const store = getStore();

    if ( store.getState().settingStore.language ) {
        this.set( 'Accept-Language', store.getState().settingStore.language );
    }

    const { token } = store.getState().userStore.requestCookie;
    if ( token && token.length > 0 ) {
        this.set( 'token', token );
    }

    const self = this;
    const oldEnd = this.end;

    this.end = function ( fn ) {
        function recordCookie() {
            return oldEnd.call( self, function ( err, res ) {
                if ( res && res.header ) {

                    const store = getStore();

                    {
                        const { token } = store.getState().userStore.requestCookie;
                        let newToken = token;

                        if ( res.body && res.body && res.body.code === 1 && res.body.data && res.body.data.token ) {
                            newToken = res.body.data.token;
                        }

                        if ( newToken !== token ) {
                            store.dispatch( ( dispatch ) => {
                                dispatch( {
                                    'type': userActionTypes.UPDATE_HTTP_REQUEST_COOKIE,
                                    data: {
                                        token: newToken,
                                    }
                                } );
                            } );
                        }
                    }
                }

                return fn && fn( err, res );
            } );
        }

        return recordCookie();
    };

    return this;
}
