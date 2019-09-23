import React from 'react';
import { connect } from "react-redux";
import AuthRegisterPageView from "./AuthRegisterPageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AuthRegisterPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AuthRegisterPageView );

export default AuthRegisterPage;
