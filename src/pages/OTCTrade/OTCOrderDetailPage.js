import React from 'react';
import { connect } from "react-redux";
import OTCOrderDetailPageView from "./OTCOrderDetailPageView";

import {otcOrder, otcOrderMy} from "../../actions/OtcAction";

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


    onOtcOrder: (id, callback )=>{
        dispatch( otcOrder(id, (err,res) =>{
            callback && callback( err, res )
        }));
    }


} );

const OTCOrderDetailPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( OTCOrderDetailPageView );

export default OTCOrderDetailPage;