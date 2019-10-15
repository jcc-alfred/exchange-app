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

    expo upload:android --key ./api-5036498007111182668-362284-a6f221dd9834.json
    
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


turtle build:ios \
  --team-id 79EG5THUSL \
  --dist-p12-path xcasiaedx.p12 \
  --provisioning-profile-path asiaedxadhock.mobileprovision
  
expo build:ios --dist-p12-path ./ios_build/gtdollarxiechao1.p12

expo build:ios \
  --team-id 79EG5THUSL \
  --dist-p12-path /Users/xiechao/codes/gt-exchange-app/ios_build/gtdollarxiechao1.p12 \
  --provisioning-profile-path /Users/xiechao/codes/gt-exchange-app/ios_build/asiaedx_adhock.mobileprovision \
  -u xc9898@gmail.com \
  -p GzjcnwS82RJU
