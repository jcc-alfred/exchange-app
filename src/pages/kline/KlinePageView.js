import React from 'react';
// import { WebView } from 'react-native-webview';
// import {WebView} from 'react-native-webview';
import { InteractionManager, SafeAreaView, StatusBar, StyleSheet, View, WebView } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import * as env from '../../env';
import io from 'socket.io-client';


class KlinePageView extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            isRequesting: false,
            socket: null,
            range: 864000
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;


        return {
            title: params.coin_exchange.coinEx.coin_name + '/' + params.coin_exchange.coinEx.exchange_coin_name,
            headerBackTitle: null,
            headerRight: null
        };
    };

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        this.setState( {
            isRequesting: true
        } );

        InteractionManager.runAfterInteractions( () => {
            this.socket = io( env.webSocket );
            if ( !this.socket.connected ) {
                this.socket.connect();
            }
            this.socket.on( 'connect', () => {
                // console.log('connect:', this.socket.connected);
                this.socket.emit( 'init', {
                    user_id: this.props.userInfo.user_id ? this.props.userInfo.user_id : 0,
                    coin_exchange_id: this.props.coin_exchange.coin_exchange_id,
                    range: this.state.range
                } );
            } );
            this.socket.on( 'entrustList', ( data ) => {
                this.setState( { buyList: data.buyList } );
                this.setState( { sellList: data.sellList } );
                if ( !this.state.buyPrice ) {
                    this.setState( { buyPrice: data.sellList.length > 0 ? data.sellList[ data.sellList.length - 1 ].entrust_price : '' } );
                    this.setState( { sellPrice: data.buyList.length > 0 ? data.buyList[ 0 ].entrust_price : '' } );
                }
            } );

        } )
    }

    componentWillUnmount() {
        this.setState = ( state, callback ) => {
        };
        if ( this.socket && this.socket.connected ) {
            this.socket.emit( "disconnect" );
        }
    }

    componentWillReceiveProps( nextProps ) {
    }

    shouldComponentUpdate( nextProps, nextState ) {
        return true;
    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="light-content"/>
                <SafeAreaView style={[ commonStyles.wrapper ]}>
                    {/*<Text>{JSON.stringify(this.props.coin_exchange)}</Text>*/}

                    {/*<WebView*/}
                    {/*source={{uri: 'https://github.com/react-native-community/react-native-webview'}}*/}
                    {/*originWhitelist={['*']}*/}
                    {/*javaScriptEnabled={true}*/}
                    {/*domStorageEnabled={true}*/}
                    {/*startInLoadingState={true}*/}
                    {/*allowUniversalAccessFromFileURLs={true}*/}
                    {/*mixedContentMode={'compatibility'}*/}
                    {/*/>*/}

                    {/*<WebView style={{ height: constStyles.window.width * 3 / 4, width: constStyles.window.width }}*/}
                    {/*originWhitelist={[ '*' ]}*/}
                    {/*source={{ uri: 'https://www.asiaedx.com/#/kline/6?lang=zh-cn' }}*/}
                    {/*javaScriptEnabled={true}*/}
                    {/*domStorageEnabled={true}*/}
                    {/*/>*/}

                    <View style={[ commonStyles.wrapper, commonStyles.commonBG, commonStyles.commonBorderTop ]}>
                        <WebView
                            source={{ uri: 'https://www.asiaedx.com/#/kline/6?lang=zh-cn' }}
                            style={{ marginTop: 20 }}
                            useWebKit={true}
                            scrollEnabled={false}
                        />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create( {} );

export default KlinePageView;

