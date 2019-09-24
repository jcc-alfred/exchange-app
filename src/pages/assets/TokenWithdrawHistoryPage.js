import React from 'react';
import { connect } from "react-redux";
import TokenWithdrawHistoryPageView from "./TokenWithdrawHistoryPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const TokenWithdrawHistoryPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( TokenWithdrawHistoryPageView );

export default TokenWithdrawHistoryPage;
