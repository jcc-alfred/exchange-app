import React from 'react';
import { connect } from "react-redux";
import AuthRegisterNextPageView from "./AuthRegisterNextPageView";
import { authLoginPhoneVerify } from "../../actions/AuthAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    onAuthLoginPhoneVerify: ( phoneRegion, phone, phoneVerificationCode, callback ) => {
        dispatch( authLoginPhoneVerify( phoneRegion, phone, phoneVerificationCode, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
});

const AuthRegisterNextPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AuthRegisterNextPageView );

export default AuthRegisterNextPage;
