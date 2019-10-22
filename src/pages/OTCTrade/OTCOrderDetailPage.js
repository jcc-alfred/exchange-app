import React from 'react';
import { connect } from "react-redux";
import OTCOrderDetailPageView from "./OTCOrderDetailPageView";

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

} );

const OTCOrderDetailPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( OTCOrderDetailPageView );

export default OTCOrderDetailPage;