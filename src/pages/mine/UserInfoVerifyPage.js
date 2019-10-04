import React from 'react';
import { connect } from "react-redux";
import UserInfoVerifyPageView from "./UserInfoVerifyPageView";
import {safeAddUserSeniorKYC} from "../../actions/UserAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onSafeAddUserSeniorKYC: ( query, callback ) => {
        dispatch( safeAddUserSeniorKYC(query, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    }

} );

const UserInfoVerifyPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( UserInfoVerifyPageView );

export default UserInfoVerifyPage;
