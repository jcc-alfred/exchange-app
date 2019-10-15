import React from 'react';
import {
    FlatList,
    InteractionManager,
    PixelRatio,
    Platform,
    SafeAreaView,
    StatusBar,
    TouchableHighlight,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import {Button, Image, Input, Text} from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import io from 'socket.io-client';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import * as env from "../../env";
import Util from "../../util/Util";
import Toast from "react-native-root-toast";
import {ConfirmDialog} from 'react-native-simple-dialogs'
import {DrawerActions} from 'react-navigation-drawer';
import {BorderlessButton} from "react-native-gesture-handler";
import {Ionicons} from "@expo/vector-icons";
import moment from 'moment'

class TradePageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRequesting: false,
            isSafePassModalShow: false,
            userEntrustList: [],
            buttonClick: null
        };
    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;

        return {
            header: null,
            // headerStyle: styles.header,
            headerBackTitle: null
        };
    };

    static renderInfoCell(index, entrustItem, type) {
        return (
            <View key={index}
                  style={[{
                      flexDirection: 'row',
                      padding: 3,
                      backgroundColor: type === 'buy' ? '#ebf7f7' : 'white'
                  }]}>
                <View style={[styles.overlay, {
                    backgroundColor: type === 'buy' ? 'white' : '#faf2f0',
                    width: type === 'buy' ?
                        Util.calcDisplayDiscount(1 - entrustItem.no_completed_volume / entrustItem.entrust_volume) :
                        Util.calcDisplayDiscount(entrustItem.no_completed_volume / entrustItem.entrust_volume)
                }]}/>
                <Text style={[{flex: 1, fontSize: 8, color: '#303940'}]}>{index}</Text>
                <Text style={[{
                    flex: 2,
                    fontSize: 8,
                    color: '#303940'
                }]}>{entrustItem.no_completed_volume.toFixed(6)}</Text>
                <Text style={[{
                    flex: 2,
                    fontSize: 8,
                    color: type === 'buy' ? '#009d7a' : 'red'
                }]}>{entrustItem.entrust_price.toFixed(8)}</Text>
            </View>
        )
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        this.setState({
            isRequesting: true
        });

        InteractionManager.runAfterInteractions(() => {
            if (!this.props.TradePageCoinEx) {
                this.props.onExchangeGetMarketList(null)
            }
            if (this.props.isLoggedIn) {
                this.props.onAssetsGetUserAssets((err, res) => {
                    this.setState({
                        refreshing: false,
                        userAssets: res.data
                    })
                })
            }
            this.initSocket(this.props.TradePageCoinEx.coin_exchange_id)
        })
    }

    initSocket(coin_exchange_id) {
        this.socket = io(env.webSocket);
        if (!this.socket.connected) {
            this.socket.connect();
        }
        this.socket.on('connect', () => {
            this.setState({
                isRequesting: false
            });
            console.log('connect:', this.socket.connected);
            this.socket.emit('init', {
                user_id: this.props.userInfo.user_id ? this.props.userInfo.user_id : 0,
                coin_exchange_id: coin_exchange_id,
                range: this.state.range
            });
        });
        this.socket.on('entrustList', (data) => {
            this.setState({entrustList: data});
            if (!this.state.buyPrice) {
                this.setState({buyPrice: data.sellList.length > 0 ? JSON.stringify(data.sellList[data.sellList.length - 1].entrust_price) : ''});
                this.setState({sellPrice: data.buyList.length > 0 ? JSON.stringify(data.buyList[0].entrust_price) : ''});
            }
        });
        this.socket.on('userEntrustList', (data) => {
            this.setState({userEntrustList: data});
        });
    }

    changeState(value, field) {
        let param = {};
        param[field] = value;
        this.setState(param)
    }

    doEntrust(entrustTypeId, entrustPrice, entrustVolume, input = false) {
        if (!this.props.isLoggedIn) {
            this.props.navigation.navigate("AuthLoginPage");
            return
        }
        if (!entrustPrice || entrustPrice === '') {
            Toast.show("Price Needed");
            return
        }
        if (!entrustVolume || entrustVolume === '') {
            Toast.show("Price Needed");
            return
        }
        if (input) {
            InteractionManager.runAfterInteractions(() => {
                this.props.DoEntrust({
                    "coin_exchange_id": this.props.TradePageCoinEx.coin_exchange_id,
                    "entrustTypeId": entrustTypeId,
                    "isExchangeSafe": false,
                    "safePass": this.props.safePass,
                    "entrustPrice": entrustPrice,
                    "entrustVolume": entrustVolume
                }, (err1, res1) => {
                    if (!err1) {
                        Toast.show("下单成功");
                    } else {
                        Toast.show(err1.message);
                    }
                })
            });
            this.setState({
                isSafePassModalShow: false
            })
        } else {
            InteractionManager.runAfterInteractions(() => {
                this.props.CheckExchangeSafe(this.props.TradePageCoinEx.coin_exchange_id, (err, res) => {
                    if (!err) {
                        if (res.data.isExchangeSafe && this.props.safePass !== '') {
                            this.props.DoEntrust({
                                "coin_exchange_id": this.props.TradePageCoinEx.coin_exchange_id,
                                "entrustTypeId": entrustTypeId,
                                "isExchangeSafe": res.isExchangeSafe,
                                "safePass": this.props.safePass,
                                "entrustPrice": entrustPrice,
                                "entrustVolume": entrustVolume
                            }, (err1, res1) => {
                                if (!err1) {
                                    Toast.show("下单成功");
                                    this.setState({isSafePassModalShow: false})
                                } else {
                                    Toast.show(err1.message);
                                    this.props.changeSafePass('')
                                }
                            })
                        } else {
                            this.setState({
                                isSafePassModalShow: true,
                                entrustTypeIdClicked: entrustTypeId
                            })
                        }

                    } else {
                        Toast.show(err.message);
                    }
                });

            })
        }


    }

    componentWillUnmount() {
        if (this.socket.connected) {
            this.socket.emit("disconnect")
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.TradePageCoinEx !== nextProps.TradePageCoinEx) {
            this.loadData()
        }
        if (this.state.buyAmount !== nextState.buyAmount) {

        }
        return true;
    }

    doCancelEntrust(entrust) {
        InteractionManager.runAfterInteractions(() => {
            this.props.onExchangeDoCancelEntrust({
                "entrustId": entrust.entrust_id,
                "coinExchangeId": entrust.coin_exchange_id,
                "entrustTypeId": entrust.entrust_type_id,
                "user_id": this.props.userInfo.user_id
            }, (err, res) => {
                if (!err) {
                    Toast.show("entrust canceled");
                    let tmp = this.state.userEntrustList;
                    tmp = tmp.filter(i => i.entrust_id !== entrust.entrust_id);
                    this.setState({
                        userEntrustList: tmp
                    })
                } else {
                    Toast.show(err.message)
                }
            })
        })
    }

    updateEntrustVolume(type, percentage) {
        if (!this.props.isLoggedIn) {
            this.props.navigation.navigate("AuthLoginPage");
            return
        }
        if (this.state.userAssets) {
            if (type === 'buy') {
                let coinAsset = this.state.userAssets.find(i => i.coin_id === this.props.TradePageCoinEx.coinEx.exchange_coin_id) ?
                    this.state.userAssets.find(i => i.coin_id === this.props.TradePageCoinEx.coinEx.exchange_coin_id).available : 0;
                this.setState({
                    buyVolume: JSON.stringify(coinAsset * percentage)
                })
            } else {
                let coinAsset = this.state.userAssets.find(i => i.coin_id === this.props.TradePageCoinEx.coinEx.coin_id) ?
                    this.state.userAssets.find(i => i.coin_id === this.props.TradePageCoinEx.coinEx.coin_id).available : 0;
                this.setState({
                    sellVolume: JSON.stringify(coinAsset * percentage)
                })
            }
        }
    }

    renderDoEntrustView(type = 'buy') {
        let Asset = '--';
        if (this.state.userAssets) {
            if (type === 'buy') {
                Asset = this.state.userAssets.find(i => i.coin_id === this.props.TradePageCoinEx.coinEx.exchange_coin_id) ?
                    this.state.userAssets.find(i => i.coin_id === this.props.TradePageCoinEx.coinEx.exchange_coin_id).available : ''
            } else {
                Asset = this.state.userAssets.find(i => i.coin_id === this.props.TradePageCoinEx.coinEx.coin_id) ?
                    this.state.userAssets.find(i => i.coin_id === this.props.TradePageCoinEx.coinEx.coin_id).available : ''
            }
        }

        let ExchangeAmount = null;
        if (type === 'buy' && this.state.buyPrice && this.state.buyVolume) {
            ExchangeAmount = (<Text style={{
                fontSize: 12,
                flex: 8,
                marginTop: 3
            }}>{parseFloat(this.state.buyPrice) * parseFloat(this.state.buyVolume).toFixed(2) + this.props.TradePageCoinEx.coinEx.exchange_coin_name}</Text>)

        } else if (type === 'sell' && this.state.sellPrice && this.state.sellVolume) {
            ExchangeAmount = (<Text style={{
                fontSize: 12,
                flex: 8,
                marginTop: 3
            }}>{(parseFloat(this.state.sellPrice) * parseFloat(this.state.sellVolume)).toFixed(2) + this.props.TradePageCoinEx.coinEx.exchange_coin_name}</Text>)
        }

        return (
            <View style={{padding: 2, flex: 1}}>
                <Text>{type === 'buy' ? I18n.t(Keys.Buy) : I18n.t(Keys.Sell)}</Text>
                <View style={[styles.PriceInput, {flexDirection: 'row'}]}>
                    <Input value={type === 'buy' ? this.state.buyPrice : this.state.sellPrice}
                           onChangeText={value => this.changeState(value, type === 'buy' ? 'buyPrice' : 'sellPrice')}
                           placeholder={(type === "buy" ? I18n.t(Keys.Buy) : I18n.t(Keys.Sell)) + ' ' + I18n.t(Keys.Price)}
                           inputContainerStyle={{borderBottomWidth: 0}}
                           containerStyle={[{flex: 9,borderWidth:0}]} keyboardType={'numeric'}/>
                </View>
                <View style={[styles.PriceInput, {flexDirection: 'row', height: 40, marginTop: 5}]}>
                    <Input value={type === 'buy' ? this.state.buyVolume : this.state.sellVolume}
                           onChangeText={value => this.changeState(value, type === 'buy' ? 'buyVolume' : 'sellVolume')}
                           placeholder={(type === "buy" ? I18n.t(Keys.Buy) : I18n.t(Keys.Sell)) + ' ' + I18n.t(Keys.Volume)}
                           inputContainerStyle={{borderBottomWidth: 0}}
                           containerStyle={[{flex: 9}]} keyboardType={'numeric'}/>
                    <Text style={{
                        flex: 2,
                        lineHeight: 40
                    }}>{this.props.TradePageCoinEx.coinEx && this.props.TradePageCoinEx.coinEx.coin_name}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>

                    {
                        [25, 50, 75, 100].map(i => {
                            return (
                                <View style={{flex: 1}} key={'key ' + i}>
                                    <Button titleStyle={{fontSize: 8}} title={i + '%'} type={'outline'}
                                            onPress={() => this.updateEntrustVolume(type, i / 100)}/>
                                </View>

                            )
                        })
                    }

                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text
                        style={[commonStyles.commonSmallSubTextStyle]}>
                        {I18n.t(Keys.CanUse) + ' ' + JSON.stringify(Asset) + ' ' +
                        (type === 'buy' ? this.props.TradePageCoinEx.coinEx.exchange_coin_name : this.props.TradePageCoinEx.coinEx.coin_name)}
                    </Text>
                </View>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 12, flex: 3}}>{I18n.t(Keys.ExchangeAmount)}</Text>
                        {ExchangeAmount}
                    </View>
                    <Button buttonStyle={{margin: 10, backgroundColor: type === 'buy' ? '#009d7a' : 'red'}}
                            containerStyle={{}}
                            titleStyle={{color: 'white'}}
                            title={(type === 'buy' ? I18n.t(Keys.Buy) : I18n.t(Keys.Sell)) + ' ' +
                            (this.props.TradePageCoinEx.coinEx ? this.props.TradePageCoinEx.coinEx.coin_name : '')}
                            onPress={() => {
                                if (type === 'buy') {
                                    this.doEntrust(1, this.state.buyPrice, this.state.buyVolume, false)
                                } else {
                                    this.doEntrust(0, this.state.sellPrice, this.state.sellVolume, false)
                                }
                            }
                            }
                    />
                </View>
            </View>
        )
    }

    header() {
        return (
            <View>
                {this.renderPriceBar()}
                {this.renderEntrustView()}

                <View style={{flexDirection: 'row', marginTop: 15}}>
                    {this.renderDoEntrustView('buy')}
                    {this.renderDoEntrustView('sell')}
                </View>
                <View
                    style={[commonStyles.commonIntervalStyle, {height: 10}]}/>

                <View style={{borderBottomColor: '#e8e8e8', borderBottomWidth: 1}}>
                    <Text
                        style={[commonStyles.commonInputTextStyle, {fontSize: 20}]}>{I18n.t(Keys.Current_Commission)}</Text>
                </View>


            </View>
        );
    }

    render() {
        const viewHeight = 100;
        const separatorHeight = 1;

        return (
            <View style={[commonStyles.wrapper,]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper,]}>
                    {this.renderTopBar()}
                    <ScrollView>
                        <FlatList
                            data={this.state.userEntrustList}
                            keyExtractor={(item, index) => {
                                return 'item ' + index;
                            }}
                            renderItem={({item, index}) => {
                                return this.renderCommissionCell(viewHeight, item, index);
                            }}
                            ListHeaderComponent={() => {
                                return this.header();
                            }}
                            ItemSeparatorComponent={() => {
                                return <View
                                    style={[commonStyles.commonIntervalStyle, {height: separatorHeight}]}/>;
                            }}
                            getItemLayout={(data, index) => (
                                {length: viewHeight, offset: (viewHeight + separatorHeight) * index, index}
                            )}
                            onScroll={() => {
                            }}
                        />
                    </ScrollView>


                    <ConfirmDialog
                        visible={this.state.isSafePassModalShow}
                        title={I18n.t(Keys.safePassTitle)}
                        titleStyle={{fontSize: 16}}
                        onTouchOutside={() => this.setState({isSafePassModalShow: false})}
                        positiveButton={{
                            title: I18n.t(Keys.Confirm), onPress: () => {
                                if (this.state.entrustTypeIdClicked === 1) {
                                    this.doEntrust(1, this.state.buyPrice, this.state.buyVolume, true)
                                } else if (this.state.entrustTypeIdClicked === 0) {
                                    this.doEntrust(0, this.state.sellPrice, this.state.sellVolume, true)
                                }
                            }
                        }}
                        negativeButton={{
                            title: I18n.t(Keys.Cancel),
                            onPress: () => this.setState({isSafePassModalShow: false})
                        }}>
                        <View>
                            <Input value={this.props.safePass}
                                   onChangeText={(password) => this.props.changeSafePass(password)}/>
                        </View>
                    </ConfirmDialog>
                </SafeAreaView>
            </View>
        );
    }

    renderCommissionCell(viewHeight, entrust, index) {
        return (
            <View style={{height: viewHeight}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[{
                        flex: 1,
                        color: entrust.entrust_type_id === 0 ? '#e7234c' : '#009d7a',
                        fontSize: 20,
                        paddingLeft: 20,
                        paddingRight: 5,
                        paddingTop: 6,
                        paddingBottom: 6
                    }]}>{entrust.entrust_type_id === 0 ? I18n.t(Keys.Sell) : I18n.t(Keys.Buy)}</Text>
                    <Text
                        style={[{flex: 4}, styles.smallGrayFont]}>{moment(entrust.create_time).format('HH:mm MM/DD')}</Text>
                    <Button type={'outline'} titleStyle={{fontSize: 10}} title={I18n.t(Keys.Cancel)}
                            onPress={() => this.doCancelEntrust(entrust)}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text
                        style={[styles.smallGrayFont, {flex: 1}]}>{I18n.t(Keys.Price) + '(' + this.props.TradePageCoinEx.coinEx.exchange_coin_name + ')'}</Text>
                    <Text style={[styles.smallGrayFont, {flex: 1}]}>{I18n.t(Keys.Volume)}</Text>
                    <Text style={[styles.smallGrayFont, {flex: 1}]}>{I18n.t(Keys.Transaction)}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.smallCommission, {flex: 1}]}>{entrust.entrust_price}</Text>
                    <Text style={[styles.smallCommission, {flex: 1}]}>{entrust.entrust_volume}</Text>
                    <Text style={[styles.smallCommission, {flex: 1}]}>{entrust.completed_volume}</Text>
                </View>
            </View>
        )
    }

    gotoKlinePage() {
        this.props.navigation.navigate('KlinePage', {coin_exchange: this.props.TradePageCoinEx});
    }

    renderTopBar() {
        return (
            <View style={[{flexDirection: 'row', marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}]}>
                <View style={[{flexDirection: 'row', flex: 2}]}>
                    <BorderlessButton
                        onPress={() => {
                            this.props.navigation.dispatch(DrawerActions.openDrawer());
                        }}
                        style={{marginLeft: 15, paddingTop: 8}}>
                        <Ionicons
                            name="md-menu"
                            size={Platform.OS === 'ios' ? 22 : 25}
                            color={'black'}
                        />
                    </BorderlessButton>
                    <Text style={[commonStyles.commonInputTextStyle, {fontSize: 20, fontWeight: 'bold'}]}>
                        {this.props.TradePageCoinEx ? this.props.TradePageCoinEx.coinEx.coin_name + '/' + this.props.TradePageCoinEx.coinEx.exchange_coin_name : ''}
                    </Text>
                    <Text style={[{
                        color: this.props.TradePageCoinEx.market.change_rate > 0 ? '#489A48' : '#e7234c', fontSize: 16,
                        backgroundColor: this.props.TradePageCoinEx.market.change_rate > 0 ? '#ebf7f7' : '#faf2f0',
                        marginTop: 8, marginBottom: 8, padding: 4
                    }]}>
                        {this.props.TradePageCoinEx ? Util.numToPercentage(this.props.TradePageCoinEx.market.change_rate) : null}
                    </Text>
                </View>
                <View style={[{flexDirection: 'row', flex: 1}]}>
                    <TouchableHighlight underlayColor='#ddd' onPress={() => this.gotoKlinePage()}>
                        <View>
                            <Image source={require('../../../assets/images/klineIcon.png')}
                                   containerStyle={[{width: 25, height: 25}]}/>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )

    }

    renderPriceBar() {
        return (
            <View style={[{flexDirection: 'row'}]}>
                <View style={[commonStyles.customerRow]}>
                    <Text
                        style={[styles.bigFontPrice, {fontWeight: 'bold'}]}>{this.props.TradePageCoinEx.market ? this.props.TradePageCoinEx.market.last_price : null}</Text>
                    <Text
                        style={[styles.smallGrayFont]}>={this.props.TradePageCoinEx ? Util.toMoneyDisplayWithCurrency(this.props.TradePageCoinEx.price_usd ? this.props.TradePageCoinEx.price_usd : 0, '$') : 0}</Text>
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
                    <View style={[{flexDirection: 'row'}]}>
                        <Text style={[{flex: 1, fontSize: 12}]}>{I18n.t(Keys.Buy)}</Text>
                        <Text style={[{flex: 2, fontSize: 12}]}>{I18n.t(Keys.Volume)}</Text>
                        <Text style={[{flex: 2, fontSize: 12}]}>{I18n.t(Keys.Price)}</Text>
                    </View>
                    {buyList.map((entrustItem, index) => {
                        return TradePageView.renderInfoCell(index, entrustItem, 'buy')
                    })}
                </View>

                <View style={[{flex: 1}]}>
                    <View style={[{flexDirection: 'row'}]}>
                        <Text style={[{flex: 1, fontSize: 12}]}>{I18n.t(Keys.Sell)}</Text>
                        <Text style={[{flex: 2, fontSize: 12}]}>{I18n.t(Keys.Volume)}</Text>
                        <Text style={[{flex: 2, fontSize: 12}]}>{I18n.t(Keys.Price)}</Text>
                    </View>
                    {sellList.sort(function (a, b) {
                        return a.entrust_price - b.entrust_price
                    }).map((entrustItem, index) => {
                        return TradePageView.renderInfoCell(index, entrustItem, 'sell')
                    })}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    PriceInput: {
        borderWidth: 1,
        borderColor: '#9c9a97'
    },
    activeTab: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 0,
        height: 0,
        backgroundColor: 'transparent',
        paddingTop: getStatusBarHeight()
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


    smallCommission: {
        color: '#aaa',
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 8
    },


    smallIconButton: {},


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

