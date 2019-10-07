import React from 'react';
import { connect } from "react-redux";
import AssetsWithdrawPageView from "./AssetsWithdrawPageView";
import { userSendCode } from "../../actions/UserAction";
import { assetsDoUserWithdraw } from "../../actions/AssetsAction";

const mapStoreToProps = ( store, ownProps ) => {

    const { params } = ownProps.navigation.state;

    return {
        assets: params ? params.assets : null,
        marketList: store.metaStore.marketList
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onUserSendCode: ( query, callback ) => {
        dispatch( userSendCode( query, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },

    onAssetsDoUserWithdraw: ( query, callback ) => {
        dispatch( assetsDoUserWithdraw( query, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
} );

const AssetsWithdrawPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AssetsWithdrawPageView );

export default AssetsWithdrawPage;
