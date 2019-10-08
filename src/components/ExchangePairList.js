import React from "react";

import { FlatList, RefreshControl, TouchableHighlight, View, ViewPropTypes } from "react-native";
import PropTypes from 'prop-types';
import { Text } from "react-native-elements";
import commonStyles from "../styles/commonStyles";
import I18n from "../I18n";
import Keys from "../configs/Keys";
import Util from "../util/Util";

class ExchangePairList extends React.Component {
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
                    lineHeight: 20,
                    marginLeft:5
                }}>

                <View style={{ flex: 1, }}>
                    <Text style={{textAlign: 'left' }}>{I18n.t( Keys.name )}</Text>
                </View>

                <View style={{ flex: 1}}>
                    <Text >{I18n.t( Keys.latest_price )}</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>{I18n.t( Keys.changerate )}</Text>
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

                <View style={{ alignItems: 'center', flexDirection: 'row', height: viewHeight,marginLeft:5}}>
                    <View style={{ flex: 1 }}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold',fontSize:16}}>
                                {item.coinEx.coin_name}
                            </Text>
                            <Text style={{color:'#e8e4dc',fontSize:16}}>/{item.coinEx.exchange_coin_name}</Text>
                        </View>
                        <Text style={{ color:'#696965',fontSize: 12,marginTop:3}}>
                            24{I18n.t( Keys.vol )} {Util.toVolumeDisplay( item.market.total_volume)}
                        </Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={{fontWeight:'bold',fontSize:16}}>
                            {item.market.last_price}
                        </Text>
                        <Text style={{ color:'#696965',fontSize: 12,marginTop:3}}>
                            ${Util.toMoneyDisplay( item.price_usd )}
                        </Text>
                    </View>


                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{
                            backgroundColor: item.market.change_rate > 0 ? 'green' : 'red',
                            width: '60%',
                            alignItems: 'center',
                        }}>
                            <Text style={{ color: 'white' ,fontWeight:'bold',lineHeight:28,fontSize:16}}>
                                {Util.numToPercentage( item.market.change_rate )}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }


    render() {
        const separatorHeight = 1;
        const viewHeight = 60;
        return (
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.refreshing}
                        onRefresh={() => this.props.onRefresh()}
                    />
                }
                data={this.props.data && this.props.data.marketList ?
                    this.props.data.marketList.filter( i => i.coinEx.coin_exchange_area_id === this.props.data.coin_exchange_area_id ) : []}
                keyExtractor={( item, index ) => {
                    return 'item ' + index;
                }}
                renderItem={( { item, index } ) => {
                    return this.renderItem( viewHeight, item, index );
                }}
                ListHeaderComponent={() => {
                    return ExchangePairList.header();
                }}
                ItemSeparatorComponent={() => {
                    return <View
                        style={[ commonStyles.commonIntervalStyle, { height: separatorHeight } ]}/>;
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

export default ExchangePairList;