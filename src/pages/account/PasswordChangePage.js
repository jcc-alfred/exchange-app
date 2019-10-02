import React from 'react';
import { connect } from "react-redux";
import PasswordChangePageView from "./PasswordChangePageView";
import { userSendCode } from "../../actions/UserAction";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onUserSendCode: ( query, callback ) => {
        dispatch( userSendCode( query, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
} );

const PasswordChangePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( PasswordChangePageView );

export default PasswordChangePage;
