import React from 'react';
import {connect} from "react-redux";
import AssetsDetailPageView from "./AssetsDetailPageView";
import {exchangeGetUserDepositListByCoinId, exchangeGetUserWithdrawListByCoinId} from "../../actions/ExchangeAction";

const mapStoreToProps = (store, ownProps) => {
    const {params} = ownProps.navigation.state;

    return {
        assets: params ? params.assets : null,
        marketList: store.metaStore.marketList
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onExchangeGetUserDepositListByCoinId: (query, callback) => {
        return dispatch(exchangeGetUserDepositListByCoinId(query, (err, res) => {
            callback && callback(err, res)
        }))
    },
    onExchangeGetUserWithdrawListByCoinId: (query, callback) => {
        return dispatch(exchangeGetUserWithdrawListByCoinId(query, (err, res) => {
            callback && callback(err, res)
        }))
    }
});

const AssetsDetailPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)(AssetsDetailPageView);

export default AssetsDetailPage;
