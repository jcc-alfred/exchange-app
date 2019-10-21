import React from 'react';
import { connect } from "react-redux";
import OTCBuySellPageView from "./OTCBuySellPageView";
import {
    otcOrderCreate
} from "../../actions/OtcAction";

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
    onOTCOrderCreate: ( entrust_id, coin_amount, callback ) => {
        dispatch( otcOrderCreate( entrust_id, coin_amount, ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },

} );

const OTCBuySellPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( OTCBuySellPageView );

export default OTCBuySellPage;