import React from 'react';
import { connect } from "react-redux";
import TokenDepositHistoryPageView from "./TokenDepositHistoryPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {

    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const TokenDepositHistoryPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( TokenDepositHistoryPageView );

export default TokenDepositHistoryPage;
