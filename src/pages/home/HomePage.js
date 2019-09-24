import React from 'react';
import { connect } from "react-redux";
import HomePageView from "./HomePageView";
import { assetsGetUserAssets } from "../../actions/AssetsAction";
import {exchangeGetCoinExchangeAreaList, exchangeGetMarketList} from "../../actions/ExchangeAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        regionDisplay: store.settingStore.regionDisplay,
        deviceEnv: store.settingStore.deviceEnv,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onExchangeGetMarketList: ( callback ) => {
        dispatch( exchangeGetMarketList( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
    onExchangeGetCoinExchangeArea: ( callback ) => {
        dispatch(exchangeGetCoinExchangeAreaList( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
} );

const HomePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( HomePageView );

export default HomePage;
