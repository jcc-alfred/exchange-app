import React from 'react';
import { connect } from "react-redux";
import AssetsPageView from "./AssetsPageView";
import { assetsGetUserAssets } from "../../actions/AssetsAction";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {

    onAssetsGetUserAssets: ( callback ) => {
        dispatch( assetsGetUserAssets( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
} );

const AssetsPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AssetsPageView );

export default AssetsPage;
