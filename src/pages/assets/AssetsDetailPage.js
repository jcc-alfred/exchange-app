import React from 'react';
import { connect } from "react-redux";
import AssetsDetailPageView from "./AssetsDetailPageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        assets: params ? params.assets : null
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AssetsDetailPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AssetsDetailPageView );

export default AssetsDetailPage;
