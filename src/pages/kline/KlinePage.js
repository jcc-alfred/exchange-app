import React from 'react';
import {connect} from "react-redux";
import KlinePageView from "./KlinePageView";
import {authLogout} from "../../actions/AuthAction";
import {LoadInitSocket} from "../../actions/SocketAction";
import {changeTradePageCoinExchange, exchangeUpdateMarketList} from "../../actions/ExchangeAction";

const mapStoreToProps = (store, ownProps) => {
    const {params} = ownProps.navigation.state;
    const coin_exchange = params.coin_exchange;

    return {
        coin_exchange: params.coin_exchange,
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
        entrustList: store.metaStore.entrustList,
        marketList:store.metaStore.marketList
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    socketUpdateMarketList: (marketList) => {
        dispatch(exchangeUpdateMarketList(marketList))
    },
    onChangeTradePageCoinExchange: (coinEx) => {
        dispatch(changeTradePageCoinExchange(coinEx));
    },
});

const KlinePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)(KlinePageView);

export default KlinePage;
