import React from 'react';
import { connect } from "react-redux";
import FundPasswordChangePageView from "./FundPasswordChangePageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isReset: params.isReset
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const FundPasswordChangePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( FundPasswordChangePageView );

export default FundPasswordChangePage;
