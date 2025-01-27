import React from 'react';
import {
    FlatList,
    InteractionManager,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Image, Input, Text } from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import ColorUtil from "../../util/ColorUtil";
import Toast from "react-native-root-toast";
import CustomMultiPicker from "react-native-multiple-select-list";


class OTCTradePageView extends React.Component {


    constructor( props ) {
        super( props );
        this.state = {
            index: 0,

            nList: [],

            selectedFruits: [],
            isRequesting: false,
            paymentMethodList: {
                1: I18n.t( Keys.wechat ),
                2: I18n.t( Keys.Alipay ),
                3: I18n.t( Keys.bank_transfer ),
                4: "GT Dollar",
                5: "PayPal",
            },


            routes: [
                { key: 'first', title: I18n.t( Keys.Buy ) },
                { key: 'second', title: I18n.t( Keys.Sell ) },
            ],

            isShowTradeHall: true,
            isShowPublishPost: false,
            isShowMyPost: false,
            isShowMyOrder: false,

            description: '',
            remark: '',
            originRemark: '',
            paymentMethod: '',
            amount: '',
            price: '',
            min_amount: '',

            isCNY: true,
            type: 0,

            buyCoins: [],
            sellCoins: [],

            buyCoinEntrust: [],
            sellCoinEntrust: [],

            buyCoinEntrustCNY: [],
            buyCoinEntrustUSD: [],

            buyCoinListShow: [],

            sellCoinEntrustCNY: [],
            sellCoinEntrustUSD: [],

            sellCoinListShow: [],

            buyCoinId: '',
            sellCoinId: '',
            coinName: 'GTB',

            userAsset: [],
            myPostList: [],
            myOrderList: []
        }
    }


    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.OTC ),
            headerBackTitle: null,
        };
    };

    static loadData() {
        InteractionManager.runAfterInteractions( () => {
        } )
    }

    componentDidMount() {
        // OTCTradePageView.loadData()
        this.loadData()
        this.requestPostList()
        this.requestOrderList()
    }

    changeState( value, field ) {
        let param = {};
        param[ field ] = value;
        this.setState( param )
    }

    componentWillUnmount() {
        this.setState = ( state, callback ) => {

        };
    }

    componentWillReceiveProps( nextProps ) {
    }

    shouldComponentUpdate( nextProps, nextState ) {
        return true;
    }

    requestPostList() {
        InteractionManager.runAfterInteractions(
            () => {
                this.props.onOTCEntrustMy(
                    ( error, resBody ) => {
                        if ( error ) {
                            this.setState( {
                                isRequesting: false
                            } );

                            Toast.show( error.message );
                        } else {

                            this.setState( {
                                myPostList: resBody.data
                            } );

                        }
                    }
                )
            }
        )
    }


    requestOrderList() {
        InteractionManager.runAfterInteractions(
            () => {
                this.props.onOTCOrderMy( '',
                    ( error, resBody ) => {
                        if ( error ) {
                            this.setState( {
                                isRequesting: false
                            } );

                            Toast.show( error.message );
                        } else {

                            this.setState( {
                                myOrderList: resBody.data
                            } );

                        }
                    }
                )
            }
        )
    }

    requestList() {
        InteractionManager.runAfterInteractions(
            () => {
                this.props.onNetOtcEntrustList( this.state.buyCoinId, this.state.type, ( error, resBody ) => {
                        if ( error ) {
                            this.setState( {
                                isRequesting: false
                            } );

                            Toast.show( error.message );
                        } else {
                            if ( this.state.type === 0 ) {

                                var orginList = resBody.data;
                                var orginBuyCNY = [];
                                var orginBuyUSD = [];

                                orginList.map( value => {
                                    if ( value.currency === 'CNY' ) {
                                        orginBuyCNY.push( value );
                                    } else {
                                        orginBuyUSD.push( value );
                                    }

                                } );

                                var buyShowlist = [];
                                if ( this.state.isCNY ) {
                                    buyShowlist = orginBuyCNY;
                                } else {
                                    buyShowlist = orginBuyUSD;
                                }

                                this.setState( {
                                    buyCoinEntrust: resBody.data,
                                    buyCoinEntrustCNY: orginBuyCNY,
                                    buyCoinEntrustUSD: orginBuyUSD,
                                    buyCoinListShow: buyShowlist
                                } );
                            } else {

                                var orginSellList = resBody.data;
                                var orginSellCNY = [];
                                var orginSellUSD = [];


                                orginSellList.map( value => {
                                    if ( value.currency === 'CNY' ) {
                                        orginSellCNY.push( value );
                                    } else {
                                        orginSellUSD.push( value );
                                    }
                                } );


                                var sellShowList = [];
                                if ( this.state.isCNY ) {
                                    sellShowList = orginSellCNY;
                                } else {
                                    sellShowList = orginSellUSD;
                                }


                                this.setState( {
                                    sellCoinEntrust: resBody.data,
                                    sellCoinEntrustCNY: orginSellCNY,
                                    sellCoinEntrustUSD: orginSellUSD,
                                    sellCoinListShow: sellShowList
                                } );
                            }
                        }
                    }
                )

            }
        )
    }


    loadData() {
        InteractionManager.runAfterInteractions( () => {
            this.props.onGetOTCSecretRemark( ( error, resBody ) => {
                if ( error ) {
                    this.setState( {
                        isRequesting: false
                    } );

                    Toast.show( error.message );
                } else {
                    this.setState( {
                        originRemark: resBody.data
                    } );
                }
            } );

            this.props.onOTCCoins( ( error, resBody ) => {
                if ( error ) {
                    this.setState( {
                        isRequesting: false
                    } );

                    Toast.show( error.message );
                } else {
                    this.setState( {
                        buyCoins: resBody.data.buy,
                        sellCoins: resBody.data.sell,
                        buyCoinId: resBody.data.buy[ 0 ].coin_id,
                        sellCoinId: resBody.data.sell[ 0 ].coin_id

                    } );
                    this.requestList();

                }
            } );

            if ( this.props.isLoggedIn ) {
                this.props.onAssetsGetUserAssets( ( err, res ) => {
                    this.setState( {
                        userAsset: res.data
                    } )
                } )
            }
        } );


    }

    render() {
        return (
            <View style={[commonStyles.wrapper]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper]}>

                    {this.renderTopMenuBar()}

                    {( this.state.isShowTradeHall || this.state.isShowPublishPost ) ? this.renderTradeHallMainView() : null}
                    {this.state.isShowTradeHall ? this.renderTradeHallFlatList() : null}
                    {this.state.isShowPublishPost ? this.renderPublishPost() : null}
                    {this.state.isShowMyPost ? this.renderMyPostView() : null}
                    {this.state.isShowMyOrder ? this.renderMyOrderView() : null}

                </SafeAreaView>
            </View>
        );
    }

    renderTradeHallMainView() {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableHighlight
                        style={{ flex: 1 }}
                        underlayColor='#ddd'
                        onPress={() => this.setState( { type: 0 }, this.requestList )}>
                        <Text style={{

                            textAlign: 'right',
                            marginTop: 5,
                            marginBottom: 5,
                            marginRight: 10,
                            fontWeight: this.state.type === 0 ? 'bold' : 'none',
                            fontSize: 16
                        }}>{I18n.t( Keys.Buy )}</Text></TouchableHighlight>
                    <TouchableHighlight
                        style={{ flex: 1 }}
                        underlayColor='#ddd'
                        onPress={() => this.setState( { type: 1 }, this.requestList )}>
                        <Text style={{
                            flex: 1,
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: 10,
                            fontWeight: this.state.type === 1 ? 'bold' : 'none',
                            fontSize: 16
                        }}>{I18n.t( Keys.Sell )}</Text></TouchableHighlight>
                </View>
                <View style={{ height: 0.5, backgroundColor: '#d1cfcf' }}/>

                <View style={{ flexDirection: 'row' }}>
                    <ScrollView horizontal={'true'} style={{ flex: 1, flexDirection: 'row' }} contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center'
                    }}>
                        {this.renderCoins()}

                    </ScrollView>

                    <TouchableHighlight underlayColor='#ddd'>
                        <View>
                            <Image source={require( '../../../assets/images/exchangeIcon.png' )}
                                   containerStyle={[{ width: 30, height: 30 }]}/>
                        </View>
                    </TouchableHighlight>


                    <View style={{
                        alignItems: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flex: 1
                    }}>
                        <TouchableHighlight
                            underlayColor='#ddd'
                            onPress={() => this.changeMoneyTypeisCNY( true )

                            }>

                            <Text style={{
                                margin: 8,
                                textDecorationLine: this.state.isCNY ? 'underline' : 'none',
                                fontWeight: this.state.isCNY ? 'bold' : 'none',
                                color: this.state.isCNY ? ColorUtil.default_primary_color : ColorUtil.secondary_text_color
                            }}>CNY</Text>

                        </TouchableHighlight>

                        <TouchableHighlight
                            underlayColor='#ddd'
                            onPress={() => this.changeMoneyTypeisCNY( false )}>

                            <Text style={{
                                margin: 8,
                                textDecorationLine: !this.state.isCNY ? 'underline' : 'none',
                                fontWeight: !this.state.isCNY ? 'bold' : 'none',
                                color: !this.state.isCNY ? ColorUtil.default_primary_color : ColorUtil.secondary_text_color
                            }}>USD</Text>

                        </TouchableHighlight>
                    </View>

                </View>
                <View style={{ height: 0.5, backgroundColor: '#d1cfcf' }}/>
                <View style={{ height: 10, backgroundColor: '#edeced' }}/>

            </View>
        )
    }


    changeMoneyTypeisCNY( value ) {
        if ( value ) {
            if ( this.state.type === 0 ) {
                var showList = this.state.buyCoinEntrustCNY;
                this.setState( { isCNY: true, buyCoinListShow: showList } );

            } else {
                var showList = this.state.sellCoinEntrustCNY;
                this.setState( { isCNY: true, sellCoinListShow: showList } );
            }
        } else {
            if ( this.state.type === 0 ) {
                var showList = this.state.buyCoinEntrustUSD;
                this.setState( { isCNY: false, buyCoinListShow: showList } );
            } else {
                var showList = this.state.sellCoinEntrustUSD;
                this.setState( { isCNY: false, sellCoinListShow: showList } );
            }
        }
    }


    coinsAction( item ) {
        this.setState( { buyCoinId: item.coin_id, coinName: item.coin_name } );
        this.requestList();
    }


    renderCoins() {
        if ( this.state.type === 0 ) {
            return this.state.buyCoins.map( ( item ) => {
                return (
                    <TouchableHighlight
                        underlayColor='#ddd'
                        onPress={() => this.coinsAction( item )}>

                        <View><Text style={{
                            margin: 8,
                            textDecorationLine: this.state.buyCoinId === item.coin_id ? 'underline' : 'none',
                            fontWeight: this.state.buyCoinId === item.coin_id ? 'bold' : 'none',
                            color: this.state.buyCoinId === item.coin_id ? ColorUtil.default_primary_color : ColorUtil.secondary_text_color
                        }}>{item.coin_name}</Text></View>
                    </TouchableHighlight>
                )
            } )
        } else {
            return this.state.sellCoins.map( ( item ) => {
                return (
                    <TouchableHighlight
                        underlayColor='#ddd'
                        onPress={() => this.setState( { sellCoinId: item.coin_id, coinName: item.coin_name } )}>

                        <View><Text style={{
                            margin: 8,
                            textDecorationLine: this.state.sellCoinId === item.coin_id ? 'underline' : 'none',
                            fontWeight: this.state.sellCoinId === item.coin_id ? 'bold' : 'none',
                            color: this.state.sellCoinId === item.coin_id ? ColorUtil.default_primary_color : ColorUtil.secondary_text_color
                        }}>{item.coin_name}</Text></View>
                    </TouchableHighlight>
                )
            } )
        }
    }


    renderTradeHallFlatList() {
        return (
            <View style={[styles.scene, { backgroundColor: '#ffffff', flexDirection: 'row' }]}>
                <FlatList
                    // data={this.state.nList}
                    data={this.state.type === 0 ? this.state.buyCoinListShow : this.state.sellCoinListShow}

                    keyExtractor={( item, index ) => {
                        return 'item ' + index;
                    }}
                    renderItem={( { item, index } ) => {
                        return this.renderItem( 1, item, index );
                    }}
                    ItemSeparatorComponent={() => {
                        return <View
                            style={[commonStyles.commonIntervalStyle, { height: 1 }]}/>;
                    }}
                    getItemLayout={( data, index ) => (
                        { length: 160, offset: ( 160 + 1 ) * index, index }
                    )}
                    onScroll={() => {
                    }}
                />
            </View>


        )
    }


    renderTopMenuBar() {
        return (
            <View style={{ flexDirection: 'row', }}>
                {/*<Button*/}

                <Button
                    title={I18n.t( Keys.trade_hall )}
                    type="outline"
                    containerStyle={[{ flex: 1, margin: 5 }]}
                    titleStyle={[{ fontSize: 10, }]}
                    onPress={() => {
                        this.setState( {
                            isShowTradeHall: true, isShowPublishPost: false, isShowMyPost: false,
                            isShowMyOrder: false
                        } )
                    }
                    }
                />

                <Button
                    title={I18n.t( Keys.publish_post )}
                    type="outline"
                    containerStyle={[{ flex: 1, margin: 5 }]}
                    titleStyle={[{ fontSize: 10, }]}
                    onPress={() => {
                        this.setState( {
                            isShowTradeHall: false, isShowPublishPost: true, isShowMyPost: false,
                            isShowMyOrder: false
                        } )
                    }
                    }
                />

                <Button
                    title={I18n.t( Keys.my_post )}
                    type="outline"
                    containerStyle={[{ flex: 1, margin: 5 }]}
                    titleStyle={[{ fontSize: 10, }]}
                    onPress={() => {
                        this.setState( {
                            isShowTradeHall: false, isShowPublishPost: false, isShowMyPost: true,
                            isShowMyOrder: false
                        } )
                    }
                    }
                />

                <Button
                    title={I18n.t( Keys.my_order )}
                    type="outline"
                    containerStyle={[{ flex: 1, margin: 5 }]}
                    titleStyle={[{ fontSize: 10, }]}
                    onPress={() => {
                        this.setState( {
                            isShowTradeHall: false, isShowPublishPost: false, isShowMyPost: false,
                            isShowMyOrder: true
                        } )
                    }
                    }
                />
            </View>
        )
    }

    renderPublishPost() {
        let Asset = '--';
        if ( this.state.userAsset !== undefined && this.state.userAsset.length > 0 ) {
            if ( this.props.isLoggedIn ) {
                if ( this.state.type === 0 ) {
                    Asset = this.state.userAsset.find( i => i.coin_id === this.state.buyCoinId ).available
                } else {
                    Asset = this.state.userAsset.find( i => i.coin_id === this.state.sellCoinId ).available
                }
            }
        }


        return (
            <ScrollView>
                <View style={{ padding: 16, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <View style={[styles.PriceInput, { height: 40, marginTop: 5, flexDirection: 'row' }]}>
                            <Input
                                onChangeText={value => this.setState( { price: value } )}
                                placeholder={I18n.t( Keys.Price )}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                containerStyle={[{ flex: 9 }]} keyboardType={'numeric'}/>
                            <Text style={{
                                flex: 2,
                                lineHeight: 40,
                            }}>{this.state.isCNY ? 'CNY' : 'USD'}</Text>
                        </View>

                        <View style={[styles.PriceInput, { height: 40, marginTop: 10, flexDirection: 'row' }]}>
                            <Input
                                onChangeText={value => this.setState( { amount: value } )}
                                placeholder={I18n.t( Keys.Amount )}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                containerStyle={[{ flex: 9 }]} keyboardType={'numeric'}/>
                            <Text style={{
                                flex: 2,
                                lineHeight: 40,
                            }}>{this.state.coinName}</Text>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{
                                color: ColorUtil.secondary_text_color,
                                flex: 1,
                                fontSize: 12
                            }}>{I18n.t( Keys.balance )}</Text>
                            <Text style={{
                                color: ColorUtil.secondary_text_color,
                                flex: 1.5,
                                fontSize: 12
                            }}>{this.props.isLoggedIn ? Asset + ' ' + this.state.coinName : '-- ' + this.state.coinName}</Text>
                            <Text style={{
                                color: ColorUtil.secondary_text_color,
                                flex: 1.3,
                                textAlign: 'right',
                                fontSize: 12
                            }}>{I18n.t( Keys.Fees )} (0.1%)</Text>
                        </View>

                        <View style={[styles.PriceInput, { height: 40, marginTop: 10, flexDirection: 'row' }]}>
                            <Input
                                onChangeText={value => this.setState( { min_amount: value } )}
                                placeholder={I18n.t( Keys.limitation )}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                containerStyle={[{ flex: 9 }]} keyboardType={'numeric'}/>
                        </View>

                    </View>

                    <View style={{ flex: 0.7, marginStart: 10 }}>
                        {/*<RadioGroup radioButtons={this.state.paymentMethodList} onPress={this.onSelectPayMethod}/>*/}
                        {/*<SelectMultiple*/}
                        {/*items={this.state.fruits}*/}
                        {/*selectedItems={this.state.selectedFruits}*/}
                        {/*onSelectionsChange={this.onSelectionsChange} />*/}
                        <CustomMultiPicker
                            options={this.state.paymentMethodList}
                            search={false} // should show search bar?
                            multiple={true} //
                            placeholder={"Search"}
                            placeholderTextColor={'#757575'}
                            returnValue={"value"} // label or value
                            callback={( res ) => {
                                this.setState( { paymentMethod: res } )
                            }} // callback, array of selected items
                            rowBackgroundColor={"#fff"}
                            rowHeight={35}
                            rowRadius={5}
                            iconColor={"#00a2dd"}
                            iconSize={20}
                            selectedIconName={"ios-checkmark-circle-outline"}
                            scrollViewHeight={200}
                            selected={["1"]} // list of options which are selected by default
                        />

                    </View>


                </View>

                <View style={{ height: 1, width: '100%', backgroundColor: styles.data.backgroundColor }}></View>

                <View style={{ padding: 16 }}>
                    <Text>{I18n.t( Keys.trade_description )}</Text>

                    <View style={[styles.PriceInput, { height: 200, marginTop: 10, flexDirection: 'row' }]}>
                        <Input
                            onChangeText={( text ) => this.setState( {
                                description: text
                            } )}
                            multiline={true}
                            placeholder={I18n.t( Keys.trade_des_example )}
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            containerStyle={[{ flex: 9 }]} keyboardType={'text'}/>
                    </View>

                </View>

                <View style={{ height: 1, width: '100%', backgroundColor: styles.data.backgroundColor }}></View>

                <View style={{ padding: 16 }}>
                    <Text>{I18n.t( Keys.trade_remark )}</Text>

                    <View style={[styles.PriceInput, { height: 200, marginTop: 10, flexDirection: 'row' }]}>
                        <Input
                            onChangeText={( text ) => this.setState( {
                                remark: text
                            } )}
                            placeholder={this.state.originRemark === '' ? I18n.t( Keys.trade_remark_example ) : this.state.originRemark}
                            multiline={true}
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            containerStyle={[{ flex: 9 }]} keyboardType={'text'}/>
                    </View>

                    <Button
                        style={{ width: 200, height: 40, alignSelf: 'flex-end' }}
                        buttonStyle={{ backgroundColor: ColorUtil.default_primary_color }}
                        title={I18n.t( Keys.save_as_default )}
                        titleStyle={{ fontSize: 14 }}
                        type="solid"
                        onPress={() => {
                            if ( this.props.isLoggedIn ) {
                                this.updateSecretRemark();
                            } else {
                                this.props.navigation.navigate( "AuthLoginPage" )
                            }

                        }
                        }
                        containerStyle={[commonStyles.mgt_normal, commonStyles.mgl_normal]}
                    />


                </View>


                <Button
                    style={{ marginTop: 50 }}
                    title={I18n.t( Keys.publish_post )}
                    buttonStyle={{ backgroundColor: ColorUtil.default_primary_color }}
                    type="solid"
                    onPress={() => {
                        if ( this.props.isLoggedIn ) {
                            this.createEntrust();
                        } else {
                            this.props.navigation.navigate( "AuthLoginPage" )
                        }


                    }
                    }
                    containerStyle={[commonStyles.mgt_normal, commonStyles.mgl_normal, commonStyles.mgr_normal, commonStyles.mgb_normal]}
                />


            </ScrollView>

        )

    }

    updateSecretRemark() {
        InteractionManager.runAfterInteractions( () => {
            this.props.onOTCSecretRemark( this.state.remark, ( error, resBody1 ) => {
                if ( error ) {
                    this.setState( {
                        isRequesting: false
                    } );

                    Toast.show( error.message );
                } else {
                    this.setState( {
                        originRemark: this.state.remark
                    } )

                    Toast.show( I18n.t( Keys.save_success ) )
                }
            } );
        } );

    }

    createEntrust() {
        if ( this.state.price === '' ) {
            Toast.show( I18n.t( Keys.please_input_price ) )

            return
        }

        if ( this.state.amount === '' ) {
            Toast.show( I18n.t( Keys.please_input_amount ) )

            return
        }

        if ( this.state.min_amount === '' ) {
            Toast.show( I18n.t( Keys.please_input_limitation ) )

            return
        }

        let query = {
            type: this.state.type,
            coin_id: this.state.type === 0 ? this.state.buyCoinId : this.state.sellCoinId,
            currency: this.state.isCNY ? 'CNY' : 'USD',
            amount: parseInt( this.state.amount ),
            price: parseInt( this.state.price ),
            min_amount: parseInt( this.state.min_amount ),
            remark: this.state.description,
            secret_remark: this.state.remark,
            methods: this.state.paymentMethod,
        };

        InteractionManager.runAfterInteractions( () => {
            this.props.onOTCEntrustCreate( query, ( error, resBody1 ) => {
                if ( error ) {
                    this.setState( {
                        isRequesting: false
                    } );

                    Toast.show( error.message );
                } else {
                    Toast.show( I18n.t( Keys.post_finished ) )

                    this.requestPostList()
                }
            } );
        } );

    }

    renderItem( viewHeight, item, index ) {

        return (
            <TouchableHighlight
                underlayColor='#ddd'
                style={index % 2 === 1 ? { backgroundColor: '#efefef' } : { backgroundColor: 'white' }}
                onPress={() => {
                    // this.props.navigation.navigate('WebViewPage', {
                    //     url: url + item.page_news_id,
                    //     webTitle: I18n.t(Keys.news)
                    // })
                }}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 2 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require( '../../../assets/images/traderIcon.png' )}
                                   containerStyle={[{ width: 20, height: 20, marginLeft: 20, marginTop: 18 }]}/>
                            <Text style={[{
                                marginTop: 19,
                                marginLeft: 5,
                                marginRight: 5,
                                marginBottom: 6,
                                fontSize: 14,
                                fontWeight: 'bold'
                            }]}>{item.name}</Text>
                        </View>
                        <Text style={[commonStyles.commonSmallSubTextStyle, {
                            marginTop: 4,
                            marginLeft: 22,
                            marginRight: 5,
                            marginBottom: 4
                        }]}>Amount {item.remaining_amount}</Text>
                        <Text style={[commonStyles.commonSmallSubTextStyle, {
                            marginTop: 4,
                            marginLeft: 22,
                            marginRight: 5,
                            marginBottom: 10
                        }]}>Min trade amount {item.min_trade_amount}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[{
                            marginTop: 12,
                            marginLeft: 0,
                            marginRight: 20,
                            marginBottom: 4,
                            textAlign: 'right',
                            fontWeight: 'bold',
                            fontSize: 18
                        }]}>{item.price} {item.currency}</Text>
                        <Button
                            title={this.state.type === 0 ? I18n.t( Keys.Buy ) : I18n.t( Keys.Sell )}
                            containerStyle={[{
                                flex: 1,
                                marginLeft: 20,
                                marginRight: 20,
                                marginTop: 5,
                                marginBottom: 5
                            }]}
                            titleStyle={[{ fontSize: 14, fontWeight: 'bold' }]}
                            onPress={() => {
                                this.props.navigation.navigate( 'OTCBuySellPage', {
                                    orderInfo: item,
                                    type: this.state.type
                                } )
                            }
                            }
                        />

                        <View style={{ flexDirection: 'row', marginBottom: 12, justifyContent: 'center' }}>
                            {
                                item.support_payments_id.map( ( num ) => {
                                    return this.onSelectPayMethod( num )
                                } )
                            }
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }


    onSelectPayMethod( item ) {

        if ( item === "1" ) {
            return ( <Image source={require( '../../../assets/images/payment_wechat.png' )}
                            containerStyle={[{ width: 20, height: 20, marginLeft: 5 }]}/> )
        } else if ( item === "2" ) {
            return ( <Image source={require( '../../../assets/images/payment_ali.png' )}
                            containerStyle={[{ width: 20, height: 20, marginLeft: 5 }]}/> )
        } else if ( item === "3" ) {
            return ( <Image source={require( '../../../assets/images/payment_bank.png' )}
                            containerStyle={[{ width: 20, height: 20, marginLeft: 5 }]}/> )
        } else if ( item === "4" ) {
            return ( <Image source={require( '../../../assets/images/payment_gtdollar.png' )}
                            containerStyle={[{ width: 20, height: 20, marginLeft: 5 }]}/> )
        } else if ( item === "5" ) {
            return ( <Image source={require( '../../../assets/images/payment_paypal.png' )}
                            containerStyle={[{ width: 20, height: 20, marginLeft: 5 }]}/> )
        }
    }


    renderMyPostView() {
        return (
            <View style={[styles.scene, { backgroundColor: '#ffffff', flexDirection: 'row' }]}>
                <FlatList
                    // data={this.state.nList}
                    data={this.state.myPostList}
                    keyExtractor={( item, index ) => {
                        return 'item ' + index;
                    }}
                    renderItem={( { item, index } ) => {
                        return this.renderPostCell( 1, item, index );
                    }}
                    ItemSeparatorComponent={() => {
                        return <View
                            style={[commonStyles.commonIntervalStyle, { height: 1 }]}/>;
                    }}
                    getItemLayout={( data, index ) => (
                        { length: 160, offset: ( 160 + 1 ) * index, index }
                    )}
                    ListHeaderComponent={this.headerPost}
                    onScroll={() => {
                    }}
                />
            </View>
        )
    }


    renderPostCell( viewHeight, item, index ) {
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                style={index % 2 === 1 ? { backgroundColor: '#efefef' } : { backgroundColor: 'white' }}
                onPress={() => {
                    this.props.navigation.navigate( 'OTCPostDetailPage', {
                        entrust: item,
                    } )
                }}>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={[{
                        flex: 0.5,
                        marginTop: 16,
                        marginBottom: 4,
                        textAlign: 'center',
                        fontSize: 12,
                        paddingLeft: 5,
                    }]}>
                        {item.trade_type === 0 ? I18n.t( Keys.Buy ) : I18n.t( Keys.Sell )}
                    </Text>
                    <Text style={[{
                        flex: 0.5,
                        marginTop: 16,
                        marginBottom: 4,
                        textAlign: 'center',
                        fontSize: 12,
                        color: ColorUtil.dark_primary_color,
                        fontWeight: 'bold'
                    }]}>{item.coin_name}</Text>
                    <Text style={[{
                        flex: 1,
                        marginTop: 16,
                        marginBottom: 4,
                        textAlign: 'center',
                        fontSize: 12
                    }]}>{item.remaining_amount}</Text>
                    <View style={{ flex: 1.5, paddingRight: 5 }}>
                        <Text style={[{
                            flex: 2,
                            marginTop: 16,
                            marginBottom: 4,
                            textAlign: 'center',
                            fontSize: 12
                        }]}>{item.price} {item.currency}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 12, justifyContent: 'flex-end' }}>
                            {
                                item.support_payments_id.map( ( num ) => {
                                    return this.onSelectPayMethod( num )
                                } )
                            }
                        </View>
                    </View>

                    <View style={{ flex: 2, paddingRight: 5, justifyContent: 'flex-end' }}>
                        <Text style={[{
                            marginTop: 16,
                            marginBottom: 4,
                            textAlign: 'center',
                            fontSize: 12
                        }]}>{item.valid_duration / 60} {I18n.t( Keys.Minutes )}</Text>
                        <Button
                            title={I18n.t( Keys.Detail )}
                            containerStyle={[{ marginTop: 5, marginBottom: 5, width: 80, alignSelf: 'flex-end' }]}
                            titleStyle={[{ fontSize: 10, fontWeight: 'bold' }]}
                            onPress={() => {
                                this.props.navigation.navigate( 'OTCPostDetailPage', {
                                    entrust: item,
                                } )
                            }
                            }
                        />
                    </View>

                    <View style={{ flex: 2, paddingRight: 5 }}>
                        <Text style={[{
                            flex: 1,
                            marginTop: 16,
                            marginBottom: 4,
                            textAlign: 'center',
                            fontSize: 12
                        }]}>{this.checkPostStatus( item.status )}</Text>
                        <Button
                            title={I18n.t( Keys.Cancel )}
                            containerStyle={[{ marginTop: 5, marginBottom: 5 }]}
                            titleStyle={[{ fontSize: 10, fontWeight: 'bold' }]}
                            onPress={() => {
                                this.deleteMyPost( item.id )
                            }
                            }
                        />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    renderOrderCell( viewHeight, item, index ) {
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                style={index % 2 === 1 ? { backgroundColor: '#efefef' } : { backgroundColor: 'white' }}
                onPress={() => {
                    // this.props.navigation.navigate('WebViewPage', {
                    //     url: url + item.page_news_id,
                    //     webTitle: I18n.t(Keys.news)
                    // })
                }}>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={[{
                        flex: 1,
                        marginTop: 16,
                        marginBottom: 4,
                        textAlign: 'center',
                        fontSize: 12,
                        paddingLeft: 5,
                    }]}>{item.trade_price} {item.trade_currency}</Text>
                    <Text style={[{
                        flex: 2,
                        marginTop: 16,
                        marginBottom: 4,
                        textAlign: 'center',
                        fontSize: 12
                    }]}>{item.coin_amount}</Text>
                    <Text style={[{
                        flex: 2,
                        marginTop: 16,
                        marginBottom: 4,
                        textAlign: 'center',
                        fontSize: 12
                    }]}>{item.trade_amount}</Text>

                    <View style={{ flex: 3, flexDirection: 'row', paddingRight: 5 }}>
                        <Text style={[{
                            flex: 1,
                            marginTop: 16,
                            marginBottom: 4,
                            textAlign: 'center',
                            fontSize: 12
                        }]}>{this.checkOrderStatus( item.status )}</Text>
                        <Button
                            title={I18n.t( Keys.Detail )}
                            containerStyle={[{ flex: 1, marginTop: 5, marginBottom: 5 }]}
                            titleStyle={[{ fontSize: 14, fontWeight: 'bold' }]}
                            onPress={() => {
                                this.props.navigation.navigate( 'OTCOrderDetailPage', {
                                    entrust: item,
                                } )

                            }
                            }
                        />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    deleteMyPost( id ) {
        this.setState( {
            myPostList: this.state.myPostList.filter( item => item.id !== id )
        } );

        InteractionManager.runAfterInteractions(
            () => {
                this.props.onOTCEntrustCancel( id, ( error, resBody ) => {
                        if ( error ) {
                            this.setState( {
                                isRequesting: false
                            } );

                            Toast.show( error.message );
                        } else {
                            Toast.show( I18n.t( Keys.Cancelled ) );
                        }
                    }
                )
            }
        )

    }

    headerPost() {
        return (
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={{
                    flex: 0.5,
                    textAlign: 'center',
                    fontSize: 12,
                    paddingLeft: 5,
                    color: '#6d6c67'
                }}>{I18n.t( Keys.type )}</Text>
                <Text style={{
                    flex: 0.5,
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#6d6c67'
                }}>{I18n.t( Keys.Coin )}</Text>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#6d6c67'
                }}>{I18n.t( Keys.Remaining_amout )}</Text>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#6d6c67'
                }}>{I18n.t( Keys.UnitPrice )}</Text>
                <Text style={{
                    flex: 2,
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#6d6c67'
                }}>{I18n.t( Keys.Payment_Duration )}</Text>
                <Text style={{
                    flex: 2,
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#6d6c67'
                }}>{I18n.t( Keys.status )}</Text>
            </View>
        );
    };

    headerOrder() {
        return (
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 12,
                    paddingLeft: 5,
                    color: '#6d6c67'
                }}>{I18n.t( Keys.UnitPrice )}</Text>
                <Text style={{
                    flex: 2,
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#6d6c67'
                }}>{I18n.t( Keys.Amount )}</Text>
                <Text style={{
                    flex: 2,
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#6d6c67'
                }}>{I18n.t( Keys.WholeAmout )}</Text>
                <Text style={{
                    flex: 3,
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#6d6c67'
                }}>{I18n.t( Keys.status )}</Text>
            </View>
        );
    };

    checkPostStatus( value ) {
        if ( value === 0 ) {
            return I18n.t( Keys.Unfilled );
        } else if ( value === 1 ) {
            return I18n.t( Keys.Partial_Filled );

        } else if ( value === 2 ) {
            return I18n.t( Keys.Done );

        } else if ( value === 3 ) {
            return I18n.t( Keys.Cancelled );
        } else {
            return null;
        }

    }

    checkOrderStatus( value ) {
        if ( value === 0 ) {
            return I18n.t( Keys.Unfilled );
        } else if ( value === 1 ) {
            return I18n.t( Keys.Paid );

        } else if ( value === 2 ) {
            return I18n.t( Keys.Done );

        } else if ( value === 3 ) {
            return I18n.t( Keys.expired );
        } else {
            return I18n.t( Keys.Cancelled );
        }

    }

    renderMyOrderView() {
        return (
            <View style={[styles.scene, { backgroundColor: '#ffffff', flexDirection: 'row' }]}>
                <FlatList
                    data={this.state.myOrderList}
                    keyExtractor={( item, index ) => {
                        return 'item ' + index;
                    }}
                    renderItem={( { item, index } ) => {
                        return this.renderOrderCell( 1, item, index );
                    }}
                    ItemSeparatorComponent={() => {
                        return <View
                            style={[commonStyles.commonIntervalStyle, { height: 1 }]}/>;
                    }}
                    getItemLayout={( data, index ) => (
                        { length: 160, offset: ( 160 + 1 ) * index, index }
                    )}
                    ListHeaderComponent={this.headerOrder}
                    onScroll={() => {
                    }}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create( {
    PriceInput: {
        borderWidth: 1,
        borderColor: ColorUtil.default_primary_color
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
        backgroundColor: '#04a384'
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
        borderWidth: 1,
        color: '#777'
    },

    scene: {
        flex: 1,
    },
} );


export default OTCTradePageView;

