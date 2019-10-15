import React from 'react';
import {
    InteractionManager,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    FlatList,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import {TabView, SceneMap} from 'react-native-tab-view';
import {Text, Button, Input, Image} from "react-native-elements";

import Spinner from "../mine/UserInfoVerifyPageView";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import ColorUtil from "../../util/ColorUtil";
import RadioGroup from 'react-native-radio-buttons-group';
import Toast from "react-native-root-toast";
import SelectMultiple from 'react-native-select-multiple'
import CustomMultiPicker from "react-native-multiple-select-list";

const SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}/>
);


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
            // paymentMethodList: [
            //     {
            //         label: 'Wechat',
            //         value: '1'
            //     },
            //     {
            //         label: 'Alipay',
            //         value: '2'
            //     },
            //     {
            //         label: 'Bank Transfer',
            //         value: '3',
            //
            //     },
            //     {
            //         label: 'GT Dollar',
            //         value: '4'
            //     },
            //     {
            //         label: 'PayPal',
            //         value: '5'
            //     },
            // ],
            routes: [
                {key: 'first', title: 'Buy'},
                {key: 'second', title: 'Sell'},
            ],

            isShowTradeHall: true,
            isShowPublishPost: false,

            description: '',
            remark: '',
            paymentMethod: '',
            amount: '',
            price: '',
            min_amount: '',

            isCNY: true,
            isUSD: false,
            type: 0,

            buyCoins: [],
            sellCoins: [],

            buyCoinId: '',
            sellCoinId: ''
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
                        remark: resBody.data
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
                        // sellCoins: resBody.data.sell,
                        buyCoinId: resBody.data.buy[0].coin_id,
                        sellCoinId: resBody.data.sell[0].coin_id

                    });
                }
            });

        });

    }

    render() {
        return (
            <View style={[commonStyles.wrapper]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper]}>
                    {/*<Text>otc1</Text>*/}
                    {this.renderTopMenuBar()}
                    {this.renderTradeHallMainView()}

                    {this.state.isShowTradeHall ? this.renderTradeHallFlatLit() : null}
                    {this.state.isShowPublishPost ? this.renderPublishPost() : null}


                </SafeAreaView>
            </View>
        );
    }

//renderTradeHallTabView ScrollView exchangeIcon.png


    renderTradeHallMainView() {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableHighlight
                        style={{flex: 1}}
                        underlayColor='#ddd'
                        onPress={() => this.setState({type: 0})}>
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
                        onPress={() => this.setState({type: 1})}>
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
                            onPress={() => this.setState({isCNY: true, isUSD: false})}>

                            <Text style={{
                                margin: 8,
                                textDecorationLine: this.state.isCNY ? 'underline' : 'none',
                                fontWeight: this.state.isCNY ? 'bold' : 'none',
                                color: this.state.isCNY ? ColorUtil.default_primary_color : ColorUtil.secondary_text_color
                            }}>CNY</Text>

                        </TouchableHighlight>

                        <TouchableHighlight
                            underlayColor='#ddd'
                            onPress={() => this.setState({isCNY: false, isUSD: true})}>

                            <Text style={{
                                margin: 8,
                                textDecorationLine: this.state.isUSD ? 'underline' : 'none',
                                fontWeight: this.state.isUSD ? 'bold' : 'none',
                                color: this.state.isUSD ? ColorUtil.default_primary_color : ColorUtil.secondary_text_color
                            }}>USD</Text>

                        </TouchableHighlight>
                    </View>

                </View>
                <View style={{height: 0.5, backgroundColor: '#d1cfcf'}}/>
                <View style={{height: 10, backgroundColor: '#edeced'}}/>

            </View>
        )
    }

    renderCoins() {
        if(this.state.type === 0) {
            return this.state.buyCoins.map((item) => {
                return (
                    <TouchableHighlight
                        underlayColor='#ddd'
                        onPress={() => this.setState({buyCoinId: item.coin_id})}>

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
                        onPress={() => this.setState({buyCoinId: item.coin_id})}>

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

    renderTradeHallFlatLit() {
        return (
            <View></View>
        )
    }


    renderTradeHallPage() {
        return (
            <View style={[styles.scene, {backgroundColor: '#ff4081'}]}>

                <View style={[styles.scene, {backgroundColor: '#ff4081', flexDirection: 'row'}]}>
                    <Button
                        title={"GTB"}
                        type="outline"
                        containerStyle={[{flex: 1, margin: 5}]}
                        titleStyle={[{fontSize: 12,}]}
                        onPress={() => {

                        }
                        }
                    />
                    <Button
                        title={"BTC"}
                        type="outline"
                        containerStyle={[{flex: 1, margin: 5}]}
                        titleStyle={[{fontSize: 12,}]}
                        onPress={() => {

                        }
                        }
                    />
                    <Button
                        title={I18n.t(Keys.resend)}
                        type="outline"
                        containerStyle={[{flex: 1, margin: 5}]}
                        titleStyle={[{fontSize: 12,}]}
                        onPress={() => {

                        }
                        }
                    />
                    <Button
                        title={"CNY"}
                        type="outline"
                        containerStyle={[{flex: 1, margin: 5}]}
                        titleStyle={[{fontSize: 12,}]}
                        onPress={() => {

                        }
                        }
                    />
                    <Button
                        title={"USD"}
                        type="outline"
                        containerStyle={[{flex: 1, margin: 5}]}
                        titleStyle={[{fontSize: 12,}]}
                        onPress={() => {

                        }
                        }
                    />


                </View>


                {/*<View style={[styles.scene, { backgroundColor: '#ff4081', flexDirection: 'row'}]}>*/}
                {/*<FlatList*/}
                {/*data={this.state.nList}*/}
                {/*keyExtractor={(item, index) => {*/}
                {/*return 'item ' + index;*/}
                {/*}}*/}
                {/*renderItem={({item, index}) => {*/}
                {/*return this.renderItem(1, item, index);*/}
                {/*}}*/}
                {/*ItemSeparatorComponent={() => {*/}
                {/*return <View*/}
                {/*style={[commonStyles.commonIntervalStyle, {height: 1}]}/>;*/}
                {/*}}*/}
                {/*getItemLayout={(data, index) => (*/}
                {/*{length: 110, offset: (110 + 1) * index, index}*/}
                {/*)}*/}
                {/*onScroll={() => {*/}
                {/*}}*/}
                {/*/>*/}
                {/*</View>*/}


            </View>
        );
    }


    renderTradeHallTabView() {
        return (
            <TabView
                navigationState={this.state}
                onIndexChange={index => this.setState({index})}
                renderScene={SceneMap({
                    first: this.renderTradeHallPage,
                    second: this.renderTradeHallPage,
                })}
            />
        );
    }


    renderPublishPostTabView() {
        return (
            <TabView
                navigationState={this.state}
                onIndexChange={index => this.setState({index})}
                renderScene={SceneMap({
                    first: this.renderPublishPost,
                    second: this.renderPublishPost
                })}
            />

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
                    titleStyle={[{fontSize: 12,}]}
                    onPress={() => {
                        this.setState({isShowTradeHall: true, isShowPublishPost: false})
                    }
                    }
                />

                <Button
                    title={"Publish Post"}
                    type="outline"
                    containerStyle={[{flex: 1, margin: 5}]}
                    titleStyle={[{fontSize: 12,}]}
                    onPress={() => {
                        this.setState({isShowTradeHall: false, isShowPublishPost: true})
                    }
                    }
                />

                <Button
                    title={"My Post"}
                    type="outline"
                    containerStyle={[{flex: 1, margin: 5}]}
                    titleStyle={[{fontSize: 12,}]}
                    onPress={() => {

                    }
                    }
                />

                <Button
                    title={"My Order"}
                    type="outline"
                    containerStyle={[{flex: 1, margin: 5}]}
                    titleStyle={[{fontSize: 12,}]}
                    onPress={() => {

                    }
                    }
                />
            </View>
        )
    }

    renderPublishPost() {

        return (
            <ScrollView>
                <View style={{padding: 16, flexDirection: 'row'}}>
                    {/*<Input value={type === 'buy' }*/}
                    {/*placeholder={I18n.t(Keys.Price)}*/}
                    {/*inputContainerStyle={{borderBottomWidth: 0}}*/}
                    {/*containerStyle={[{flex: 9,borderWidth:0}]} keyboardType={'numeric'}/>*/}

                    <View style={{flex: 1}}>
                        <View style={[styles.PriceInput, {height: 40, marginTop: 5, flexDirection: 'row'}]}>
                            <Input
                                onChangeText={value => this.setState({price: value})}
                                placeholder={I18n.t(Keys.Price)}
                                inputContainerStyle={{borderBottomWidth: 0}}
                                containerStyle={[{flex: 9}]} keyboardType={'numeric'}/>
                            <Text style={{
                                flex: 2,
                                lineHeight: 40
                            }}>CNY</Text>

                        </View>

                        <View style={[styles.PriceInput, {height: 40, marginTop: 10, flexDirection: 'row'}]}>
                            <Input
                                onChangeText={value => this.setState({amount: value})}
                                placeholder={I18n.t(Keys.Amount)}
                                inputContainerStyle={{borderBottomWidth: 0}}
                                containerStyle={[{flex: 9}]} keyboardType={'numeric'}/>
                            <Text style={{
                                flex: 2,
                                lineHeight: 40
                            }}>GTB</Text>

                        </View>

                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Text style={{color: ColorUtil.secondary_text_color, flex: 1}}>Balance</Text>
                            <Text style={{color: ColorUtil.secondary_text_color, flex: 1.5}}>150 GTB</Text>
                            <Text style={{
                                color: ColorUtil.secondary_text_color,
                                flex: 1.2,
                                textAlign: 'right'
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
                            placeholder={this.state.remark === '' ? 'Example' : this.state.remark}
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
                        this.createEntrust();
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
                    Toast.show(I18n.t(Keys.save_success))
                }
            });
        });

    }

    createEntrust() {
        let query = {
            type: 0,
            coin_id: 8,
            amount: parseInt(this.state.amount),
            price: parseInt(this.state.price),
            min_amount: parseInt(this.state.min_amount),
            remark: this.state.description,
            secret_remark: this.state.remark,
            methods: this.state.paymentMethod,
        }

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
        const url = "https://www.asiaedx.com/#/doc/newsDetail/";
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

                {/*<View style={{alignItems: 'flex-start', height: 60, marginStart: 20, marginEnd: 20, marginTop: 10}}>*/}

                {/*<Text>*/}
                {/*{item.news_title}*/}
                {/*</Text>*/}

                {/*<Text style={{marginTop: 5}}>*/}
                {/*{item.update_time}*/}
                {/*</Text>*/}
                {/*</View>*/}
            </TouchableHighlight>
        );
    }


    onSelectPayMethod() {

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

