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
import {SceneMap, TabView} from 'react-native-tab-view';
import {Button, Image, Input, Text} from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import ColorUtil from "../../util/ColorUtil";
import Toast from "react-native-root-toast";
import CustomMultiPicker from "react-native-multiple-select-list";


class OTCTradePageView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            index: 0,

            nList: [],

            selectedFruits: [],
            isRequesting: false,
            paymentMethodList: {
                1: "Wechat",
                2: "Alipay",
                3: "Bank Transfer",
                4: "GT Dollar",
                5: "PayPal",
            },


            routes: [
                {key: 'first', title: I18n.t( Keys.Buy )},
                {key: 'second', title: I18n.t( Keys.Sell )},
            ],

            isShowTradeHall: true,
            isShowPublishPost: false,
            isShowMyPost:false,
            isShowMyOrder:false,

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

            buyCoinId: '',
            sellCoinId: '',
            coinName: 'GTB',

            userAsset: [],
            myPostList:[],
            myOrderList:[]
        }
    }


    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;

        return {
            title: "OTCTradePageView",
            headerBackTitle: null,
        };
    };

    static loadData() {
        InteractionManager.runAfterInteractions(() => {
        })
    }

    componentDidMount() {
        // OTCTradePageView.loadData()
        this.loadData()
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

    requestPostList(){
        InteractionManager.runAfterInteractions(
            () => {
                this.props.onOTCEntrustMy(
                    (error, resBody) => {
                        if (error) {
                            this.setState({
                                isRequesting: false
                            });

                            Toast.show(error.message);
                        } else {

                            this.setState({
                                myPostList: resBody.data
                            });

                        }
                    }
                )
            }
        )
    }

    requestOrderList(){
        InteractionManager.runAfterInteractions(
            () => {
                this.props.onOTCOrderMy(
                    (error, resBody) => {
                        if (error) {
                            this.setState({
                                isRequesting: false
                            });

                            Toast.show(error.message);
                        } else {
                            this.setState({
                                myOrderList: resBody.data
                            });
                        }
                    }

                )
            }
        )
    }


    requestList() {
        InteractionManager.runAfterInteractions(
            () => {
                this.props.onNetOtcEntrustList(this.state.buyCoinId, this.state.type, (error, resBody) => {
                        if (error) {
                            this.setState({
                                isRequesting: false
                            });

                            Toast.show(error.message);
                        } else {
                            if (this.state.type === 0) {
                                this.setState({
                                    buyCoinEntrust: resBody.data
                                });
                            } else {
                                this.setState({
                                    sellCoinEntrust: resBody.data
                                });
                            }
                        }
                    }
                )

            }
        )
    }


    loadData() {
        InteractionManager.runAfterInteractions(() => {
            this.props.onGetOTCSecretRemark((error, resBody) => {
                if (error) {
                    this.setState({
                        isRequesting: false
                    });

                    Toast.show(error.message);
                } else {
                    this.setState({
                        originRemark: resBody.data
                    });
                }
            });

            this.props.onOTCCoins((error, resBody) => {
                if (error) {
                    this.setState({
                        isRequesting: false
                    });

                    Toast.show(error.message);
                } else {
                    this.setState({
                        buyCoins: resBody.data.buy,
                        sellCoins: resBody.data.sell,
                        buyCoinId: resBody.data.buy[0].coin_id,
                        sellCoinId: resBody.data.sell[0].coin_id

                    });
                    this.requestList();

                }
            });

            if (this.props.isLoggedIn) {
                this.props.onAssetsGetUserAssets((err, res) => {
                    this.setState({
                        userAsset: res.data
                    })
                })
            }
        });

    }

    render() {
        return (
            <View style={[commonStyles.wrapper]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper]}>
                    {/*<Text>otc1</Text>*/}
                    {this.renderTopMenuBar()}
                    {/*{this.renderTradeHallMainView()}*/}

                    {(this.state.isShowTradeHall||this.state.isShowPublishPost)?this.renderTradeHallMainView():null}
                    {this.state.isShowTradeHall ? this.renderTradeHallFlatList() : null}
                    {this.state.isShowPublishPost ? this.renderPublishPost() : null}
                    {this.state.isShowMyPost? this.renderMyPostView():null}
                    {this.state.isShowMyOrder? this.renderMyOrderView():null}

                </SafeAreaView>
            </View>
        );
    }

    renderTradeHallMainView() {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight
                        style={{flex: 1}}
                        underlayColor='#ddd'
                        onPress={() => this.setState({type: 0}, this.requestList)}>
                        <Text style={{

                            textAlign: 'right',
                            marginTop: 5,
                            marginBottom: 5,
                            marginRight: 10,
                            fontWeight: this.state.type === 0 ? 'bold' : 'none',
                            fontSize: 16
                        }}>Buy</Text></TouchableHighlight>
                    <TouchableHighlight
                        style={{flex: 1}}
                        underlayColor='#ddd'
                        onPress={() => this.setState({type: 1}, this.requestList)}>
                        <Text style={{
                            flex: 1,
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: 10,
                            fontWeight: this.state.type === 1 ? 'bold' : 'none',
                            fontSize: 16
                        }}>Sell</Text></TouchableHighlight>
                </View>
                <View style={{height: 0.5, backgroundColor: '#d1cfcf'}}/>

                <View style={{flexDirection: 'row'}}>
                    <ScrollView horizontal={'true'} style={{flex: 1, flexDirection: 'row'}} contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center'
                    }}>
                        {this.renderCoins()}

                    </ScrollView>

                    <TouchableHighlight underlayColor='#ddd'>
                        <View>
                            <Image source={require('../../../assets/images/exchangeIcon.png')}
                                   containerStyle={[{width: 30, height: 30}]}/>
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
                            onPress={() => this.setState({isCNY: true})}>

                            <Text style={{
                                margin: 8,
                                textDecorationLine: this.state.isCNY ? 'underline' : 'none',
                                fontWeight: this.state.isCNY ? 'bold' : 'none',
                                color: this.state.isCNY ? ColorUtil.default_primary_color : ColorUtil.secondary_text_color
                            }}>CNY</Text>

                        </TouchableHighlight>

                        <TouchableHighlight
                            underlayColor='#ddd'
                            onPress={() => this.setState({isCNY: false})}>

                            <Text style={{
                                margin: 8,
                                textDecorationLine: !this.state.isCNY ? 'underline' : 'none',
                                fontWeight: !this.state.isCNY ? 'bold' : 'none',
                                color: !this.state.isCNY ? ColorUtil.default_primary_color : ColorUtil.secondary_text_color
                            }}>USD</Text>

                        </TouchableHighlight>
                    </View>

                </View>
                <View style={{height: 0.5, backgroundColor: '#d1cfcf'}}/>
                <View style={{height: 10, backgroundColor: '#edeced'}}/>

            </View>
        )
    }


    coinsAction(item) {
        this.setState({buyCoinId: item.coin_id, coinName: item.coin_name});
        this.requestList();
    }


    //this.setState({buyCoinId: item.coin_id, coinName: item.coin_name})


    renderCoins() {
        if (this.state.type === 0) {
            return this.state.buyCoins.map((item) => {
                return (
                    <TouchableHighlight
                        underlayColor='#ddd'
                        onPress={() => this.coinsAction(item)}>

                        <View><Text style={{
                            margin: 8,
                            textDecorationLine: this.state.buyCoinId === item.coin_id ? 'underline' : 'none',
                            fontWeight: this.state.buyCoinId === item.coin_id ? 'bold' : 'none',
                            color: this.state.buyCoinId === item.coin_id ? ColorUtil.default_primary_color : ColorUtil.secondary_text_color
                        }}>{item.coin_name}</Text></View>
                    </TouchableHighlight>
                )
            })
        } else {
            return this.state.sellCoins.map((item) => {
                return (
                    <TouchableHighlight
                        underlayColor='#ddd'
                        onPress={() => this.setState({sellCoinId: item.coin_id, coinName: item.coin_name})}>

                        <View><Text style={{
                            margin: 8,
                            textDecorationLine: this.state.sellCoinId === item.coin_id ? 'underline' : 'none',
                            fontWeight: this.state.sellCoinId === item.coin_id ? 'bold' : 'none',
                            color: this.state.sellCoinId === item.coin_id ? ColorUtil.default_primary_color : ColorUtil.secondary_text_color
                        }}>{item.coin_name}</Text></View>
                    </TouchableHighlight>
                )
            })
        }
    }


    renderTradeHallFlatList() {
        return (
            <View style={[styles.scene, {backgroundColor: '#ffffff', flexDirection: 'row'}]}>
                <FlatList
                    // data={this.state.nList}
                    data={this.state.type === 0 ? this.state.buyCoinEntrust : this.state.sellCoinEntrust}

                    keyExtractor={(item, index) => {
                        return 'item ' + index;
                    }}
                    renderItem={({item, index}) => {
                        return this.renderItem(1, item, index);
                    }}
                    ItemSeparatorComponent={() => {
                        return <View
                            style={[commonStyles.commonIntervalStyle, {height: 1}]}/>;
                    }}
                    getItemLayout={(data, index) => (
                        {length: 160, offset: (160 + 1) * index, index}
                    )}
                    onScroll={() => {
                    }}
                />
            </View>


        )
    }


    renderTopMenuBar() {
        return (
            <View style={{flexDirection: 'row',}}>
                {/*<Button*/}

                <Button
                    title={"Trade Hall"}
                    type="outline"
                    containerStyle={[{flex: 1, margin: 5}]}
                    titleStyle={[{fontSize: 10,}]}
                    onPress={() => {
                        this.setState({isShowTradeHall: true, isShowPublishPost: false, isShowMyPost:false,
                            isShowMyOrder:false})
                    }
                    }
                />

                <Button
                    title={"Publish Post"}
                    type="outline"
                    containerStyle={[{flex: 1, margin: 5}]}
                    titleStyle={[{fontSize: 10,}]}
                    onPress={() => {
                        this.setState({isShowTradeHall: false, isShowPublishPost: true, isShowMyPost:false,
                            isShowMyOrder:false})
                    }
                    }
                />

                <Button
                    title={"My Post"}
                    type="outline"
                    containerStyle={[{flex: 1, margin: 5}]}
                    titleStyle={[{fontSize: 10,}]}
                    onPress={() => {
                        this.setState({isShowTradeHall: false, isShowPublishPost: false, isShowMyPost:true,
                            isShowMyOrder:false})
                    }
                    }
                />

                <Button
                    title={"My Order"}
                    type="outline"
                    containerStyle={[{flex: 1, margin: 5}]}
                    titleStyle={[{fontSize: 10,}]}
                    onPress={() => {
                        this.setState({isShowTradeHall: false, isShowPublishPost: false, isShowMyPost:false,
                            isShowMyOrder:true})
                    }
                    }
                />
            </View>
        )
    }

    renderPublishPost() {
        let Asset = '--';
        if (this.state.userAsset !== undefined && this.state.userAsset.length > 0) {
            if (this.props.isLoggedIn) {
                if (this.state.type === 0) {
                    Asset = this.state.userAsset.find(i => i.coin_id === this.state.buyCoinId).available
                } else {
                    Asset = this.state.userAsset.find(i => i.coin_id === this.state.sellCoinId).available
                }
            }
        }


        return (
            <ScrollView>
                <View style={{padding: 16, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <View style={[styles.PriceInput, {height: 40, marginTop: 5, flexDirection: 'row'}]}>
                            <Input
                                onChangeText={value => this.setState({price: value})}
                                placeholder={I18n.t(Keys.Price)}
                                inputContainerStyle={{borderBottomWidth: 0}}
                                containerStyle={[{flex: 9}]} keyboardType={'numeric'}/>
                            <Text style={{
                                flex: 2,
                                lineHeight: 40,
                            }}>{this.state.isCNY ? 'CNY' : 'USD'}</Text>

                        </View>

                        <View style={[styles.PriceInput, {height: 40, marginTop: 10, flexDirection: 'row'}]}>
                            <Input
                                onChangeText={value => this.setState({amount: value})}
                                placeholder={I18n.t(Keys.Amount)}
                                inputContainerStyle={{borderBottomWidth: 0}}
                                containerStyle={[{flex: 9}]} keyboardType={'numeric'}/>
                            <Text style={{
                                flex: 2,
                                lineHeight: 40,
                            }}>{this.state.coinName}</Text>

                        </View>

                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Text style={{color: ColorUtil.secondary_text_color, flex: 1, fontSize: 12}}>Balance</Text>
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
                            }}>Fee(0.1%)</Text>
                        </View>

                        <View style={[styles.PriceInput, {height: 40, marginTop: 10, flexDirection: 'row'}]}>
                            <Input
                                onChangeText={value => this.setState({min_amount: value})}
                                placeholder={'Limitation'}
                                inputContainerStyle={{borderBottomWidth: 0}}
                                containerStyle={[{flex: 9}]} keyboardType={'numeric'}/>
                        </View>

                    </View>

                    <View style={{flex: 0.7, marginStart: 10}}>
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
                            callback={(res) => {
                                this.setState({paymentMethod: res})
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

                <View style={{height: 1, width: '100%', backgroundColor: styles.data.backgroundColor}}></View>

                <View style={{padding: 16}}>
                    <Text>Trade Description (Open To Everyone)</Text>

                    <View style={[styles.PriceInput, {height: 200, marginTop: 10, flexDirection: 'row'}]}>
                        <Input
                            onChangeText={(text) => this.setState({
                                description: text
                            })}
                            placeholder={'Example'}
                            inputContainerStyle={{borderBottomWidth: 0}}
                            containerStyle={[{flex: 9}]} keyboardType={'text'}/>
                    </View>

                </View>

                <View style={{height: 1, width: '100%', backgroundColor: styles.data.backgroundColor}}></View>

                <View style={{padding: 16}}>
                    <Text>Trade Remark (Open To User Create Order)</Text>

                    <View style={[styles.PriceInput, {height: 200, marginTop: 10, flexDirection: 'row'}]}>
                        <Input
                            onChangeText={(text) => this.setState({
                                remark: text
                            })}
                            placeholder={this.state.originRemark === '' ? 'Example' : this.state.originRemark}
                            text
                            inputContainerStyle={{borderBottomWidth: 0}}
                            containerStyle={[{flex: 9}]} keyboardType={'text'}/>
                    </View>

                    <Button
                        style={{width: 200, height: 40, alignSelf: 'flex-end'}}
                        buttonStyle={{backgroundColor: ColorUtil.default_primary_color}}
                        title={'Save as Default'}
                        titleStyle={{fontSize: 14}}
                        type="solid"
                        onPress={() => {
                            if (this.props.isLoggedIn) {
                                this.updateSecretRemark();
                            } else {
                                this.props.navigation.navigate("AuthLoginPage")
                            }

                        }
                        }
                        containerStyle={[commonStyles.mgt_normal, commonStyles.mgl_normal]}
                    />


                </View>


                <Button
                    style={{marginTop: 50}}
                    title={'Publish Post'}
                    buttonStyle={{backgroundColor: ColorUtil.default_primary_color}}
                    type="solid"
                    onPress={() => {
                        if (this.props.isLoggedIn) {
                            this.createEntrust();
                        } else {
                            this.props.navigation.navigate("AuthLoginPage")
                        }


                    }
                    }
                    containerStyle={[commonStyles.mgt_normal, commonStyles.mgl_normal, commonStyles.mgr_normal, commonStyles.mgb_normal]}
                />


            </ScrollView>

        )

    }

    updateSecretRemark() {
        InteractionManager.runAfterInteractions(() => {
            this.props.onOTCSecretRemark(this.state.remark, (error, resBody1) => {
                if (error) {
                    this.setState({
                        isRequesting: false
                    });

                    Toast.show(error.message);
                } else {
                    this.setState({
                        originRemark: value
                    })

                    Toast.show(I18n.t(Keys.save_success))
                }
            });
        });

    }

    createEntrust() {
        let query = {
            type: this.state.type,
            coin_id: this.state.type === 0 ? this.state.buyCoinId : this.state.sellCoinId,
            currency: this.state.isCNY ? 'CNY' : 'USD',
            amount: parseInt(this.state.amount),
            price: parseInt(this.state.price),
            min_amount: parseInt(this.state.min_amount),
            remark: this.state.description,
            secret_remark: this.state.remark,
            methods: this.state.paymentMethod,
        };

        InteractionManager.runAfterInteractions(() => {
            this.props.onOTCEntrustCreate(query, (error, resBody1) => {
                if (error) {
                    this.setState({
                        isRequesting: false
                    });

                    Toast.show(error.message);
                } else {
                    Toast.show("Post Finished")
                }
            });
        });

    }

    renderItem(viewHeight, item, index) {

        return (
            <TouchableHighlight
                underlayColor='#ddd'
                style={index % 2 === 1 ? {backgroundColor: '#efefef'} : {backgroundColor: 'white'}}
                onPress={() => {
                    // this.props.navigation.navigate('WebViewPage', {
                    //     url: url + item.page_news_id,
                    //     webTitle: I18n.t(Keys.news)
                    // })
                }}>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={require('../../../assets/images/traderIcon.png')}
                                   containerStyle={[{width: 20, height: 20, marginLeft: 20, marginTop: 18}]}/>
                            <Text style={[{
                                marginTop: 19,
                                marginLeft: 5,
                                marginRight: 5,
                                marginBottom: 6,
                                fontSize: 14,
                                fontWeight:'bold'
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
                    <View style={{flex: 1}}>
                        <Text style={[{
                            marginTop: 12,
                            marginLeft: 0,
                            marginRight: 20,
                            marginBottom: 4,
                            textAlign:'right',
                            fontWeight:'bold',
                            fontSize:18
                        }]}>{item.price} {item.currency}</Text>
                        <Button
                            title={this.state.type === 0 ? I18n.t(Keys.Buy) : I18n.t(Keys.Sell)}
                            containerStyle={[{flex: 1, marginLeft:20, marginRight:20,marginTop:5, marginBottom:5}]}
                            titleStyle={[{fontSize: 14, fontWeight:'bold'}]}
                            onPress={() => {
                                this.props.navigation.navigate( 'OTCBuySellPage', {
                                    orderInfo: item,
                                    type: this.state.type
                                } )
                            }
                            }
                        />

                        <View style={{flexDirection: 'row', marginBottom: 12, marginLeft: 5}}>
                            {
                                item.support_payments_id.map((num) => {
                                    return this.onSelectPayMethod(num)
                                })
                            }
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }


    onSelectPayMethod(item) {
        return (
            <Image source={require('../../../assets/images/exchangeIcon.png')}
                   containerStyle={[{width: 20, height: 20, marginLeft: 5}]}/>)
    }


    renderMyPostView(){
        return (
            <View style={[styles.scene, {backgroundColor: '#ffffff', flexDirection: 'row'}]}>
                <FlatList
                    // data={this.state.nList}
                    data={ this.state.myPostList }
                    keyExtractor={(item, index) => {
                        return 'item ' + index;
                    }}
                    renderItem={({item, index}) => {
                        return this.renderPostCell(1, item, index);
                    }}
                    ItemSeparatorComponent={() => {
                        return <View
                            style={[commonStyles.commonIntervalStyle, {height: 1}]}/>;
                    }}
                    getItemLayout={(data, index) => (
                        {length: 160, offset: (160 + 1) * index, index}
                    )}
                    ListHeaderComponent={this.headerPost}
                    onScroll={() => {
                    }}
                />
            </View>
        )
    }


    renderPostCell(viewHeight, item, index){
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                style={index % 2 === 1 ? {backgroundColor: '#efefef'} : {backgroundColor: 'white'}}
                onPress={() => {
                    // this.props.navigation.navigate('WebViewPage', {
                    //     url: url + item.page_news_id,
                    //     webTitle: I18n.t(Keys.news)
                    // })
                }}>

                <View style={{flexDirection: 'row'}}>
                        <Text style={[{
                            flex: 1,
                            marginTop: 16,
                            marginBottom: 4,
                            textAlign:'center',
                            fontSize:12,
                            paddingLeft:5,
                        }]}>{item.price} {item.currency}</Text>
                        <Text style={[{
                            flex: 1,
                            marginTop: 16,
                            marginBottom: 4,
                            textAlign:'center',
                            fontSize:12
                        }]}>{item.coin_name}</Text>
                        <Text style={[{
                            flex: 1,
                            marginTop: 16,
                            marginBottom: 4,
                            textAlign:'center',
                            fontSize:12
                        }]}>{item.remaining_amount}</Text>
                        <Text style={[{
                            flex: 1,
                            marginTop: 16,
                            marginBottom: 4,
                            textAlign:'center',
                            fontSize:12
                        }]}>{item.price}</Text>
                        <Text style={[{
                            flex: 2,
                            marginTop: 16,
                            marginBottom: 4,
                            textAlign:'center',
                            fontSize:12
                        }]}>{item.valid_duration}</Text>

                    <View style={{flex:3, flexDirection:'row',paddingRight:5}}>
                        <Text style={[{
                            flex: 1,
                            marginTop: 16,
                            marginBottom: 4,
                            textAlign:'center',
                            fontSize:12
                        }]}>{item.status}</Text>
                        <Button
                            title={I18n.t(Keys.Detail)}
                            containerStyle={[{flex: 1, marginTop:5, marginBottom:5}]}
                            titleStyle={[{fontSize: 14, fontWeight:'bold'}]}
                            onPress={() => {
                            }
                            }
                        />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }





    renderOrderCell(viewHeight, item, index){
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                style={index % 2 === 1 ? {backgroundColor: '#efefef'} : {backgroundColor: 'white'}}
                onPress={() => {
                    // this.props.navigation.navigate('WebViewPage', {
                    //     url: url + item.page_news_id,
                    //     webTitle: I18n.t(Keys.news)
                    // })
                }}>

                <View style={{flexDirection: 'row'}}>
                    <Text style={[{
                        flex: 1,
                        marginTop: 16,
                        marginBottom: 4,
                        textAlign:'center',
                        fontSize:12,
                        paddingLeft:5,
                    }]}>{item.trade_price} {item.trade_currency}</Text>
                    <Text style={[{
                        flex: 2,
                        marginTop: 16,
                        marginBottom: 4,
                        textAlign:'center',
                        fontSize:12
                    }]}>{item.coin_amount}</Text>
                    <Text style={[{
                        flex: 2,
                        marginTop: 16,
                        marginBottom: 4,
                        textAlign:'center',
                        fontSize:12
                    }]}>{item.trade_amount}</Text>

                    <View style={{flex:3, flexDirection:'row',paddingRight:5}}>
                        <Text style={[{
                            flex: 1,
                            marginTop: 16,
                            marginBottom: 4,
                            textAlign:'center',
                            fontSize:12
                        }]}>{item.status}</Text>
                        <Button
                            title={I18n.t(Keys.Detail)}
                            containerStyle={[{flex: 1, marginTop:5, marginBottom:5}]}
                            titleStyle={[{fontSize: 14, fontWeight:'bold'}]}
                            onPress={() => {
                            }
                            }
                        />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }


























    headerPost ()  {
        return (
            <View  style={{flexDirection:'row'}}>
                <Text style={{flex:1, textAlign:'center', fontSize:12, paddingLeft:5, color:'#6d6c67'}}>Type</Text>
                <Text style={{flex:1, textAlign:'center', fontSize:12, paddingLeft:5, color:'#6d6c67'}}>Coin</Text>
                <Text style={{flex:1, textAlign:'center', fontSize:12, paddingLeft:5, color:'#6d6c67'}}>Remaining amount</Text>
                <Text style={{flex:1, textAlign:'center', fontSize:12, paddingLeft:5, color:'#6d6c67'}}>{I18n.t(Keys.UnitPrice)}</Text>
                <Text style={{flex:2, textAlign:'center',fontSize:12, color:'#6d6c67'}}>Payment Duration</Text>
                <Text style={{flex:2, textAlign:'center',fontSize:12, color:'#6d6c67'}}>Status</Text>
            </View>
        );
    };



    headerOrder ()  {
        return (
            <View  style={{flexDirection:'row'}}>
                <Text style={{flex:1, textAlign:'center', fontSize:12, paddingLeft:5, color:'#6d6c67'}}>{I18n.t(Keys.UnitPrice)}</Text>
                <Text style={{flex:2, textAlign:'center',fontSize:12, color:'#6d6c67'}}>{I18n.t(Keys.Amount)}</Text>
                <Text style={{flex:2, textAlign:'center',fontSize:12, color:'#6d6c67'}}>{I18n.t(Keys.WholeAmout)}</Text>
                <Text style={{flex:3, textAlign:'center',fontSize:12, color:'#6d6c67'}}>{I18n.t(Keys.State)}</Text>
            </View>
        );
    };






    renderMyOrderView(){
        return (
            <View style={[styles.scene, {backgroundColor: '#ffffff', flexDirection: 'row'}]}>
                <FlatList
                    data={this.state.myOrderList}
                    keyExtractor={(item, index) => {
                        return 'item ' + index;
                    }}
                    renderItem={({item, index}) => {
                        return this.renderOrderCell(1, item, index);
                    }}
                    ItemSeparatorComponent={() => {
                        return <View
                            style={[commonStyles.commonIntervalStyle, {height: 1}]}/>;
                    }}
                    getItemLayout={(data, index) => (
                        {length: 160, offset: (160 + 1) * index, index}
                    )}
                    ListHeaderComponent={this.headerOrder}
                    onScroll={() => {
                    }}
                />
            </View>
        )
    }

}


const styles = StyleSheet.create({
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
        borderWidth: 1,
        color: '#777'
    },

    scene: {
        flex: 1,
    },
});


export default OTCTradePageView;

