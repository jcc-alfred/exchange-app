import { AppNavigator, LanguageUpdate } from "./AppNavigator";

import { AppState, BackHandler, InteractionManager, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import { connect } from "react-redux";
import navActionTypes from "./reducers/nav/navActionTypes";

import commonStyles from "./styles/commonStyles";
import { NavigationActions, StackActions } from "react-navigation";
import { getEventEmitter } from "./EventEmitter";
import I18n from "./I18n";
import PubSubConstant from "./pubSub/PubSubConstant";
import { exchangeGetCoinList, exchangeGetMarketList } from "./actions/ExchangeAction";
import { userMe } from "./actions/UserAction";

class Main extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            appState: AppState.currentState,
            previousAppStates: [],
            memoryWarnings: 0,
            isShowLockView: true
        };

        this.props.dispatch( { 'type': navActionTypes.NAV_CLEAR_STACK } );

        this._handleAppStateChange = this.handleAppStateChange.bind( this );
        this._handleMemoryWarning = this.handleMemoryWarning.bind( this );
        this._onBack = this.onBack.bind( this );
        this._onLoginSuccess = this.onLoginSuccess.bind( this );

        this.props.dispatch( exchangeGetMarketList( null ) );
        this.props.dispatch( exchangeGetCoinList( null ) );

        I18n.locale = this.props.language;
        LanguageUpdate.update();
    }

    static shouldCloseApp( nav ) {
        return nav.index === 0;
    }

    componentDidMount() {
        AppState.addEventListener( 'change', this._handleAppStateChange );
        AppState.addEventListener( 'memoryWarning', this._handleMemoryWarning );
        BackHandler.addEventListener( 'hardwareBackPress', this._onBack );
        getEventEmitter().on( PubSubConstant.PUB_SUB_LOGIN_SUCCESS, this._onLoginSuccess );

        if ( this.props.isLoggedIn ) {
            getEventEmitter().emit( PubSubConstant.PUB_SUB_LOGIN_SUCCESS, '' );
        }
    }

    componentWillUnmount() {
        AppState.removeEventListener( 'change', this._handleAppStateChange );
        AppState.removeEventListener( 'memoryWarning', this._handleMemoryWarning );
        BackHandler.removeEventListener( 'hardwareBackPress', this._onBack );
        getEventEmitter().off( PubSubConstant.PUB_SUB_LOGIN_SUCCESS, this._onLoginSuccess );

        this.setState = ( state, callback ) => {

        };
    }

    onLoginSuccess() {
        InteractionManager.runAfterInteractions( () => {
            this.props.dispatch( userMe( null ) );
        } );
    }

    onBack() {
        const { dispatch, nav } = this.props;
        if ( Main.shouldCloseApp( nav ) ) {
            return false;
        }

        dispatch( {
            type: 'Navigation/BACK'
        } );

        return true;
    }

    shouldComponentUpdate( nextProps, nextState ) {
        if ( nextState.appState !== this.state.appState ) {
            if ( nextState.previousAppStates.length > 0 && nextState.previousAppStates[ nextState.previousAppStates.length - 1 ] === 'background' && nextState.appState === 'active' ) {
                //the app from background to active
                if ( this.props.isLoggedIn ) {
                    getEventEmitter().emit( PubSubConstant.PUB_SUB_LOGIN_SUCCESS, '' );
                }

                this.props.dispatch( exchangeGetMarketList( null ) );
                this.props.dispatch( exchangeGetCoinList( null ) );
            } else {
                this.setState( {
                    isShowLockView: true
                } )
            }
        }

        if ( nextState.isShowLockView !== this.state.isShowLockView ) {
            return true;
        }

        return false;
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.language !== this.props.language ) {
            // language changed
            I18n.locale = nextProps.language;

            this.props.dispatch(
                StackActions.reset(
                    {
                        index: 0,
                        actions: [
                            NavigationActions.navigate( { routeName: 'mainPage' } ),
                        ]
                    }
                )
            );

            LanguageUpdate.update();
        }
    }

    handleMemoryWarning() {
        this.setState( { memoryWarnings: this.state.memoryWarnings + 1 } );
    }

    handleAppStateChange( appState ) {
        const previousAppStates = this.state.previousAppStates.slice();
        previousAppStates.push( this.state.appState );
        this.setState( {
            appState: appState,
            previousAppStates: previousAppStates,
        } );
    }

    render() {
        return (
            <View style={[ commonStyles.wrapper, commonStyles.commonBG, {} ]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <AppNavigator/>
            </View>
        )
    }

}

const styles = StyleSheet.create( {} );


function select( store ) {


    return {
        nav: store.nav,
        dynamicDomains: store.settingStore.dynamicDomains,
        language: store.settingStore.language,
    };
}

export default connect( select )( Main );
