import React from 'react';
import { connect } from "react-redux";
import FundPasswordResetPageView from "./FundPasswordResetPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {

    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const FundPasswordResetPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( FundPasswordResetPageView );

export default FundPasswordResetPage;
