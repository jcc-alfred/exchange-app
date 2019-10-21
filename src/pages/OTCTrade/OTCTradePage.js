import React from 'react';
import { connect } from "react-redux";
import OTCTradePageView from "./OTCTradePageView";
import {
    otcCoins,
    otcEntrustCreate,
    otcEntrustList,
    otcGetSecretRemark,
    otcSecretRemark,
    otcEntrustMy,
    otcOrderMy
} from "../../actions/OtcAction";
import { assetsGetUserAssets } from "../../actions/AssetsAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
        entrustList: store.metaStore.entrustList,
        TradePageCoinEx: store.userStore.TradePageCoinEx
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onOTCSecretRemark: ( remark, callback ) => {
        dispatch( otcSecretRemark( remark, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },

    onGetOTCSecretRemark: ( callback ) => {
        dispatch( otcGetSecretRemark( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },

    onOTCEntrustCreate: ( query, callback ) => {
        dispatch( otcEntrustCreate( query, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },

    onOTCCoins: ( callback ) => {
        dispatch( otcCoins( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },


    onNetOtcEntrustList: ( coin_id, type, callback ) => {
        dispatch( otcEntrustList( coin_id, type, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
    onAssetsGetUserAssets: ( callback ) => {
        dispatch( assetsGetUserAssets( ( err, res ) => {
            callback && callback( err, res )
        } ) );

    },

    onOTCEntrustMy: ( callback )=>{
        dispatch( otcEntrustMy( (err,res) =>{
            callback && callback( err, res )
        }));
    },

    onOTCOrderMy: ( callback )=>{
        dispatch( otcOrderMy( (err,res) =>{
            callback && callback( err, res )
        }));
    }




} );

const OTCTradePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( OTCTradePageView );

export default OTCTradePage;
