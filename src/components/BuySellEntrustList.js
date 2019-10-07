import React from "react";

import {FlatList, PixelRatio, RefreshControl, StyleSheet, TouchableHighlight, View, ViewPropTypes} from "react-native";
import PropTypes from 'prop-types';
import {Divider, Text} from "react-native-elements";
import commonStyles from "../styles/commonStyles";
import constStyles from "../styles/constStyles";
import I18n from "../I18n";
import Keys from "../configs/Keys";
// import Util from "../util/Util";
import moment from 'moment'
import Util from "../util/Util";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

class BuySellEntrustList extends React.Component {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
        data: PropTypes.array.isRequired,
        errorMessage: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.data !== this.props.data) {
            return true
        }
    }

    header(type) {
        if (type.toLowerCase() == 'depth') {
            return (
                <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 12}}>
                    <Text style={{flex: 1, color: '#9c9a97'}}>
                        {I18n.t(Keys.buyAmount)}
                    </Text>
                    <Text style={{flex: 1, textAlign: 'center', color: '#9c9a97'}}>
                        {I18n.t(Keys.Price)}
                    </Text>
                    <Text style={{flex: 1, textAlign: 'right', color: '#9c9a97'}}>
                        {I18n.t(Keys.sellAmount)}
                    </Text>
                </View>
            )
        }
        return (
            <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 12}}>
                <Text style={{flex: 1, color: '#9c9a97'}}>
                    {I18n.t(Keys.date)}
                </Text>
                <Text style={{flex: 1, color: '#9c9a97'}}>
                    {I18n.t(Keys.type)}
                </Text>
                <Text style={{flex: 1, color: '#9c9a97'}}>
                    {I18n.t(Keys.Price)}
                </Text>
                <Text style={{flex: 1, color: '#9c9a97'}}>
                    {I18n.t(Keys.Amount)}
                </Text>
            </View>
        )
    }

    renderItem(viewHeight, item, index, type) {
        if (type.toLowerCase() === 'depth') {
            let entrustList = item;
            let buyEntrust = entrustList[0];
            let sellEntrust = entrustList[1];
            return (
                <View style={{flexDirection: 'row', height: viewHeight}}>
                    <View
                        style={[{
                            flexDirection: 'row',
                            flex: 1,
                            backgroundColor: '#f0f7f5'
                            // backgroundColor: constStyles.THEME_COLOR
                        }]}>
                        {
                            buyEntrust !== {} && (
                                <View style={{flexDirection: 'row', flex: 1}}>
                                    <View style={[styles.overlay, {
                                        backgroundColor: constStyles.THEME_COLOR,
                                        width: Util.calcDisplayDiscount(1 - buyEntrust.no_completed_volume / buyEntrust.entrust_volume)
                                    }]}/>
                                    <Text style={[{flex: 1, fontSize: 8, color: '#9c9a97'}]}>{index}</Text>
                                    <Text style={[{
                                        flex: 1,
                                        fontSize: 8,
                                        color: '#9c9a97'
                                    }]}>{buyEntrust.no_completed_volume ? buyEntrust.no_completed_volume : null}</Text>
                                    <Text
                                        style={[{
                                            flex: 1,
                                            fontSize: 8,
                                            color: '#009d7a'
                                        }]}>{buyEntrust.entrust_price ? buyEntrust.entrust_price.toFixed(8) : null}</Text>
                                </View>
                            )
                        }
                    </View>
                    <View
                        style={[{
                            flexDirection: 'row',
                            flex: 1,
                            backgroundColor: constStyles.THEME_COLOR
                        }]}>
                        {
                            sellEntrust !== {} && (
                                <View style={{flexDirection: 'row', flex: 1}}>
                                    <View style={[styles.overlay, {
                                        backgroundColor: '#faf2f0',
                                        width: Util.calcDisplayDiscount(sellEntrust.no_completed_volume / sellEntrust.entrust_volume)
                                    }]}/>
                                    <Text
                                        style={[{
                                            flex: 1,
                                            fontSize: 8,
                                            color: '#e7234c'
                                        }]}>{sellEntrust.entrust_price ? sellEntrust.entrust_price.toFixed(8) : null}</Text>
                                    <Text style={[{
                                        flex: 1,
                                        fontSize: 8,
                                        color: '#9c9a97'
                                    }]}>{sellEntrust.no_completed_volume ? sellEntrust.no_completed_volume : null}</Text>

                                    <Text style={[{flex: 1, fontSize: 8, color: '#9c9a97'}]}>{index}</Text>
                                </View>

                            )
                        }

                    </View>
                </View>
            )
        } else {
            let order = item;
            return (
                <View style={{flexDirection: 'row', height: viewHeight}}>
                    <Text
                        style={{
                            flex: 1,
                            color: 'white'
                        }}>{order.create_time ? moment(order.create_time).format("HH:mm:ss") : ''}</Text>
                    <Text style={{
                        flex: 1,
                        color: order.trigger_type_id === 0 ? 'red' : 'green'
                    }}>{order.trigger_type_id === 0 ? I18n.t(Keys.Sell) : I18n.t(Keys.Buy)}</Text>
                    <Text style={{flex: 1, color: 'white'}}>{order.trade_price}</Text>
                    <Text style={{flex: 1, color: 'white'}}>{order.trade_volume}</Text>
                </View>
            )
        }
    }


    render() {
        const separatorHeight = 0;
        const viewHeight = 20;
        return (
            <FlatList
                data={this.props.data ? this.props.data : []}
                keyExtractor={(item, index) => {
                    return 'item ' + index;
                }}
                renderItem={({item, index}) => {
                    return this.renderItem(viewHeight, item, index, this.props.type);
                }}
                ListHeaderComponent={() => {
                    return this.header(this.props.type);
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
        zIndex: -1,
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

export default BuySellEntrustList;