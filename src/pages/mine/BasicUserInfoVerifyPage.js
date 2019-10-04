import React from 'react';
import { connect } from "react-redux";
import BasicUserInfoVerifyPageView from "./BasicUserInfoVerifyPageView";
import {safeAddUserKYC} from "../../actions/UserAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onSafeAddUserKYC: ( query, callback ) => {
        dispatch( safeAddUserKYC(query, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    }
} );

const BasicUserInfoVerifyPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( BasicUserInfoVerifyPageView );

export default BasicUserInfoVerifyPage;
