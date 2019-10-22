import React from 'react';
import { connect } from "react-redux";
import OTCPostDetailPageView from "./OTCPostDetailPageView";

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

const OTCPostDetailPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( OTCPostDetailPageView );

export default OTCPostDetailPage;