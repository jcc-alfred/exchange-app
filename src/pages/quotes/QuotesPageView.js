import React from 'react';
import { Dimensions, InteractionManager, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";

import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import { DrawerActions } from 'react-navigation-drawer';
import ExchangePairList from "../../components/ExchangePairList";

class QuotesPageView extends React.Component {
    constructor( props ) {
        super( props );
        const { index, routes, scenes } = this.initTabData( this.props.coin_exchange_area );
        const { navigation } = props;
        this.state = {
            isRequesting: false,
            refreshing: false,
            index: index ? index : 0,
            routes: routes ? routes : [],
            scenes: scenes ? scenes : [],
            updateDialogVisible: false
        }

    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.quotes ),
            headerBackTitle: null,
        };
    };

    componentDidMount() {
        this.loadData( true );
    }

    componentWillUnmount() {
        this.setState = ( state, callback ) => {

        };
    }

    componentWillReceiveProps( nextProps ) {
    }

    shouldComponentUpdate( nextProps, nextState ) {
        if ( this.props.coin_exchange_area !== nextProps.coin_exchange_area || nextProps.marketList !== this.props.marketList ) {
            const { index, routes, scenes } = this.initTabData( nextProps.coin_exchange_area );
            this.setState( {
                // index: index,
                routes: routes,
                scenes: scenes
            } )
        }

        return true;
    }


    loadData() {
        this.setState( {
            isRequesting: true
        } );

        InteractionManager.runAfterInteractions( () => {
            this.props.onExchangeGetCoinExchangeArea( ( error, resBody ) => {
                if ( error ) {
                    this.setState( {
                        isRequesting: false,
                    } );
                    Toast.show( error.message );
                } else {
                    this.props.onExchangeGetMarketList( ( error1, resBody1 ) => {
                        if ( error1 ) {
                            this.setState( {
                                isRequesting: false,
                            } );
                            Toast.show( error1.message );
                        } else {
                            this.setState( {
                                isRequesting: false,
                            } );
                        }
                    } );
                }
            } );
        } );
    }


    onPressItem( coin_exchange ) {
        this.props.navigation.navigate( 'KlinePage', { coin_exchange: coin_exchange } )
    }


    RefreshMarketList() {
        this.setState( {
            refreshing: true
        } );
        InteractionManager.runAfterInteractions( () => {
            this.props.onExchangeGetMarketList( ( error1, resBody1 ) => {
                if ( error1 ) {
                    this.setState( {
                        refreshing: false,
                    } );

                    Toast.show( error1.message );
                } else {
                    this.setState( {
                        refreshing: false,
                    } );
                }
            } );
        } );
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
                        <ExchangePairList
                            refreshing={this.state.refreshing}
                            onRefresh={this.RefreshMarketList.bind( this )}
                            data={{
                                marketList: this.props.marketList,
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
                            indicatorStyle={{ backgroundColor: 'white' }}
                            // style={{backgroundColor: 'white',color:'blue'}}
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


    render() {
        return (
            <View style={commonStyles.wrapper}>
                <StatusBar backgroundColor="blue" barStyle="light-content"/>
                <SafeAreaView style={[ commonStyles.wrapper ]}>
                    {this.exchangeAreaTabs()}


                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create( {
    scene: {
        flex: 1,
    },
} );

export default QuotesPageView;

