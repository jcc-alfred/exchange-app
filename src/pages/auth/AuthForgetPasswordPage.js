import React from 'react';
import { connect } from "react-redux";
import AuthForgetPasswordPageView from "./AuthForgetPasswordPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AuthForgetPasswordPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AuthForgetPasswordPageView );

export default AuthForgetPasswordPage;
