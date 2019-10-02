import React from 'react';
import { connect } from "react-redux";
import GoogleAuthClosePageView from "./GoogleAuthClosePageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const GoogleAuthClosePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( GoogleAuthClosePageView );

export default GoogleAuthClosePage;
