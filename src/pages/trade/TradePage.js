import React from 'react';
import { connect } from "react-redux";
import TradePageView from "./TradePageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const TradePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( TradePageView );

export default TradePage;
