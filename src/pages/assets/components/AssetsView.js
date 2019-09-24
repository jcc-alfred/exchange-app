import React from 'react';
import {
    FlatList,
    InteractionManager,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import commonStyles from "../../../styles/commonStyles";
import { Text } from "react-native-elements";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import { assetsGetUserAssets } from "../../../actions/AssetsAction";

class AssetsView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            refreshing:false,
            isRequesting: false,
            data: []
        }
    }

    componentDidMount() {
        this.loadData(true)
    }

    componentWillUnmount() {
        this.setState = ( state, callback ) => {

        };
    }

    componentWillReceiveProps( nextProps ) {
    }

    shouldComponentUpdate( nextProps, nextState ) {
        return true;
    }

    loadData(isInit) {

        if ( isInit ) {
            this.setState( {
                isRequesting: true
            } );
        } else {
            if ( this.state.refreshing ) {
                return;
            }

            this.setState( {
                refreshing: true,
            } );
        }

        InteractionManager.runAfterInteractions( () => {
            this.props.onAssetsGetUserAssets( ( error, resBody ) => {
                if ( error ) {
                    this.setState( {
                        isRequesting: false,
                        refreshing: false
                    } );

                    Toast.show( error.message );
                } else {
                    this.setState( {
                        isRequesting: false,
                        refreshing: false,
                        data: resBody.data
                    } );
                }
            } );
        } );
    }

    _onRefresh = () => {
        this.loadData( false );
    };



    renderItem( viewHeight, item, index ) {
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                onPress={() => {
                }}>
                <View style={[ { height: viewHeight } ]}>
                    <Text>
                        {
                            JSON.stringify( item )
                        }
                    </Text>
                </View>
            </TouchableHighlight>
        );

    }


    header()
    {
        return null;
    }


    render() {
        const viewHeight = 110;
        const separatorHeight = 1;

        return (
            <View style={[ commonStyles.wrapper, ]}>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        data={this.state.data}
                        keyExtractor={( item, index ) => {
                            return 'item ' + index;
                        }}
                        renderItem={( { item, index } ) => {
                            return this.renderItem( viewHeight, item, index );
                        }}
                        // renderItem={({ item }) => <Item title={item.title} />}
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


                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

function select( store ) {
    return {}
}

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onAssetsGetUserAssets: ( callback ) => {
        dispatch( assetsGetUserAssets( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
} );
export default connect( select, mapDispatchToProps )( AssetsView )

