import React from 'react';
import { connect } from "react-redux";
import OTCTradePageView from "./OTCTradePageView";
import userActionTypes from "../../reducers/user/userActionTypes";
import {exchangeGetMarketList} from "../../actions/ExchangeAction";

const mapStoreToProps = ( store, ownProps ) => {
    const {params} = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
        entrustList: store.metaStore.entrustList,
        TradePageCoinEx:store.userStore.TradePageCoinEx
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    changeTradePageCoinExchange:(coinEx)=>{
        dispatch(
            {
                type:userActionTypes.CHANGE_TRADE_EX,
                data: coinEx
            }
        )
    },
    onExchangeGetMarketList: ( callback ) => {
        dispatch( exchangeGetMarketList( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
} );

const OTCTradePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( OTCTradePageView );

export default OTCTradePage;