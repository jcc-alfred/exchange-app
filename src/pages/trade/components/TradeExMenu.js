import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { DrawerActions } from 'react-navigation-drawer';
import { SearchBar } from "react-native-elements";
import commonStyles from "../../../styles/commonStyles";
import { changeTradePageCoinExchange } from "../../../actions/ExchangeAction";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import TradeMenuPairList from "../../../components/TradeMenuPairList";
import Spinner from "react-native-loading-spinner-overlay";
import constStyles from "../../../styles/constStyles";
import I18n from '../../../I18n';
import Keys from "../../../configs/Keys";

class TradeExMenu extends React.Component {

    constructor( props ) {
        super( props );
        const { index, routes, scenes } = this.initTabData( this.props.coin_exchange_area );
        this.state = {
            index: index ? index : 0,
            routes: routes ? routes : [],
            scenes: scenes ? scenes : [],
            search: '',
            marketList: this.props.marketList
        }

    }

    componentWillMount() {

    }

    componentWillUnmount() {
        this.setState = ( state, callback ) => {
        };
    }

    componentWillReceiveProps( nextProps ) {

    }

    shouldComponentUpdate( nextProps, nextState ) {
        if ( this.props.coin_exchange_area !== nextProps.coin_exchange_area || nextProps.marketList !== this.props.marketList || nextState.search !== this.state.search ) {
            const { index, routes, scenes } = this.initTabData( nextProps.coin_exchange_area );
            this.setState( {
                routes: routes,
                scenes: scenes
            } )
        }

        return true;
    }

    updateSearch = ( search ) => {
        this.setState( { search: search } );
    };

    filterSearch = ( search, marketList ) => {
        const current_coin_exchange_area_id = this.props.coin_exchange_area[ this.state.index ].coin_exchange_area_id;
        if ( search !== '' ) {
            return marketList.filter( function ( item ) {
                //applying filter for the inserted text in search bar
                return !( item.coinEx.coin_exchange_area_id !== current_coin_exchange_area_id || item.coinEx.coin_name.toUpperCase().indexOf( search.toUpperCase() ) < 0 );
            } )
        } else {
            return marketList
        }


    };

    render() {
        const { search } = this.state;

        return (
            <View style={commonStyles.wrapper}>
                <SafeAreaView style={[ commonStyles.wrapper ]}>
                    <SearchBar
                        placeholder={I18n.t(Keys.SearchCoin)+"..."}
                        onChangeText={this.updateSearch}
                        platform={"default"}
                        lightTheme={true}
                        value={search}
                    />
                    {this.exchangeAreaTabs()}

                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );


    }

    initTabData( tabData ) {
        const routes = [];
        const scenes = [];
        if ( tabData ) {
            for ( let index = 0; index < tabData.length; index++ ) {
                routes.push( {
                    key: '' + index,
                    title: tabData[ index ].coin_exchange_area_name
                } );
                scenes [ '' + index ] = () => {
                    return (
                        <TradeMenuPairList
                            data={{
                                marketList: this.filterSearch( this.state.search, this.props.marketList ),
                                coin_exchange_area_id: tabData[ index ].coin_exchange_area_id
                            }}
                            onPressItem={this.onPressItem.bind( this )}/>
                    );
                };
            }
        } else {
            routes.push( { key: 0, title: "loading" } );
            scenes.push( <View/> )
        }


        return {
            index: 0,
            routes: routes,
            scenes: scenes
        }
    }


    exchangeAreaTabs() {
        if ( this.state.scenes && this.state.scenes.length > 0 ) {
            return (
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap( this.state.scenes )}
                    onIndexChange={index => this.setState( { index } )}
                    initialLayout={{ width: Dimensions.get( 'window' ).width }}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: constStyles.THEME_COLOR }}
                            inactiveColor={'#888'}
                            activeColor={ constStyles.THEME_COLOR}
                            style={{ backgroundColor: 'white', flexDirection: 'row' }}
                            tabStyle={{ width: 'auto' }}
                            scrollEnabled={true}
                        />
                    }
                    lazy={true}
                />
            );
        } else {
            return null;
        }
    }

    onPressItem( coin_exchange ) {
        this.props.onChangeTradePageCoinExchange( coin_exchange );
        this.props.navigation.dispatch( DrawerActions.closeDrawer() )

    }


}

const styles = StyleSheet.create( {} );

function select( store ) {
    return {
        TradePageCoinEx: store.metaStore.TradePageCoinEx,
        marketList: store.metaStore.marketList,
        coin_exchange_area: store.metaStore.coin_exchange_area,
    }
}


const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onChangeTradePageCoinExchange: ( coinEx ) => {
        dispatch( changeTradePageCoinExchange( coinEx ) );
    },
} );
export default connect( select, mapDispatchToProps )( TradeExMenu )
