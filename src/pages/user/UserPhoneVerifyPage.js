import React from 'react';
import { connect } from "react-redux";
import UserPhoneVerifyPageView from "./UserPhoneVerifyPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {

    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const UserPhoneVerifyPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( UserPhoneVerifyPageView );

export default UserPhoneVerifyPage;
