import React from 'react';
import { connect } from "react-redux";
import AssetsListPageView from "./AssetsListPageView";
import { assetsGetUserAssets } from "../../actions/AssetsAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
        userAssets: store.userStore.userAssets
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onAssetsGetUserAssets: ( callback ) => {
        dispatch( assetsGetUserAssets( ( err, res ) => {
            callback && callback( err, res )
        }, true ) );
    },
} );

const AssetsListPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AssetsListPageView );

export default AssetsListPage;
