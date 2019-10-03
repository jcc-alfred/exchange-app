import React from 'react';
import { connect } from "react-redux";
import GoogleAuthOpenPageView from "./GoogleAuthOpenPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const GoogleAuthOpenPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( GoogleAuthOpenPageView );

export default GoogleAuthOpenPage;
