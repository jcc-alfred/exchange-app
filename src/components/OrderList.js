import React from "react";

import { FlatList, PixelRatio, StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from 'prop-types';
import { Text } from "react-native-elements";
import commonStyles from "../styles/commonStyles";
import I18n from "../I18n";
import Keys from "../configs/Keys";
import moment from 'moment'

class BuySellEntrustList extends React.Component {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
        data: PropTypes.array.isRequired,
        errorMessage: PropTypes.string,
    };

    constructor( props ) {
        super( props );
    }

    static header() {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 12 }}>
                <Text style={{ flex: 1, color: '#9c9a97' }}>
                    {I18n.t( Keys.date )}
                </Text>
                <Text style={{ flex: 1, textAlign: 'center', color: '#9c9a97' }}>
                    {I18n.t( Keys.type )}
                </Text>
                <Text style={{ flex: 1, textAlign: 'center', color: '#9c9a97' }}>
                    {I18n.t( Keys.Price )}
                </Text>
                <Text style={{ flex: 1, textAlign: 'right', color: '#9c9a97' }}>
                    {I18n.t( Keys.Amount )}
                </Text>
            </View>
        )
    }

    static renderItem( viewHeight, order, index ) {
        return (
            <View style={{ flexDirection: 'row', height: viewHeight }}>
                <Text
                    style={{ flex: 1 }}>{order.create_time ? moment( order.create_time ).format( "HH-mm-ss" ) : ''}</Text>
                <Text style={{
                    flex: 1,
                    color: order.trigger_type_id === 0 ? 'red' : 'green'
                }}>{order.trigger_type_id === 0 ? I18n.t( Keys.Sell ) : I18n.t( Keys.Buy )}</Text>
                <Text style={{ flex: 1 }}>{order.trade_price}</Text>
                <Text style={{ flex: 1 }}>{order.trade_volume}</Text>
            </View>
        )
    }

    shouldComponentUpdate( nextProps, nextState, nextContext ) {
        if ( nextProps.data !== this.props.data ) {
            return true
        }
    }

    render() {
        const separatorHeight = 1;
        const viewHeight = 15;
        return (
            <FlatList
                data={this.props.data ? this.props.data : []}
                keyExtractor={( item, index ) => {
                    return 'item ' + index;
                }}
                renderItem={( { item, index } ) => {
                    return BuySellEntrustList.renderItem( viewHeight, item, index );
                }}
                ListHeaderComponent={() => {
                    return BuySellEntrustList.header();
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

const styles = StyleSheet.create( {
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


    smallIconButton: {},


    data: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#ddd',
        borderColor: '#888',
        borderWidth: 1 / PixelRatio.get(),
        color: '#777'
    }
} );

export default BuySellEntrustList;