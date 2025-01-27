import React from "react";

import { FlatList, TouchableHighlight, View, ViewPropTypes } from "react-native";
import PropTypes from 'prop-types';
import { Text } from "react-native-elements";
import commonStyles from "../styles/commonStyles";
import I18n from "../I18n";
import Keys from "../configs/Keys";
import Util from "../util/Util";

class TradeMenuPairList extends React.Component {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
        data: PropTypes.object.isRequired,
        errorMessage: PropTypes.string,
    };

    constructor( props ) {
        super( props );
    }

    static header() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 25,
                    alignItems: 'center',
                    lineHeight: 20
                }}>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>{I18n.t( Keys.name )}</Text>

                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>{I18n.t( Keys.latest_price )}</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>{I18n.t( Keys.change_rate )}</Text>
                </View>
            </View>
        )
    }

    shouldComponentUpdate( nextProps, nextState, nextContext ) {
        if ( nextProps.data !== this.props.data ) {
            return true
        }
    }

    renderItem( viewHeight, item, index ) {
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                onPress={() => this.props.onPressItem( item )}>

                <View style={{ alignItems: 'center', flexDirection: 'row', height: 50, marginStart: 20 }}>
                    <View
                        style={{ flex: 1, alignContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18 }}>
                            {item.coinEx.coin_name}
                        </Text>
                        <Text style={{ color: '#e8e4dc', fontSize: 18 }}>/{item.coinEx.exchange_coin_name}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={{ color: item.market.change_rate > 0 ? '#04a384' : '#ca4159', fontSize: 16 }}>
                            {item.market.last_price}
                        </Text>
                        <Text style={{ fontSize: 8 }}>
                            ${Util.toMoneyDisplay( item.price_usd )}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }


    render() {
        const separatorHeight = 1;
        const viewHeight = 110;
        return (
            <FlatList
                data={this.props.data && this.props.data.marketList ?
                    this.props.data.marketList.filter( i => i.coinEx.coin_exchange_area_id === this.props.data.coin_exchange_area_id ) : []}
                keyExtractor={( item, index ) => {
                    return 'item ' + index;
                }}
                renderItem={( { item, index } ) => {
                    return this.renderItem( viewHeight, item, index );
                }}
                ItemSeparatorComponent={() => {
                    return <View
                        style={[commonStyles.commonIntervalStyle, { height: separatorHeight }]}/>;
                }}
                getItemLayout={( data, index ) => (
                    { length: viewHeight, offset: ( viewHeight + separatorHeight ) * index, index }
                )}
                onScroll={() => {
                }}
            />
        )
    }
}

export default TradeMenuPairList;