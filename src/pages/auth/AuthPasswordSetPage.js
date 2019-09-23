import React from 'react';
import { connect } from "react-redux";
import AuthPasswordSetPageView from "./AuthPasswordSetPageView";


const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        account: store.userStore.account,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AuthPasswordSetPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AuthPasswordSetPageView );

export default AuthPasswordSetPage;
