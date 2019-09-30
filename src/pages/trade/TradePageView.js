import React from 'react';
import {InteractionManager, PixelRatio, SafeAreaView, StyleSheet, View, TextInput} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import {Button, Text, Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import io from 'socket.io-client';
import * as env from "../../env";
import Util from "../../util/Util";

class TradePageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRequesting: false,
        }
    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;

        return {
            title: "TradePageView",
            headerBackTitle: null,
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
            if (!this.props.TradePageCoinEx) {
                this.props.onExchangeGetMarketList((err, res) => {
                    if (!err) {
                        // this.setState({marketList:res.data});
                        this.props.changeTradePageCoinExchange(res.data[0])
                    }
                })
            }

            this.socket = io(env.webSocket);
            if (!this.socket.connected) {
                this.socket.connect();
            }
            this.socket.on('connect', () => {
                console.log('connect:', this.socket.connected);
                this.socket.emit('init', {
                    user_id: this.props.userInfo.user_id ? this.props.userInfo.user_id : 0,
                    coin_exchange_id: this.props.TradePageCoinEx.coin_exchange_id,
                    range: this.state.range
                });
            });
            this.socket.on('entrustList', (data) => {
                this.setState({entrustList: data});
                if (!this.state.buyPrice) {
                    this.setState({buyPrice: data.sellList.length > 0 ? data.sellList[data.sellList.length - 1].entrust_price : ''});
                    this.setState({sellPrice: data.buyList.length > 0 ? data.buyList[0].entrust_price : ''});
                }
            });
        })

    }

    changeState(value, field) {
        let param = {};
        param[field] = value;
        this.setState(param)
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {

        };
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    renderdoEntrustView(type = 'buy') {
        return (
            <View style={{padding: 2, flex: 1}}>
                <Text>{type === 'buy' ? I18n.t(Keys.Buy) : I18n.t(Keys.Sell)}</Text>
                <View style={[styles.PriceInput, {flexDirection: 'row'}]}>
                    <TextInput value={type === 'buy' ? this.state.buyPrice : this.state.sellPrice}
                               onChange={value => this.changeState(value, type === 'buy' ? 'buyPrice' : 'sellPrice')}
                               placeholder={(type === "buy" ? I18n.t(Keys.Buy) : I18n.t(Keys.Sell)) + ' ' + I18n.t(Keys.Price)}
                               style={[{flex: 9}]} keyboardType={'numeric'}/>
                    <View style={{flex: 1}}>
                        <Icon style={{backgroundColor: '#cccccc'}} name={"caret-up"} size={20} color={"grey"}/>
                        <Icon style={{backgroundColor: '#cccccc'}} name={"caret-down"} size={20} color={"grey"}/>
                    </View>
                </View>
                <View style={[styles.PriceInput, {flexDirection: 'row',height:40,marginTop: 5}]}>
                    <TextInput value={type === 'buy' ? this.state.buyAmount : this.state.sellAmount}
                               onChange={value => this.changeState(value, type === 'buy' ? 'buyAmount' : 'sellAmount')}
                               placeholder={(type === "buy" ? I18n.t(Keys.Buy) : I18n.t(Keys.Sell)) + ' ' + I18n.t(Keys.Price)}
                               style={[{flex: 9}]} keyboardType={'numeric'}/>
                    <Text style={{flex:2,lineHeight:40}}>{this.props.TradePageCoinEx.coinEx.coin_name}</Text>
                </View>
                <View style={{flexDirection:'row'}}>

                    {
                        [25,50,75,100].map(i=>{
                            return(
                                <View style={{flex:1}}>
                                    <Button titleStyle={{fontSize:8}} title={i+'%'} type={'outline'}></Button>
                                </View>

                            )
                        })
                    }
                </View>
            </View>
        )

    }

    render() {
        return (
            <View style={[commonStyles.wrapper,]}>
                <SafeAreaView style={[commonStyles.wrapper,]}>
                    {this.renderTopBar()}
                    {this.renderPriceBar()}
                    {this.renderEntrustView()}
                    <View>
                        <Text
                            style={{borderBottomColor: 'black', borderBottomWidth: 2}}>{I18n.t("Fixed Entrust")}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {this.renderdoEntrustView('buy')}
                        {this.renderdoEntrustView('sell')}
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1}}>
                            <Text style={{margin:5, marginLeft:10}}>交易额</Text>
                            <Button style={{margin:10}}
                                title="买入EOS"
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{margin:5, marginLeft:10}}>交易额</Text>
                            <Button style={{margin:10}}
                                title="卖出EOS"
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }


    renderTopBar() {
        return (
            <View style={[{flexDirection: 'row'}]}>
                <View style={[{flexDirection: 'row', flex: 2}]}>
                    <Button
                        icon={{
                            name: "arrow-right",
                            size: 15,
                            color: "blue"
                        }}
                        type='clear'

                    />
                    <Text style={[commonStyles.commonInputTextStyle]}>
                        {this.props.TradePageCoinEx ? this.props.TradePageCoinEx.coinEx.coin_name + '/' + this.props.TradePageCoinEx.coinEx.exchange_coin_name : ''}
                    </Text>
                    <Text style={[styles.smallRedFont]}>
                        {this.props.TradePageCoinEx ? Util.numtoPercentage(this.props.TradePageCoinEx.market.change_rate) : null}
                    </Text>
                </View>
                <View style={[{flexDirection: 'row', flex: 1}]}>
                    <Button
                        icon={{
                            name: "arrow-right",
                            size: 15,
                            color: "blue"
                        }}
                        type="clear"
                    />
                    <Button
                        icon={{
                            name: "arrow-right",
                            size: 15,
                            color: "blue"
                        }}

                        type="clear"

                    />

                    <Button
                        icon={{
                            name: "arrow-right",
                            size: 15,
                            color: "blue"
                        }}
                        type="clear"
                    />

                </View>
            </View>
        )

    }


    renderPriceBar() {

        return (

            <View style={[{flexDirection: 'row'}]}>
                <View style={[commonStyles.customerRow]}>
                    <Text
                        style={[styles.bigFontPrice]}>{this.props.TradePageCoinEx ? this.props.TradePageCoinEx.market.last_price : null}</Text>
                    <Text
                        style={[styles.smallGrayFont]}>={this.props.TradePageCoinEx ? Util.toMoneyDisplayWithCurrency(this.props.TradePageCoinEx.price_usd, '$') : 0}</Text>
                </View>
            </View>
        )
    }

    renderEntrustView() {
        let buyList = this.state.entrustList && this.state.entrustList.buyList ? this.state.entrustList.buyList : [];
        let sellList = this.state.entrustList && this.state.entrustList.sellList ? this.state.entrustList.sellList : [];
        return (
            <View style={[{flexDirection: 'row'}]}>
                <View style={[{flex: 1}]}>
                    <View style={[{flexDirection: 'row', padding: 2}]}>
                        <Text style={[{flexDirection: 'row', flex: 1, fontSize: 8}]}>{I18n.t(Keys.Buy)}</Text>
                        <Text style={[{flexDirection: 'row', flex: 2, fontSize: 8}]}>{I18n.t(Keys.Volume)}</Text>
                        <Text style={[{flexDirection: 'row', flex: 1, fontSize: 8}]}>{I18n.t(Keys.Sell)}</Text>
                    </View>
                    {buyList.map((entrustItem, index) => {
                        return this.renderInfoCell(index, entrustItem, 'buy')
                    })}
                </View>

                <View style={[{flex: 1}]}>
                    <View style={[{flexDirection: 'row', padding: 2}]}>
                        <Text style={[{flexDirection: 'row', flex: 1, fontSize: 8}]}>{I18n.t(Keys.Sell)}</Text>
                        <Text style={[{flexDirection: 'row', flex: 2, fontSize: 8}]}>{I18n.t(Keys.Volume)}</Text>
                        <Text style={[{flexDirection: 'row', flex: 1, fontSize: 8}]}>{I18n.t(Keys.Sell)}</Text>
                    </View>
                    {sellList.map((entrustItem, index) => {
                        return this.renderInfoCell(index, entrustItem, 'sell')
                    })}
                </View>
            </View>
        )
    }


    renderInfoCell(index, entrustItem, type) {
        return (
            <View key={index}
                  style={[{flexDirection: 'row', padding: 2, backgroundColor: type === 'buy' ? '#b3ffee' : 'white'}]}>
                <View style={[styles.overlay, {
                    backgroundColor: type === 'buy' ? 'white' : 'red',
                    width: type === 'buy' ?
                        Util.calcDisplayDiscount(1 - entrustItem.no_completed_volume / entrustItem.entrust_volume) :
                        Util.calcDisplayDiscount(entrustItem.no_completed_volume / entrustItem.entrust_volume)
                }]}/>
                <Text style={[{flex: 1, fontSize: 8, color: '#303940'}]}>{index}</Text>
                <Text style={[{flex: 1, fontSize: 8, color: '#303940'}]}>{entrustItem.no_completed_volume}</Text>
                <Text style={[{flex: 1, fontSize: 8, color: '#009d7a'}]}>{entrustItem.entrust_price.toFixed(8)}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    PriceInput: {
        borderWidth: 1,
        borderColor: 'grey'
    },
    activeTab: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },

    smallRedFont: {
        color: '#e7234c',
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 8
    },

    smallGrayFont: {
        color: '#aaa',
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 8
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'red'
    },

    bigFontPrice: {
        color: '#009d7a',
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 5,
        paddingTop: 6,
        paddingBottom: 6
    },


    smallIconButton: {

        // backgroundColor: '#ddd',
    },


    data: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#ddd',
        borderColor: '#888',
        borderWidth: 1 / PixelRatio.get(),
        color: '#777'
    }
});

export default TradePageView;

