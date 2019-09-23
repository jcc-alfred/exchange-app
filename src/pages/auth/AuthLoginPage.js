import React from 'react';
import { connect } from "react-redux";
import AuthLoginPageView from "./AuthLoginPageView";
import { authLoginPhonePassword } from "../../actions/AuthAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    onAuthLoginPhonePassword: ( phoneRegion, phone, password, callback ) => {
        dispatch( authLoginPhonePassword( phoneRegion, phone, password, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
});

const AuthLoginPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AuthLoginPageView );

export default AuthLoginPage;
