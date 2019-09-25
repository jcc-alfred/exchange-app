import React from 'react';
import { Dimensions, InteractionManager, SafeAreaView, StyleSheet, View } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import { Updates } from 'expo';
import { ConfirmDialog } from "react-native-simple-dialogs";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import { Text } from "react-native-elements";
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";

import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import { DrawerActions } from 'react-navigation-drawer';

class HomePageView extends React.Component {
    constructor( props ) {
        super( props );


        const coinExchangeArea = [];

        const { index, routes, scenes } = this.initTabData( coinExchangeArea );

        this.state = {
            isRequesting: false,
            coinExchangeArea: coinExchangeArea,
            marketList: [],
            index: index,
            routes: routes,
            scenes: scenes,
            updateDialogVisible: false
        }

    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.home ),
            headerBackTitle: null,
        };
    };

    componentDidMount() {
        this.checkForUpdate();
        this.loadData( true );
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


    checkForUpdate() {
        Updates.checkForUpdateAsync()
            .then( ( update ) => {
                if ( update.isAvailable ) {
                    this.setState( {
                        updateDialogVisible: true
                    } );
                }
            } )
            .catch( err => {

            } )
    }

    doUpdate() {
        Updates.fetchUpdateAsync()
            .then( ( update ) => {
                Updates.reload()
                    .then( () => {

                    } )
                    .catch( err => {

                    } );
            } )
            .catch( err => {

            } );
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
                            const { index, routes, scenes } = this.initTabData( resBody.data );

                            this.setState( {
                                isRequesting: false,
                                marketList: resBody1.data,
                                coinExchangeArea: resBody.data,
                                index: index,
                                routes: routes,
                                scenes: scenes,
                            } );
                        }
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
                    title: "aaaaa" + index
                } );
                scenes [ '' + index ] = () => {
                    return (
                        <Text>11111</Text>
                    );
                };
            }
        }

        return {
            index: 0,
            routes: routes,
            scenes: scenes
        }
    }


    exchangeAreaTabs() {
        if ( this.state.coinExchangeArea && this.state.coinExchangeArea.length > 0 ) {
            return (
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap( this.state.scenes )}
                    onIndexChange={index => this.setState( { index } )}
                    initialLayout={{ width: Dimensions.get( 'window' ).width }}
                    // renderTabBar={this.renderTabBar}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: 'white' }}
                            style={{ backgroundColor: 'pink' }}
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
                <SafeAreaView style={[ commonStyles.wrapper ]}>
                    {this.exchangeAreaTabs()}

                    <ConfirmDialog
                        title={I18n.t( Keys.notification )}
                        message={I18n.t( Keys.update_now )}
                        visible={this.state.updateDialogVisible}
                        onTouchOutside={() => this.setState( { updateDialogVisible: false } )}
                        positiveButton={{
                            title: I18n.t( Keys.yes ),
                            onPress: () => {
                                this.setState( {
                                    updateDialogVisible: false
                                } );
                                this.doUpdate();
                            }
                        }}
                        negativeButton={{
                            title: I18n.t( Keys.no ),
                            onPress: () => {
                                this.setState( {
                                    updateDialogVisible: false
                                } );
                            }
                        }}
                    />

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

export default HomePageView;

