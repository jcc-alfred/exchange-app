import React from 'react';
import { connect } from "react-redux";
import UserInfoVerifyPageView from "./UserInfoVerifyPageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const UserInfoVerifyPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( UserInfoVerifyPageView );

export default UserInfoVerifyPage;
