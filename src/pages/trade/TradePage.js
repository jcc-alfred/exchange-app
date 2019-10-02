import React from 'react';
import {connect} from "react-redux";
import TradePageView from "./TradePageView";
import userActionTypes from "../../reducers/user/userActionTypes";
import {
    exchangeGetMarketList,
    exchangeGetIsExchangeSafe,
    exchangeDoEntrust,
    changeTradePageCoinExchange
} from "../../actions/ExchangeAction";

const mapStoreToProps = (store, ownProps) => {
    const {params} = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
        entrustList: store.metaStore.entrustList,
        TradePageCoinEx: store.metaStore.TradePageCoinEx,
        safePass:store.userStore.safePass
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({

    onChangeTradePageCoinExchange: (coinEx) => {
        dispatch(changeTradePageCoinExchange(coinEx));
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
    },
    changeSafePass:(password) =>{
        dispatch({
            type:userActionTypes.SAVE_SAFE_PASS,
            data: password
        })
    }
});

const TradePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)(TradePageView);

export default TradePage;
