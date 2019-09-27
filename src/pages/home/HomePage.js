import React from 'react';
import { connect } from "react-redux";
import HomePageView from "./HomePageView";
import {exchangeGetCoinExchangeAreaList, exchangeGetMarketList} from "../../actions/ExchangeAction";
import userActionTypes from "../../reducers/user/userActionTypes";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        regionDisplay: store.settingStore.regionDisplay,
        deviceEnv: store.settingStore.deviceEnv,
        coin_exchange_area: store.metaStore.coin_exchange_area
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onExchangeGetMarketList: ( callback ) => {
        dispatch( exchangeGetMarketList( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
    changeTradePageCoinExchange:(coinEx)=>{
        dispatch(
            {
                type:userActionTypes.CHANGE_TRADE_EX,
                data: coinEx
            }
        )
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
