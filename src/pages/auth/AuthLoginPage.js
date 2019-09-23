import React from 'react';
import { connect } from "react-redux";
import AuthLoginPageView from "./AuthLoginPageView";


const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const AuthLoginPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AuthLoginPageView );

export default AuthLoginPage;
