import React from 'react';
import { connect } from "react-redux";
import AuthPasswordSetPageView from "./AuthPasswordSetPageView";
import { userSetPassword } from "../../actions/UserAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        account: store.userStore.account,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    onUserSetPassword: ( phoneRegion, phone, password, callback ) => {
        dispatch( userSetPassword( phoneRegion, phone, password, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
});

const AuthPasswordSetPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AuthPasswordSetPageView );

export default AuthPasswordSetPage;
