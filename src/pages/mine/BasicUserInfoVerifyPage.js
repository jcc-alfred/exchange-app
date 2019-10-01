import React from 'react';
import { connect } from "react-redux";
import BasicUserInfoVerifyPageView from "./BasicUserInfoVerifyPageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const BasicUserInfoVerifyPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( BasicUserInfoVerifyPageView );

export default BasicUserInfoVerifyPage;
