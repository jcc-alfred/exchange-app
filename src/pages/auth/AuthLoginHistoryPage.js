import React from 'react';
import { connect } from "react-redux";
import AuthLoginHistoryPageView from "./AuthLoginHistoryPageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        loginHistoryForDebug: store.userStore.loginHistoryForDebug,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AuthLoginHistoryPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AuthLoginHistoryPageView );

export default AuthLoginHistoryPage;
