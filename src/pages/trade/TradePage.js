import React from 'react';
import {connect} from "react-redux";
import TradePageView from "./TradePageView";
import userActionTypes from "../../reducers/user/userActionTypes";
import {exchangeGetMarketList, exchangeGetIsExchangeSafe, exchangeDoEntrust} from "../../actions/ExchangeAction";

const mapStoreToProps = (store, ownProps) => {
    const {params} = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
        entrustList: store.metaStore.entrustList,
        TradePageCoinEx: store.userStore.TradePageCoinEx,
        safePass:store.userStore.safePass
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeTradePageCoinExchange: (coinEx) => {
        dispatch(
            {
                type: userActionTypes.CHANGE_TRADE_EX,
                data: coinEx
            }
        )
    },
    onExchangeGetMarketList: (callback) => {
        dispatch(exchangeGetMarketList((err, res) => {
            callback && callback(err, res)
        }));
    },
    DoEntrust: (query, callback) => {
        dispatch(exchangeDoEntrust(query, (err, res) => {
            callback && callback(err, res)
        }))
    },
    CheckExchangeSafe: (coinExchangeId, callback) => {
        dispatch(exchangeGetIsExchangeSafe(coinExchangeId, (err, res) => {
            callback && callback(err, res)
        }))
    }
});

const TradePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)(TradePageView);

export default TradePage;
