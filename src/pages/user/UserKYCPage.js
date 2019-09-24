import React from 'react';
import { connect } from "react-redux";
import UserKYCPageView from "./UserKYCPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const UserKYCPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( UserKYCPageView );

export default UserKYCPage;
