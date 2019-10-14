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
import {Text, Button, Input,Image} from "react-native-elements";

import Spinner from "../mine/UserInfoVerifyPageView";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import ColorUtil from "../../util/ColorUtil";
import RadioGroup from 'react-native-radio-buttons-group';

const SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]}/>
);


class OTCTradePageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,

            nList: [],

            isRequesting: false,
            paymentMethod: [
                {
                    label: 'Wechat',
                    color: ColorUtil.default_primary_color,
                    size: 20
                },
                {
                    label: 'Alipay',
                    color: ColorUtil.default_primary_color,
                    size: 20
                },
                {
                    label: 'Bank Transfer',
                    color: ColorUtil.default_primary_color,
                    size: 20
                },
                {
                    label: 'GT Dollar',
                    color: ColorUtil.default_primary_color,
                    size: 20
                },
                {
                    label: 'PayPal',
                    color: ColorUtil.default_primary_color,
                    size: 20
                },
            ],
            routes: [
                {key: 'first', title: 'Buy'},
                {key: 'second', title: 'Sell'},
            ],

            isShowTradeHall: true,
            isShowPublishPost: false
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
        OTCTradePageView.loadData()
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


    render() {
        return (
            <View style={[commonStyles.wrapper]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper]}>
                    {/*<Text>otc1</Text>*/}
                    {this.renderTopMenuBar()}


                    {this.state.isShowTradeHall ? this.renderTradeHallMainView() : null}
                    {this.state.isShowPublishPost ? this.renderPublishPost() : null}


                </SafeAreaView>
            </View>
        );
    }

//renderTradeHallTabView ScrollView exchangeIcon.png


    renderTradeHallMainView(){
        return (
            <View>
                <View style={{flexDirection:'row'}}>
                <Text style={{flex:1, textAlign:'right', marginTop:5, marginBottom:5, marginRight:10, fontWeight:'bold'} }>Buy</Text>
                <Text style={{flex:1, marginTop:5, marginBottom:5, marginLeft:10}}>Sell</Text>
                </View>
                <View style={{height:0.5,backgroundColor:'#d1cfcf'}}/>

                <View style={{flexDirection:'row'}}>
                    <ScrollView  horizontal={'true'} style={{flex:6,flexDirection:'row'}}>
                        <Text style={{margin:8}}>111</Text>
                        <Text style={{margin:8}}>222</Text>
                        <Text style={{margin:8}}>333</Text>
                        <Text style={{margin:8}}>111</Text>
                        <Text style={{margin:8}}>222</Text>
                        <Text style={{margin:8}}>333</Text>
                        <Text style={{margin:8}}>111</Text>
                        <Text style={{margin:8}}>222</Text>
                        <Text style={{margin:8}}>333</Text>
                    </ScrollView>

                    <TouchableHighlight underlayColor='#ddd' >
                        <View>
                            <Image source={require('../../../assets/images/exchangeIcon.png')}
                                   containerStyle={[{width: 30, height: 30}]}/>
                        </View>
                    </TouchableHighlight>


                    <ScrollView  horizontal={'true'} style={{flex:6}}>
                        <Text style={{margin:8}}>111</Text>
                        <Text style={{margin:8}}>222</Text>
                        <Text style={{margin:8}}>333</Text>
                        <Text style={{margin:8}}>111</Text>
                        <Text style={{margin:8}}>222</Text>
                        <Text style={{margin:8}}>333</Text>
                        <Text style={{margin:8}}>111</Text>
                        <Text style={{margin:8}}>222</Text>
                        <Text style={{margin:8}}>333</Text>
                    </ScrollView>
                </View>
                <View style={{height:0.5,backgroundColor:'#d1cfcf'}}/>
                <View style={{height:10,backgroundColor:'#edeced'}}/>

            </View>
        )
    }



    renderTradeHallFlatLit(){
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
                                onChangeText={value => this.changeState(value, type === 'buy' ? 'buyVolume' : 'sellVolume')}
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
                                onChangeText={value => this.changeState(value, type === 'buy' ? 'buyVolume' : 'sellVolume')}
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
                                onChangeText={value => this.changeState(value, type === 'buy' ? 'buyVolume' : 'sellVolume')}
                                placeholder={'Limitation'}
                                inputContainerStyle={{borderBottomWidth: 0}}
                                containerStyle={[{flex: 9}]} keyboardType={'numeric'}/>
                        </View>

                    </View>

                    <View style={{flex: 0.5, marginStart: 20}}>
                        <RadioGroup radioButtons={this.state.paymentMethod} onPress={this.onSelectPayMethod}/>
                    </View>


                </View>

                <View style={{height: 1, width: '100%', backgroundColor: styles.data.backgroundColor}}></View>

                <View style={{padding: 16}}>
                    <Text>Trade Description (Open To Everyone)</Text>

                    <View style={[styles.PriceInput, {height: 200, marginTop: 10, flexDirection: 'row'}]}>
                        <Input
                            onChangeText={value => this.changeState(value, type === 'buy' ? 'buyVolume' : 'sellVolume')}
                            placeholder={'Example'}
                            inputContainerStyle={{borderBottomWidth: 0}}
                            containerStyle={[{flex: 9}]} keyboardType={'numeric'}/>
                    </View>

                </View>

                <View style={{height: 1, width: '100%', backgroundColor: styles.data.backgroundColor}}></View>

                <View style={{padding: 16}}>
                    <Text>Trade Remark (Open To User Create Order)</Text>

                    <View style={[styles.PriceInput, {height: 200, marginTop: 10, flexDirection: 'row'}]}>
                        <Input
                            onChangeText={value => this.changeState(value, type === 'buy' ? 'buyVolume' : 'sellVolume')}
                            placeholder={'Example'}
                            inputContainerStyle={{borderBottomWidth: 0}}
                            containerStyle={[{flex: 9}]} keyboardType={'numeric'}/>
                    </View>

                </View>

            </ScrollView>

        )

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

