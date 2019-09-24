import React from 'react';
import { connect } from "react-redux";
import PasswordResetPageView from "./PasswordResetPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const PasswordResetPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( PasswordResetPageView );

export default PasswordResetPage;
