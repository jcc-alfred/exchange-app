import React from 'react';
import { connect } from "react-redux";
import OTCTradePageView from "./OTCTradePageView";
import {otcSecretRemark, otcGetSecretRemark, otcEntrustCreate} from "../../actions/OtcAction";

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
    onOTCSecretRemark: (remark, callback ) => {
        dispatch( otcSecretRemark(remark, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },

    onGetOTCSecretRemark: ( callback ) => {
        dispatch( otcGetSecretRemark( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },

    onOTCEntrustCreate: (query, callback ) => {
        dispatch( otcEntrustCreate(query, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    }
} );

const OTCTradePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( OTCTradePageView );

export default OTCTradePage;
