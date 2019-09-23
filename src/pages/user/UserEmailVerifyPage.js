import React from 'react';
import { connect } from "react-redux";
import UserEmailVerifyPageView from "./UserEmailVerifyPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {

    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const UserEmailVerifyPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( UserEmailVerifyPageView );

export default UserEmailVerifyPage;
