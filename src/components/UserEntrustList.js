import React from "react";

import {FlatList, InteractionManager, RefreshControl, TouchableHighlight, View, ViewPropTypes} from "react-native";
import PropTypes from 'prop-types';
import {Button, Text} from "react-native-elements";
import commonStyles from "../styles/commonStyles";
import I18n from "../I18n";
import Keys from "../configs/Keys";
import Util from "../util/Util";
import moment from 'moment';
import Toast from "react-native-root-toast";

class UserEntrustList extends React.Component {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
        data: PropTypes.object.isRequired,
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


    render() {
        const separatorHeight = 0;
        const viewHeight = 100;
        return (
            <FlatList
                data={this.props.data ? this.props.data : []}
                keyExtractor={( item, index ) => {
                    return 'item ' + index;
                }}
                renderItem={( { item, index } ) => {
                    return this.renderItem( viewHeight, item, index, this.props.type );
                }}
                // ListHeaderComponent={() => {
                //     return this.header( this.props.type );
                // }}
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

    renderItem( viewHeight, entrust, index, type ) {
        const coinEx = this.props.marketList.find(i=>i.coin_exchange_id === entrust.coin_exchange_id);
        if ( type === 0 ) {
            return (
                <View style={{ height: viewHeight }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[ {
                            flex: 1,
                            color: entrust.entrust_type_id === 0 ? '#e7234c' : '#009d7a',
                            fontSize: 20,
                            paddingLeft: 20,
                            paddingRight: 5,
                            paddingTop: 6,
                            paddingBottom: 6
                        } ]}>{entrust.entrust_type_id === 0 ? I18n.t( Keys.Sell ) : I18n.t( Keys.Buy )}</Text>
                        <Text style={{flex:1.5, paddingTop: 6}}>{coinEx.coinEx.coin_name + '/' + coinEx.coinEx.exchange_coin_name}</Text>
                        <Text
                            style={[ { flex: 4 }, commonStyles.smallGrayFont ]}>{moment( entrust.create_time ).format( 'HH:mm MM/DD' )}</Text>
                        <Button type={'outline'} titleStyle={{ fontSize: 10 }} title={I18n.t( Keys.Cancel )} style={{padding: 5}}
                                onPress={() => this.doCancelEntrust( entrust )}/>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={[ commonStyles.smallGrayFont, { flex: 1 } ]}>{I18n.t( Keys.Price ) + '(' + coinEx.coinEx.exchange_coin_name + ')'}</Text>
                        <Text style={[ commonStyles.smallGrayFont, { flex: 1 } ]}>{I18n.t( Keys.Volume )}</Text>
                        <Text style={[ commonStyles.smallGrayFont, { flex: 1 } ]}>{I18n.t( Keys.Transaction )}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[ commonStyles.smallCommission, { flex: 1 } ]}>{entrust.entrust_price}</Text>
                        <Text style={[ commonStyles.smallCommission, { flex: 1 } ]}>{entrust.entrust_volume}</Text>
                        <Text style={[ commonStyles.smallCommission, { flex: 1 } ]}>{entrust.completed_volume}</Text>
                    </View>
                </View>
            )

        } else {
            return (
                <View style={{ height: viewHeight }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[ {
                            flex: 1,
                            color: entrust.entrust_type_id === 0 ? '#e7234c' : '#009d7a',
                            fontSize: 20,
                            paddingLeft: 20,
                            paddingRight: 5,
                            paddingTop: 6,
                            paddingBottom: 6
                        } ]}>{entrust.entrust_type_id === 0 ? I18n.t( Keys.Sell ) : I18n.t( Keys.Buy )}</Text>
                        <Text style={{flex:2, paddingTop: 6}}>{coinEx.coinEx.coin_name + '/' + coinEx.coinEx.exchange_coin_name}</Text>
                        <Text
                            style={[ { flex: 4 }, commonStyles.smallGrayFont ]}>{moment( entrust.create_time ).format( 'HH:mm MM/DD' )}</Text>
                        <Text style={[ { flex: 2 }, commonStyles.smallGrayFont ]}>{I18n.t( Keys.completed )}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={[ commonStyles.smallGrayFont, { flex: 1 } ]}>{I18n.t( Keys.Price ) + '(' +  coinEx.coinEx.exchange_coin_name + ')'}</Text>
                        <Text style={[ commonStyles.smallGrayFont, { flex: 1 } ]}>{I18n.t( Keys.Volume )}</Text>
                        <Text style={[ commonStyles.smallGrayFont, { flex: 1 } ]}>{I18n.t( Keys.Transaction )}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[ commonStyles.smallCommission, { flex: 1 } ]}>{entrust.entrust_price}</Text>
                        <Text style={[ commonStyles.smallCommission, { flex: 1 } ]}>{entrust.entrust_volume}</Text>
                        <Text style={[ commonStyles.smallCommission, { flex: 1 } ]}>{entrust.completed_volume}</Text>
                    </View>
                </View>
            )

        }

    }

    doCancelEntrust(entrust) {
        InteractionManager.runAfterInteractions(() => {
            this.props.onExchangeDoCancelEntrust({
                "entrustId": entrust.entrust_id,
                "coinExchangeId": entrust.coin_exchange_id,
                "entrustTypeId": entrust.entrust_type_id,
                "user_id": this.props.userInfo.user_id
            }, (err, res) => {
                if (!err) {
                    Toast.show("entrust canceled");
                    let tmp = this.props.userEntrustList;
                    tmp = tmp.filter(i => i.entrust_id !== entrust.entrust_id);
                    this.props.deleteItem(entrust.entrust_id);
                } else {
                    Toast.show(err.message)
                }
            })
        })
    }


}

export default UserEntrustList;