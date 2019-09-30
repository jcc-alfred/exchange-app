import React from 'react';
import { connect } from "react-redux";
import AccountInfoPageView from "./AccountInfoPageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AccountInfoPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AccountInfoPageView );

export default AccountInfoPage;
