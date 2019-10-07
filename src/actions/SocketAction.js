export function LoadInitSocket( user_id, coin_exchange_id, callback ) {
    return {
        sock: {
            path: 'init',
            data: { user_id, coin_exchange_id },
            // the following are the actionCreators that get
            // fired when the server issues a response,
            success: [ {
                path: 'entrustList', 'callback': ( res ) => {
                    console.log( 'ccccccccc', res )
                }
            } ],
            dummy: false
        },
    }
}

function paseData( res ) {
    console.log( 'getentrustlist', res )

}


