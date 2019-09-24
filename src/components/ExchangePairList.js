import React from "react";

import {FlatList, RefreshControl, StyleSheet, TouchableHighlight, View, ViewPropTypes} from "react-native";
import PropTypes from 'prop-types';
import { Divider, Text } from "react-native-elements";
import commonStyles from "../styles/commonStyles";
import constStyles from "../styles/constStyles";
import I18n from "../I18n";
import Keys from "../configs/Keys";

class ExchangePairList extends React.Component {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
        data: PropTypes.array.isRequired,
        errorMessage: PropTypes.string,
    };

    constructor( props ) {
        super( props );
    }

    header() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 20,
                    alignItems: 'center'
                }}>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text>{I18n.t(Keys.name)}</Text>

                </View>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text>{I18n.t(Keys.latest_price)}</Text>
                </View>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text>{I18n.t(Keys.changerate)}</Text>
                </View>
            </View>
        )
    }


    renderItem(viewHeight, item, index) {
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                onPress={this.props.onPressItem}>

                <View style={{alignItems: 'center', flexDirection: 'row', height: 50, marginStart: 40}}>

                    <Text style={{flex: 1}}>
                        {item.coinEx.coin_name}/{item.coinEx.exchange_coin_name}
                    </Text>

                    <Text style={{flex: 1}}>
                        {item.market.last_price}
                    </Text>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{color: item.market.change_rate > 0 ? 'green' : 'red'}}>
                            {(item.market.change_rate * 100).toFixed(2)}%
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }


    render() {
        const separatorHeight = 1;
        const viewHeight = 110;
        return(
            <FlatList
                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.state.refreshing}
                //         onRefresh={this.onRefresh.bind(this)}
                //     />
                // }
                data={this.props.data}
                keyExtractor={(item, index) => {
                    return 'item ' + index;
                }}
                renderItem={({item, index}) => {
                    return this.renderItem(viewHeight, item, index);
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
        )
    }
}

export default ExchangePairList;