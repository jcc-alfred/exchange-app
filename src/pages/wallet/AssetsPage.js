import React from 'react';
import { connect } from "react-redux";
import AssetsPageView from "./AssetsPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {

    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AssetsPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AssetsPageView );

export default AssetsPage;
