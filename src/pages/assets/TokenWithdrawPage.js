import React from 'react';
import { connect } from "react-redux";
import TokenWithdrawPageView from "./TokenWithdrawPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const TokenWithdrawPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( TokenWithdrawPageView );

export default TokenWithdrawPage;
