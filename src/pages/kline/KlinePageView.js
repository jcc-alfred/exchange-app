import React from 'react';
import {InteractionManager, SafeAreaView, StatusBar, StyleSheet, View, WebView} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import * as env from '../../env';
import I18n from "../../I18n";
import io from 'socket.io-client';
import {ListItem, Text} from "react-native-elements";
import constStyles from "../../styles/constStyles";
import Keys from "../../configs/Keys";


class KlinePageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRequesting: false,
            socket: null,
            range: 864000
        }
    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;


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
        this.setState({
            isRequesting: true
        });

        InteractionManager.runAfterInteractions(() => {
            this.socket = io(env.webSocket);
            if (!this.socket.connected) {
                this.socket.connect();
            }
            this.socket.on('connect', () => {
                // console.log('connect:', this.socket.connected);
                this.socket.emit('init', {
                    user_id: this.props.userInfo.user_id ? this.props.userInfo.user_id : 0,
                    coin_exchange_id: this.props.coin_exchange.coin_exchange_id,
                    range: this.state.range
                });
            });
            this.socket.on('entrustList', (data) => {
                this.setState({buyList: data.buyList});
                this.setState({sellList: data.sellList});
                if (!this.state.buyPrice) {
                    this.setState({buyPrice: data.sellList.length > 0 ? data.sellList[data.sellList.length - 1].entrust_price : ''});
                    this.setState({sellPrice: data.buyList.length > 0 ? data.buyList[0].entrust_price : ''});
                }
            });
            this.socket.on('marketList', (data) => {
                this.props.socketUpdateMarketList(data)
            })
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
        };
        if (this.socket && this.socket.connected) {
            this.socket.emit("disconnect");
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }


    render() {
        const {navigation} = this.props;
        const coinEx = this.props.marketList.find(i => i.coin_exchange_id === this.props.coin_exchange.coin_exchange_id);
        return (
            <View style={[commonStyles.wrapper, {backgroundColor: constStyles.THEME_COLOR}]}>
                <StatusBar backgroundColor="blue" barStyle="light-content"/>
                <SafeAreaView style={[commonStyles.wrapper]}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 8}}>
                            <Text style={{
                                fontSize: 24,
                                color: coinEx.market.change_rate > 0 ? '#009d7a' : '#e7234c'
                            }}>{coinEx.market ? coinEx.market.last_price : 0}</Text>
                            <View style={{flexDirection: 'row', paddingTop: 5}}>
                                <Text style={{
                                    fontSize: 12,
                                    color: '#e8e6e7',
                                }}>={coinEx.price_usd ? coinEx.price_usd.toFixed(2) : 0} USD </Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: coinEx.market.change_rate > 0 ? '#009d7a' : '#e7234c'
                                }}>={coinEx.market.change_rate ? coinEx.market.change_rate.toFixed(2) : 0} % </Text>
                            </View>
                        </View>

                        <View style={{flex: 3}}>
                            <ListItem
                                containerStyle={{backgroundColor: constStyles.THEME_COLOR, padding: 3}}
                                titleStyle={[styles.marketTitle]}
                                leftElement={() => {
                                    return (<Text style={styles.marketLeftTitle}>{I18n.t(Keys.high)}</Text>)
                                }}
                                title={coinEx.market ? coinEx.market.high_price.toFixed(2) : '0'}
                            />
                            <ListItem
                                containerStyle={{backgroundColor: constStyles.THEME_COLOR, padding: 3}}
                                titleStyle={[styles.marketTitle]}
                                leftElement={() => {
                                    return (<Text style={styles.marketLeftTitle}>{I18n.t(Keys.low)}</Text>)
                                }}
                                title={coinEx.market ? coinEx.market.low_price.toFixed(2) : '0'}
                            />
                            <ListItem
                                containerStyle={{backgroundColor: constStyles.THEME_COLOR, padding: 3}}
                                titleStyle={[styles.marketTitle]}
                                leftElement={() => {
                                    return (<Text style={styles.marketLeftTitle}>24H</Text>)
                                }}
                                title={coinEx.market ? coinEx.market.total_volume.toFixed(2) : '0'}
                            />
                        </View>

                    </View>


                    <View style={[commonStyles.wrapper]}>
                        <WebView
                            source={{uri: 'https://www.asiaedx.com/#/kline/6?lang=zh-cn'}}
                            useWebKit={true}
                            style={{backgroundColor: constStyles.THEME_COLOR}}
                            scrollEnabled={false}
                        />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    marketLeftTitle: {
        fontSize: 8,
        color: '#e8e6e7',
        width: '20%'
    },
    marketTitle: {
        fontSize: 8,
        color: 'white',
        width: '80%'

    }
});

export default KlinePageView;

