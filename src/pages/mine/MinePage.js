import React from 'react';
import { connect } from "react-redux";
import MinePageView from "./MinePageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
        userIdentity: store.userStore.userIdentity,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const MinePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( MinePageView );

export default MinePage;
