import React from 'react';
import { connect } from "react-redux";
import AuthRegisterNextPageView from "./AuthRegisterNextPageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AuthRegisterNextPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AuthRegisterNextPageView );

export default AuthRegisterNextPage;
