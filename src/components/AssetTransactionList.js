import React from "react";

import {
    FlatList,
    InteractionManager,
    RefreshControl,
    StyleSheet,
    TouchableHighlight,
    View,
    ViewPropTypes
} from "react-native";
import PropTypes from 'prop-types';
import { Button, Text } from "react-native-elements";
import commonStyles from "../styles/commonStyles";
import I18n from "../I18n";
import Keys from "../configs/Keys";
import moment from 'moment'
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import { assetsCancelUserWithdraw } from "../actions/AssetsAction";
import Toast from "react-native-root-toast";

class AssetTransactionList extends React.Component {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
        data: PropTypes.array.isRequired,
        dataType: PropTypes.number,
        errorMessage: PropTypes.string,
    };

    constructor( props ) {
        super( props );

        this.state = {
            isRequesting: false,
            data: props.data
        };
    }

    header() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 25,
                    alignItems: 'center',
                    lineHeight: 20
                }}>

                <View style={[{ flex: 1, alignItems: 'center' }]}>
                    <Text style={[styles.greyCommonFont]}>{I18n.t( Keys.Amount )}</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[styles.greyCommonFont]}>{I18n.t( Keys.status )}</Text>
                </View>

                <View style={{ flex: 2, alignItems: 'center' }}>
                    <Text style={[styles.greyCommonFont]}>{I18n.t( Keys.time )}</Text>
                </View>

                {
                    this.props.dataType === 1 ?
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={[styles.greyCommonFont]}>{I18n.t( Keys.operation )}</Text>
                        </View>
                        :
                        null
                }
            </View>

        );
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.data !== this.props.data ) {
            // language changed
            this.setState( {
                data: nextProps.data
            } )
        }
    }


    shouldComponentUpdate( nextProps, nextState, nextContext ) {
        if ( nextState.data !== this.state.data || nextState.isRequesting !== this.state.isRequesting ) {
            return true
        }
    }

    onAssetsCancelUserWithdraw( item ) {
        this.setState( {
            isRequesting: true
        } );

        InteractionManager.runAfterInteractions( () => {
            this.props.onAssetsCancelUserWithdraw(
                item.user_withdraw_id,
                ( error, resBody ) => {
                    if ( error ) {
                        Toast.show( error.message );

                        this.setState( {
                            isRequesting: false
                        } );
                    } else {
                        Toast.show( I18n.t( Keys.cancel_withdraw_success ) );

                        const newData = this.state.data.slice();

                        for ( let index = 0; index < newData.length; index++ ) {
                            if ( item.user_withdraw_id === newData[ index ].user_withdraw_id ) {
                                item.confirm_status_name = "已取消";
                                item.confirm_status = -1;
                                break;
                            }
                        }

                        this.setState( {
                            isRequesting: false,
                            data: newData
                        } )
                    }
                } );
        } );
    }

    renderItem( viewHeight, item, index ) {
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                onPress={() => this.props.onPressItem( item )}>
                <View>

                    <View style={{ alignItems: 'center', flexDirection: 'row', height: 50 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text>
                                {item.submit_amount ? item.submit_amount : item.trade_amount}
                            </Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text>
                                {item.confirm_status_name}
                            </Text>
                        </View>


                        <View style={{ flex: 2, alignItems: 'center' }}>
                            <Text>
                                {moment( item.create_time ).format( "YYYY-MM-DD HH:mm" )}
                            </Text>
                        </View>
                        {
                            this.props.dataType === 1 ?
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    {
                                        item.confirm_status === 0 ?
                                            <Button
                                                title={I18n.t( Keys.Cancel )}
                                                containerStyle={[{ marginTop: 5, marginBottom: 5 }]}
                                                titleStyle={[{ fontSize: 10, fontWeight: 'bold' }]}
                                                onPress={() => {
                                                    this.onAssetsCancelUserWithdraw( item )
                                                }
                                                }
                                            />
                                            :
                                            null
                                    }
                                </View>
                                :
                                null
                        }
                    </View>
                </View>
            </TouchableHighlight>
        );
    }


    render() {
        const separatorHeight = 1;
        const viewHeight = 50;
        return (
            <View style={[commonStyles.wrapper]}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.refreshing}
                            onRefresh={() => this.props.onRefresh()}
                        />
                    }
                    data={this.state.data}
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
                            style={[commonStyles.commonIntervalStyle, { height: separatorHeight }]}/>;
                    }}
                    getItemLayout={( data, index ) => (
                        { length: viewHeight, offset: ( viewHeight + separatorHeight ) * index, index }
                    )}
                    onScroll={() => {
                    }}
                />
                <Spinner visible={this.state.isRequesting} cancelable={true}/>
            </View>
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


function select( store ) {
    return {}
}

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onAssetsCancelUserWithdraw: ( userWithdrawId, callback ) => {
        dispatch( assetsCancelUserWithdraw( userWithdrawId, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
} );
export default connect( select, mapDispatchToProps )( AssetTransactionList )
