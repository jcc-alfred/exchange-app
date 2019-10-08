import React from 'react';
import { connect } from "react-redux";
import OrderHistoryPageView from "./OrderHistoryPageView";
import {
    exchangeDoCancelEntrust,
    exchangeGetUserEntrustList,
    exchangeGetUserHistoryEntrustList
} from "../../actions/ExchangeAction";

const mapStoreToProps = ( store, ownProps ) => {
    return {
        // TradePageCoinEx: store.metaStore.TradePageCoinEx
        marketList: store.metaStore.marketList,
        userInfo: store.userStore.userInfo,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onExchangeGetUserEntrustList: ( callback ) => {
        dispatch( exchangeGetUserEntrustList( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },

    onExchangeGetUserHistoryEntrustList: ( callback ) => {
        dispatch( exchangeGetUserHistoryEntrustList( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },

    onExchangeDoCancelEntrust: ( query, callback ) => {
        dispatch( exchangeDoCancelEntrust( query, ( err, res ) => {
            callback && callback( err, res )
        } ) )
    }

} );

const OrderHistoryPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( OrderHistoryPageView );

export default OrderHistoryPage;
