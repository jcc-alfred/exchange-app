import React from 'react';
import { connect } from "react-redux";
import UserPasswordResetPageView from "./UserPasswordResetPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {

    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const UserPasswordResetPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( UserPasswordResetPageView );

export default UserPasswordResetPage;
