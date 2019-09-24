import React from 'react';
import { connect } from "react-redux";
import AssetsWithdrawHistoryPageView from "./TokenWithdrawHistoryPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AssetsWithdrawHistoryPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AssetsWithdrawHistoryPageView );

export default AssetsWithdrawHistoryPage;
