import React from 'react';
import { connect } from "react-redux";
import {exchangeGetCoinExchangeAreaList, exchangeGetMarketList} from "../../actions/ExchangeAction";
import userActionTypes from "../../reducers/user/userActionTypes";
import QuotesPageView from "./QuotesPageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        regionDisplay: store.settingStore.regionDisplay,
        deviceEnv: store.settingStore.deviceEnv,
        coin_exchange_area: store.metaStore.coin_exchange_area,
        marketList: store.metaStore.marketList,
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

const QuotesPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( QuotesPageView );

export default QuotesPage;
