import React from 'react';
import { connect } from "react-redux";
import AssetsWithdrawPageView from "./AssetsWithdrawPageView";

const mapStoreToProps = ( store, ownProps ) => {

    const { params } = ownProps.navigation.state;

    return {
        assets: params ? params.assets : null
    }

};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AssetsWithdrawPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AssetsWithdrawPageView );

export default AssetsWithdrawPage;
