import React from 'react';
import { connect } from "react-redux";
import GoogleAuthPageView from "./GoogleAuthPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const GoogleAuthPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( GoogleAuthPageView );

export default GoogleAuthPage;
