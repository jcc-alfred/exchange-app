import React from 'react';
import { connect } from "react-redux";
import AssetsDepositHistoryPageView from "./AssetsDepositHistoryPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AssetsDepositHistoryPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AssetsDepositHistoryPageView );

export default AssetsDepositHistoryPage;
