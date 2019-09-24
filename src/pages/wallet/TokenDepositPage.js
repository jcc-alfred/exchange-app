import React from 'react';
import { connect } from "react-redux";
import TokenDepositPageView from "./TokenDepositPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const TokenDepositPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( TokenDepositPageView );

export default TokenDepositPage;
