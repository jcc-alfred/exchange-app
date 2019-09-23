import React from 'react';
import { connect } from "react-redux";
import SettingsPageView from "./SettingsPageView";
import { authLogout } from "../../actions/AuthAction";
import { localAuthenticationCheck } from "../../actions/SettingsAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    onAuthLogout: ( callback ) => {
        dispatch( authLogout( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },

    onLocalAuthenticationCheck: ( callback ) => {
        dispatch( localAuthenticationCheck( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
});

const SettingsPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( SettingsPageView );

export default SettingsPage;
