import React from "react";

import { FlatList, StyleSheet, TouchableHighlight, View, ViewPropTypes } from "react-native";
import PropTypes from 'prop-types';
import { Text } from "react-native-elements";
import commonStyles from "../styles/commonStyles";
import I18n from "../I18n";
import Keys from "../configs/Keys";
// import Util from "../util/Util";
import moment from 'moment'

class AssetTransactionList extends React.Component {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
        data: PropTypes.array.isRequired,
        errorMessage: PropTypes.string,
    };

    constructor( props ) {
        super( props );
    }

    shouldComponentUpdate( nextProps, nextState, nextContext ) {
        if ( nextProps.data !== this.props.data ) {
            return true
        }
    }

    header() {
        return null
    }


    renderItem( viewHeight, item, index ) {
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                onPress={() => this.props.onPressItem( item )}>
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            height: 25,
                            alignItems: 'center',
                            lineHeight: 20
                        }}>

                        <View style={[ { flex: 1, alignItems: 'center' } ]}>
                            <Text style={[ styles.greyCommonFont ]}>{I18n.t( Keys.Amount )}</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={[ styles.greyCommonFont ]}>{I18n.t( Keys.status )}</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={[ styles.greyCommonFont ]}>{I18n.t( Keys.time )}</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', flexDirection: 'row', height: 50, marginStart: 40 }}>
                        <View style={{ flex: 1 }}>
                            <Text>
                                {item.submit_amount ? item.submit_amount : item.trade_amount}
                            </Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text>
                                {item.confirm_status_name}
                            </Text>
                        </View>


                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text>
                                {moment( item.create_time ).format( "YYYY-MM-DD HH:mm" )}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }


    render() {
        const separatorHeight = 1;
        const viewHeight = 75;
        return (
            <FlatList
                data={this.props.data}
                keyExtractor={( item, index ) => {
                    return 'item ' + index;
                }}
                renderItem={( { item, index } ) => {
                    return this.renderItem( viewHeight, item, index );
                }}
                ListHeaderComponent={() => {
                    return this.header();
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
    CoinName: {
        fontSize: 24,
        color: '#006bce',
        fontWeight: 'bold'
    },
    greyCommonFont: {
        color: '#cad5db'
    }

} );

export default AssetTransactionList;