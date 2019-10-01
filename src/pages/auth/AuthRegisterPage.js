import React from 'react';
import { connect } from "react-redux";
import AuthRegisterPageView from "./AuthRegisterPageView";
import { userSendCode } from "../../actions/UserAction";
import { authSignUp } from "../../actions/AuthAction";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onUserSendCode: ( query, callback ) => {
        dispatch( userSendCode( query, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },

    onAuthSignUp: ( query, callback ) => {
        dispatch( authSignUp( query, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
} );

const AuthRegisterPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AuthRegisterPageView );

export default AuthRegisterPage;
