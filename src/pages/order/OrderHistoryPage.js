import React from 'react';
import { connect } from "react-redux";
import OrderHistoryPageView from "./OrderHistoryPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {

    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const OrderHistoryPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( OrderHistoryPageView );

export default OrderHistoryPage;
