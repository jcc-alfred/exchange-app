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

# ad hoc package
expo build:ios -c
Checking if there is a build in progress...

Removed existing credentials from expo servers
Please enter your Apple Developer Program account credentials. These credentials are needed to manage certificates, keys and
provisioning profiles in your Apple Developer account.
The password is only used to authenticate with Apple and never stored.
? Apple ID: it1@gtdollar.com
? Password (for it1@gtdollar.com): [hidden]
Trying to authenticate with Apple Developer Portal...
Authenticated with Apple Developer Portal successfully!
Only 1 team associated with your account, using Apple Team with ID: 79EG5THUSL
We are missing the following credentials from you: Apple Distribution Certificate, Apple Push Notifications service key, Apple Provisioning Profile
? How would you like to upload your credentials? Expo handles all credentials, you can still provide overrides
? Will you provide your own Apple Distribution Certificate? I want to upload my own file
? Will you provide your own Apple Push Notifications service key? I want to upload my own file
? Will you provide your own Apple Provisioning Profile? I want to upload my own file
Please provide your Apple Distribution Certificate:
? Path to P12 file: /Users/xiechao/codes/gt-exchange-app/ios_build/Certificates111.p12
? P12 password: [hidden]
Please provide your Apple Push Notifications service key:
? Path to P8 file: /Users/xiechao/codes/gt-exchange-app/ios_build/AuthKey_82WSJ3T8XC.p8
? Key ID: 82WSJ3T8XC
Please provide your Apple Provisioning Profile:
? Path to .mobile provisioning profile: /Users/xiechao/codes/gt-exchange-app/ios_build/asiaedx_adhock.mobileprovision
Encrypted credentials and saved to the Expo servers
Unable to find an existing Expo CLI instance for this directory, starting a new one...
Starting Metro Bundler on port 19001.
