import React from 'react';
import {
    Dimensions,
    InteractionManager,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    WebView
} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import * as env from '../../env';
import I18n from "../../I18n";
import io from 'socket.io-client';
import { Button, ListItem, Text } from "react-native-elements";
import constStyles from "../../styles/constStyles";
import Keys from "../../configs/Keys";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import BuySellEntrustList from "../../components/BuySellEntrustList";
import Spinner from "react-native-loading-spinner-overlay";


class KlinePageView extends React.Component {

    constructor( props ) {
        super( props );
        const tabData = [ { title: "Depth", value: [] }, { title: "Order", value: [] } ];
        const { index, routes, scenes } = this.initTabData( tabData );
        this.state = {
            isRequesting: false,
            socket: null,
            sellList: [],
            buyList: [],
            orderList: [],
            index: index ? index : 0,
            routes: routes ? routes : [],
            scenes: scenes ? scenes : []
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;


        return {
            title: params.coin_exchange.coinEx.coin_name + '/' + params.coin_exchange.coinEx.exchange_coin_name,
            headerBackTitle: null,
            headerRight: null,
            headerStyle: {
                backgroundColor: constStyles.THEME_COLOR,
                borderBottomWidth: 0,
                elevation: 1,
            },
            headerTitleStyle: {
                color: 'white',
                fontSize: 19,
                fontWeight: 'bold'
            },
            headerTintColor: 'white'

        };
    };

    componentDidMount() {
        this.loadData()
    }

    gotoTradePage() {
        this.props.onChangeTradePageCoinExchange( this.props.coin_exchange );
        this.props.navigation.navigate( "TradePage" )
    }


    initTabData( tabData ) {
        const routes = [];
        const scenes = [];
        if ( tabData ) {
            for ( let index = 0; index < tabData.length; index++ ) {
                routes.push( {
                    key: '' + index,
                    title: tabData[ index ].title
                } );
                scenes [ '' + index ] = () => {
                    return (
                        <BuySellEntrustList
                            type={tabData[ index ].title}
                            data={tabData[ index ].value}/>
                    );
                };
            }
        } else {
            routes.push( { key: 0, title: "loading" } );
            scenes.push( <View/> )
        }
        return {
            index: 0,
            routes: routes,
            scenes: scenes
        };
    }

    EntrustOrderView() {
        if ( this.state.scenes && this.state.scenes.length > 0 ) {
            return (
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap( this.state.scenes )}
                    onIndexChange={index => this.setState( { index } )}
                    initialLayout={{ width: Dimensions.get( 'window' ).width }}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: '#0394fc' }}
                            inactiveColor={{ color: '#9c9a97' }}
                            activeColor={{ color: '#0394fc' }}
                            style={{ backgroundColor: constStyles.THEME_COLOR, flexDirection: 'row' }}
                            tabStyle={{ flex: 1 }}
                            scrollEnabled={true}
                        />
                    }
                    lazy={true}
                />
            );
        } else {
            return null;
        }
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
                this.setState( {
                    isRequesting: false
                } );
                this.socket.emit( 'init', {
                    user_id: this.props.userInfo.user_id ? this.props.userInfo.user_id : 0,
                    coin_exchange_id: this.props.coin_exchange.coin_exchange_id
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
            this.socket.on( 'orderList', ( data ) => {
                this.setState( { orderList: data } );
            } );
            this.socket.on( 'marketList', ( data ) => {
                this.props.socketUpdateMarketList( data )
            } )
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
        if ( nextState.buyList !== this.state.buyList || nextState.sellList !== this.state.sellList ) {
            let EntrustList = [];
            let sellList = nextState.sellList.sort( function ( a, b ) {
                return a.entrust_price - b.entrust_price
            } );
            let buyList = nextState.buyList;
            if ( sellList.length > buyList.length ) {
                for ( let index = 0; index < buyList.length; index++ ) {
                    EntrustList.push( [ buyList[ index ], sellList[ index ] ] )
                }
                for ( let index = buyList.length; index < sellList.length; index++ ) {
                    EntrustList.push( [ {}, sellList[ index ] ] )
                }
            } else {
                for ( let index = 0; index < sellList.length; index++ ) {
                    EntrustList.push( [ buyList[ index ], sellList[ index ] ] )
                }
                for ( let index = sellList.length; index < buyList.length; index++ ) {
                    EntrustList.push( [ buyList[ index ], {} ] )
                }
            }
            const tabData = [ { title: "Depth", value: EntrustList }, { title: "Order", value: this.state.orderList } ];
            const { index, routes, scenes } = this.initTabData( tabData );
            this.setState( {
                routes, scenes
            } )
        }
        if ( nextState.orderList !== this.state.orderList ) {
            let EntrustList = [];
            let sellList = this.state.sellList.sort( function ( a, b ) {
                return a.entrust_price - b.entrust_price
            } );
            let buyList = this.state.buyList;
            if ( sellList.length > buyList.length ) {
                for ( let index = 0; index < buyList.length; index++ ) {
                    EntrustList.push( [ buyList[ index ], sellList[ index ] ] )
                }
                for ( let index = buyList.length; index < sellList.length; index++ ) {
                    EntrustList.push( [ {}, sellList[ index ] ] )
                }
            } else {
                for ( let index = 0; index < sellList.length; index++ ) {
                    EntrustList.push( [ buyList[ index ], sellList[ index ] ] )
                }
                for ( let index = sellList.length; index < buyList.length; index++ ) {
                    EntrustList.push( [ buyList[ index ], {} ] )
                }
            }
            const tabData = [ { title: "Depth", value: EntrustList }, { title: "Order", value: nextState.orderList } ];
            const { index, routes, scenes } = this.initTabData( tabData );
            this.setState( {
                routes, scenes
            } )
        }
        return true;
    }


    render() {
        const { navigation } = this.props;
        const coinEx = this.props.marketList.find( i => i.coin_exchange_id === this.props.coin_exchange.coin_exchange_id );
        return (
            <View style={[ commonStyles.wrapper, { backgroundColor: constStyles.THEME_COLOR } ]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[ commonStyles.wrapper ]}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 8 }}>
                                <Text style={{
                                    fontSize: 24,
                                    color: coinEx.market.change_rate > 0 ? '#009d7a' : '#e7234c'
                                }}>{coinEx.market ? coinEx.market.last_price : 0}</Text>
                                <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#e8e6e7',
                                    }}>={coinEx.price_usd ? coinEx.price_usd.toFixed( 2 ) : 0} USD </Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: coinEx.market.change_rate > 0 ? '#009d7a' : '#e7234c'
                                    }}>={coinEx.market.change_rate ? coinEx.market.change_rate.toFixed( 2 ) : 0} % </Text>
                                </View>
                            </View>

                            <View style={{ flex: 3 }}>
                                <ListItem
                                    containerStyle={{ backgroundColor: constStyles.THEME_COLOR, padding: 3 }}
                                    titleStyle={[ styles.marketTitle ]}
                                    leftElement={() => {
                                        return ( <Text style={styles.marketLeftTitle}>{I18n.t( Keys.high )}</Text> )
                                    }}
                                    title={coinEx.market ? coinEx.market.high_price.toFixed( 2 ) : '0'}
                                />
                                <ListItem
                                    containerStyle={{ backgroundColor: constStyles.THEME_COLOR, padding: 3 }}
                                    titleStyle={[ styles.marketTitle ]}
                                    leftElement={() => {
                                        return ( <Text style={styles.marketLeftTitle}>{I18n.t( Keys.low )}</Text> )
                                    }}
                                    title={coinEx.market ? coinEx.market.low_price.toFixed( 2 ) : '0'}
                                />
                                <ListItem
                                    containerStyle={{ backgroundColor: constStyles.THEME_COLOR, padding: 3 }}
                                    titleStyle={[ styles.marketTitle ]}
                                    leftElement={() => {
                                        return ( <Text style={styles.marketLeftTitle}>24H</Text> )
                                    }}
                                    title={coinEx.market ? coinEx.market.total_volume.toFixed( 2 ) : '0'}
                                />
                            </View>

                        </View>


                        <View style={[ { height: 280, marginTop: 10 } ]}>
                            <WebView
                                source={{ uri: 'https://www.asiaedx.com/#/kline/6?lang=zh-cn' }}
                                useWebKit={true}
                                style={{ backgroundColor: constStyles.THEME_COLOR }}
                                scrollEnabled={false}
                            />
                        </View>
                        {this.EntrustOrderView()}
                    </ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            title={I18n.t( Keys.Buy )}
                            containerStyle={{ flex: 1, margin: 10 }}
                            buttonStyle={[ { height: 30, paddingTop: 7, paddingBottom: 7 } ]}
                            titleStyle={[ { fontSize: 14, } ]}
                            onPress={this.gotoTradePage.bind( this )}

                        />
                        <Button
                            title={I18n.t( Keys.Sell )}
                            containerStyle={{ flex: 1, margin: 10 }}
                            buttonStyle={[ { height: 30, paddingTop: 7, paddingBottom: 7, backgroundColor: 'red' } ]}
                            titleStyle={[ { fontSize: 14, } ]}
                            onPress={this.gotoTradePage.bind( this )}
                        />
                    </View>
                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create( {
    marketLeftTitle: {
        fontSize: 8,
        color: '#e8e6e7',
        width: '20%'
    },
    marketTitle: {
        fontSize: 8,
        color: 'white',
        width: '80%'

    },
} );

export default KlinePageView;

