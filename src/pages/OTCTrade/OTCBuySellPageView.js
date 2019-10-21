import React from "react";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import {SafeAreaView, StatusBar, View, Text, StyleSheet, ScrollView} from "react-native";
import commonStyles from "../../styles/commonStyles";
import {Button, Input} from "react-native-elements";
import OTCTradePageView from "./OTCTradePageView";
import ColorUtil from "../../util/ColorUtil";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import Toast from "react-native-root-toast";

class OTCBuySellPageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: props.navigation.state.params.orderInfo,
            type: props.navigation.state.params.type,
            payableAmount: 0,
            total: ''
        }
    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;

        return {};
    };

    componentDidMount() {
        // this.loadData()
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
            <ScrollView>
                <View style={[commonStyles.wrapper]}>
                    <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                    <View style={{padding: 16}}>
                        <Text>
                            {I18n.t(Keys.trade_des)}
                        </Text>
                        <Text>
                            {this.state.orderInfo.remark}
                        </Text>
                    </View>

                    <View style={{height: 10, backgroundColor: '#d1cfcf'}}/>

                    <View style={{flexDirection: 'row', padding: 16}}>
                        <Text style={{flex: 1}}>{this.state.type === 0 ? I18n.t(Keys.buy_amount) : I18n.t(Keys.sell_amount)}</Text>
                        <Text style={{flex: 1, marginStart: 20}}>{I18n.t(Keys.payable_amount)}</Text>
                    </View>

                    <View style={{flexDirection: 'row', padding: 16}}>
                        <View style={[styles.PriceInput, {flex: 1, height: 40, flexDirection: 'row'}]}>
                            <Input
                                onChangeText={value => this.setTradeAmount(value)}
                                value={this.state.total}
                                placeholder={I18n.t(Keys.Amount)}
                                inputContainerStyle={{borderBottomWidth: 0}}
                                containerStyle={[{flex: 9}]} keyboardType={'numeric'}/>
                            <Text style={{
                                flex: 2,
                                lineHeight: 40,
                            }}>{this.state.orderInfo.coin_name}</Text>

                        </View>


                        <View style={{flex: 1, marginStart: 20, alignContent: 'center', justifyContent: 'center'}}>
                            <Text>{this.state.payableAmount.toFixed(2) + ' ' + this.state.orderInfo.currency}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', padding: 16}}>
                        <Text style={{flex: 1, color: ColorUtil.secondary_text_color}}>{I18n.t(Keys.remain_amount)}</Text>
                        <Text style={{flex: 1, color: ColorUtil.secondary_text_color}}>{I18n.t(Keys.unit_price)}</Text>
                        <Text style={{flex: 1, color: ColorUtil.secondary_text_color}}>{I18n.t(Keys.limitation)}</Text>
                    </View>

                    <View style={{flexDirection: 'row', padding: 16}}>
                        <Text
                            style={{flex: 1}}>{this.state.orderInfo.remaining_amount + ' ' + this.state.orderInfo.coin_name}</Text>
                        <Text
                            style={{flex: 1}}>{this.state.orderInfo.price + ' ' + this.state.orderInfo.currency}</Text>
                        <Text
                            style={{flex: 1}}>{this.state.orderInfo.price} ~ {(this.state.orderInfo.price * this.state.orderInfo.remaining_amount).toFixed(2) + ' ' + this.state.orderInfo.currency}</Text>
                    </View>

                    <View style={{flexDirection: 'row', padding: 16}}>
                        <Text style={{flex: 1, color: ColorUtil.secondary_text_color}}>{I18n.t(Keys.payment_method)}</Text>
                        <Text style={{flex: 1, color: ColorUtil.secondary_text_color}}>{I18n.t(Keys.payment_duration)}</Text>
                        <Text style={{flex: 1, color: ColorUtil.secondary_text_color}}>{I18n.t(Keys.status)}</Text>
                    </View>

                    <View style={{flexDirection: 'row', padding: 16}}>
                        <Text style={{flex: 1}}></Text>
                        <Text style={{flex: 1}}>15 min</Text>
                        <Text style={{flex: 1}}>{I18n.t(Keys.active)}</Text>
                    </View>

                    <Button
                        style={{margin: 16, height: 40}}
                        buttonStyle={{backgroundColor: ColorUtil.default_primary_color}}
                        title={this.state.type === 0 ? I18n.t(Keys.confirm_buy) : I18n.t(Keys.confirm_sell)}
                        titleStyle={{fontSize: 14}}
                        type="solid"
                        onPress={() => {
                            if (this.props.isLoggedIn) {
                                this.orderCreate();
                            } else {
                                this.props.navigation.navigate("AuthLoginPage")
                            }

                        }
                        }
                        containerStyle={[commonStyles.mgt_normal]}
                    />


                </View>
            </ScrollView>
        );
    }

    orderCreate() {
        this.props.onOTCOrderCreate(this.state.orderInfo.id, this.state.payableAmount, (error, resBody) => {
            if (error) {
                this.setState({
                    isRequesting: false
                });

                Toast.show(error.message);
            } else {
                Toast.show(I18n.t(Keys.order_created))

            }
        });

    }

    setTradeAmount(value) {
        if(value > this.state.orderInfo.remaining_amount) {
            this.setState({payableAmount: this.state.orderInfo.remaining_amount * this.state.orderInfo.price, total : this.state.orderInfo.remaining_amount})
        } else {
            this.setState({payableAmount: value * this.state.orderInfo.price, total: value})
        }
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

export default OTCBuySellPageView;