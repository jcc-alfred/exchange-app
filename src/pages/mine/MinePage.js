import React from 'react';
import { connect } from "react-redux";
import MinePageView from "./MinePageView";
import { assetsGetUserAssets } from "../../actions/AssetsAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onAssetsGetUserAssets: ( callback ) => {
        dispatch( assetsGetUserAssets( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
} );

const MinePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( MinePageView );

export default MinePage;
