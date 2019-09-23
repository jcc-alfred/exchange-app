import React from 'react';
import { connect } from "react-redux";
import SettingsPageView from "./SettingsPageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const SettingsPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( SettingsPageView );

export default SettingsPage;
