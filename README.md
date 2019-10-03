# run

    yarn install
    
    yarn start


# build for release

    expo build:android
    
    expo build:android -t app-bundle
    
    expo build:ios

# hot  upload

    expo publish

# upload to store

    expo upload:android --key ./api-5978161837754265848-81838-c53e8ec5eadc.json
    
    expo upload:ios

# icon resource

    https://ionicons.com/
    
# Websocket
    
    https://www.asiaedx.com:5000
    
    'init' => {user_id:1,coin_exchange_id:1}
    <=  'orderList'    orderList
    <= 'entrustList'  entrustList
    <= 'userEntrustList' userEntrustList
    <= 'marketList' marketList
    <= 'kline'  kline
    =>  'userEntrustList' {user_id,coin_exchange_id}
    => 'historyEntrustList' {user_id,coin_exchange_id}}
    =>'add_kline_client' {user_id,coin_exchange_id}}}
    =>'remove_kline_client' {user_id,coin_exchange_id}
    
# candle stick chart
https://github.com/wuxudong/react-native-charts-wrapper