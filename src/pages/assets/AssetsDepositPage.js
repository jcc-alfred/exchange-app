import React from 'react';
import { connect } from "react-redux";
import AssetsDepositPageView from "./AssetsDepositPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AssetsDepositPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AssetsDepositPageView );

export default AssetsDepositPage;
