import { getStore } from "../../setup";
import userActionTypes from "../../reducers/user/userActionTypes";
import { Platform } from "react-native";
import Constants from 'expo-constants';

export default function ( superagent ) {
    const Request = superagent.Request;
    Request.prototype.headerRequest = headerRequest;
    return superagent;
};

function headerRequest() {
    const store = getStore();

    if ( store.getState().settingStore.displayCurrency ) {
        this.set( 'view-currency', store.getState().settingStore.displayCurrency );
    }

    if ( store.getState().settingStore.language ) {
        this.set( 'Accept-Language', store.getState().settingStore.language );
    }

    const { JSESSIONID, rememberMe } = store.getState().userStore.requestCookie;
    if ( JSESSIONID && JSESSIONID.length > 0 ) {
        this.set( 'JSESSIONID', JSESSIONID );
    }

    if ( rememberMe && rememberMe.length > 0 ) {
        this.set( 'remember-me', rememberMe );
    }

    this.set( 'device-id', Constants.installationId );
    this.set( 'device-os', Platform.OS === 'ios' ? 'ios' : 'android' );

    const self = this;
    const oldEnd = this.end;

    this.end = function ( fn ) {
        function recordCookie() {
            return oldEnd.call( self, function ( err, res ) {
                if ( res && res.header ) {

                    const store = getStore();

                    {
                        const { JSESSIONID, rememberMe } = store.getState().userStore.requestCookie;
                        let newJSESSIONID = JSESSIONID;
                        let newRememberMe = rememberMe;

                        if ( res.header[ 'set-cookie' ] && res.header[ 'set-cookie' ].length > 0 ) {
                            const cookiesStr = res.header[ 'set-cookie' ];

                            const cookies = cookiesStr.split( "; " );

                            for ( let index = 0; index < cookies.length; index++ ) {
                                const data = cookies[ index ];
                                if ( data.indexOf( 'JSESSIONID=' ) >= 0 ) {
                                    newJSESSIONID = data.substr( data.indexOf( 'JSESSIONID=' ) + 'JSESSIONID='.length );
                                } else if ( data.indexOf( 'remember-me=' ) >= 0 ) {
                                    newRememberMe = data.substr( data.indexOf( 'remember-me=' ) + 'remember-me='.length );
                                }
                            }
                        }


                        if ( newJSESSIONID !== JSESSIONID || newRememberMe !== rememberMe ) {
                            store.dispatch( ( dispatch ) => {
                                dispatch( {
                                    'type': userActionTypes.UPDATE_HTTP_REQUEST_COOKIE,
                                    data: {
                                        JSESSIONID: newJSESSIONID,
                                        rememberMe: newRememberMe
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
