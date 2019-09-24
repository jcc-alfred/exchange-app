import React from 'react';
import { connect } from "react-redux";
import AssetsWithdrawPageView from "./AssetsWithdrawPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AssetsWithdrawPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AssetsWithdrawPageView );

export default AssetsWithdrawPage;
