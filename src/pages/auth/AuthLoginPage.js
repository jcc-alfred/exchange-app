import React from 'react';
import { connect } from "react-redux";
import AuthLoginPageView from "./AuthLoginPageView";
import { assetsGetUserAssets } from "../../actions/AssetsAction";
import { authLogin } from "../../actions/AuthAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onAuthLogin: ( account, password, imageCode, callback ) => {
        dispatch( authLogin( account, password, imageCode, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
} );

const AuthLoginPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AuthLoginPageView );

export default AuthLoginPage;
