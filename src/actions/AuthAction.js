import { netAuthLogin } from "../net/AuthApiNet1";
import userActionTypes from "../reducers/user/userActionTypes";

export function authLogin( account, password, imageCode, callback ) {
    return ( dispatch ) => {
        netAuthLogin( account, password, imageCode, ( err, res ) => {
            if ( !err ) {
                dispatch( {
                    type: userActionTypes.LOGIN,
                    data: {
                        account: account,
                        password: password
                    }
                } );

                dispatch( {
                    'type': userActionTypes.RECORD_LOGIN_HISTORY,
                    data: {
                        account: account,
                        password: password
                    }
                } );

                dispatch( {
                    type: userActionTypes.UPDATE_USER_INFO,
                    data: res.data.userInfo,
                } );
            }
            callback && callback( err, res )
        } );
    };
}


export function authLogout( callback ) {
    return ( dispatch ) => {
        dispatch( {
            type: userActionTypes.LOGOUT,
        } );

        callback && callback( null, null )
    };
}
