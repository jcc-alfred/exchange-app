import React from 'react';
import {InteractionManager, PixelRatio, SafeAreaView, StatusBar, StyleSheet, View, ScrollView} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import {Text, Button, Input} from "react-native-elements";
import Spinner from "../mine/UserInfoVerifyPageView";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import ColorUtil from "../../util/ColorUtil";

import RadioGroup from 'react-native-radio-buttons-group';


class OTCTradePageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            ]
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
            <View style={[commonStyles.wrapper,]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper,]}>
                    {/*<Text>otc1</Text>*/}
                    {this.renderTopMenuBar()}
                    {this.renderPublishPost()}

                    {/*<Spinner visible={this.state.isRequesting} cancelable={true}/>*/}
                </SafeAreaView>
            </View>
        );
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

                    }
                    }
                />

                <Button
                    title={"Publish Post"}
                    type="outline"
                    containerStyle={[{flex: 1, margin: 5}]}
                    titleStyle={[{fontSize: 12,}]}
                    onPress={() => {
                        this.renderPublishPost()
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
        const radio_props = [
            {label: 'param1', value: 0},
            {label: 'param2', value: 1}
        ];

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
        borderWidth: 1 / PixelRatio.get(),
        color: '#777'
    }
});


export default OTCTradePageView;

