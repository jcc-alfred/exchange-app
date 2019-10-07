import React from 'react';
import {
    FlatList,
    InteractionManager,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { Text } from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";


class AssetsListPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            refreshing: false,
            isRequesting: false,
            data: [],
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: "Assets",
            headerBackTitle: null,
            headerTitleStyle: {
                color: 'white',
                fontSize: 19,
                fontWeight: 'bold'
            },
            headerStyle: {
                backgroundColor: '#0083dc',
                borderBottomWidth: 0,
                elevation: 1,
            },

        };
    };

    static header() {
        return null;
    }

    componentDidMount() {
        this.loadData()
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

    loadData( isInit ) {

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
                    this.props.navigation.navigate( "AssetsDetailPage", {
                        assets: item
                    } )
                }}>
                <View style={[ { height: viewHeight } ]}>
                    <View style={{ flexDirection: "row" }}><Text
                        style={[ { flex: 1 }, styles.cellCoinNameText ]}>{item.coin_name}</Text></View>
                    <View style={{ flexDirection: "row" }}><Text
                        style={[ { flex: 1 }, styles.cellMenuText ]}>{I18n.t( Keys.available )}</Text><Text
                        style={[ { flex: 1 }, styles.cellMenuText ]}>{I18n.t( Keys.frozen )}</Text><Text
                        style={[ { flex: 1 }, styles.cellMenuText ]}>{I18n.t( Keys.balance )}</Text></View>
                    <View style={{ flexDirection: "row" }}><Text style={[ {
                        flex: 1,
                        marginLeft: 10
                    }, styles.cellValueText ]}>{item.balance.toFixed( 2 )}</Text><Text
                        style={[ { flex: 1 }, styles.cellValueText ]}>{item.frozen.toFixed( 2 )}</Text><Text
                        style={[ { flex: 1 }, styles.cellValueText ]}>{item.available.toFixed( 2 )}</Text></View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <View style={[ commonStyles.wrapper, ]}>
                        {this.renderTopBanner()}
                        {this.renderDataList()}
                    </View>
                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }

    renderTopBanner() {
        const BTC_VALUE = this.state.data.length > 0 ? this.state.data.map( i => i.value_BTC ).reduce( ( a, b ) => parseFloat( a ) + parseFloat( b ) ) : 0;
        const USD_VALUE = this.state.data.length > 0 ? this.state.data.map( i => i.value_USD ).reduce( ( a, b ) => parseFloat( a ) + parseFloat( b ) ) : 0;
        return (
            <View style={[ { backgroundColor: "#0083dc" } ]}>
                <View>
                    <Text
                        style={[ styles.smallGrayFont, { marginLeft: 8 } ]}>{I18n.t( Keys.Total_account_assets )} (BTC)</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.bigAssetFont}>{BTC_VALUE.toFixed( 2 )} BTC</Text>
                    <Text style={styles.smallGrayFont}>={USD_VALUE.toFixed( 2 )} USD</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    {/*<Button*/}
                    {/*title={I18n.t(Keys.Punching)}*/}
                    {/*titleStyle={{fontSize: 12}}*/}
                    {/*style={[{margin: 5}]}*/}
                    {/*containerStyle={{flex: 1}}*/}
                    {/*/>*/}
                    {/*<Button*/}
                    {/*titleStyle={{fontSize: 12}}*/}
                    {/*title={I18n.t(Keys.WithDraw)}*/}
                    {/*containerStyle={{flex: 1}}*/}
                    {/*style={[{margin: 5}]}*/}
                    {/*/>*/}
                </View>
            </View>
        )
    }


    renderDataList() {
        const viewHeight = 100;
        const separatorHeight = 1;
        return (
            <View style={[ commonStyles.wrapper, ]}>

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
                    ListHeaderComponent={() => {
                        return AssetsListPageView.header();
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

            </View>

        );
    }
}


const styles = StyleSheet.create( {
    smallGrayFont: {
        color: 'white',
        fontSize: 12,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 16,
        paddingBottom: 8
    },

    bigAssetFont: {
        color: '#ffffff',

        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 8
    },

    scene: {
        flex: 1,
    },


    cellCoinNameText: {
        color: '#292e33',
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 12,
        paddingBottom: 6
    },

    cellMenuText: {
        color: '#7a8a99',
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8
    },

    cellValueText: {
        color: '#292e33',
        fontSize: 14
    },


} );

export default AssetsListPageView;

