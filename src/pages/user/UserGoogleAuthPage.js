import React from 'react';
import { connect } from "react-redux";
import UserGoogleAuthPageView from "./UserGoogleAuthPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {

    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const UserGoogleAuthPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( UserGoogleAuthPageView );

export default UserGoogleAuthPage;
