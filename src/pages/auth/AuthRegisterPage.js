import React from 'react';
import { connect } from "react-redux";
import AuthRegisterPageView from "./AuthRegisterPageView";
import { commonVerificationCodeGet } from "../../actions/CommonAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    onCommonVerificationCodeGet: ( phoneRegion, phone, callback ) => {
        dispatch( commonVerificationCodeGet( phoneRegion, phone, 2, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
});

const AuthRegisterPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AuthRegisterPageView );

export default AuthRegisterPage;
