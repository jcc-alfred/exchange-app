import React from 'react';
import { connect } from "react-redux";
import AssetsWithdrawPageView from "./AssetsWithdrawPageView";
import { userSendCode } from "../../actions/UserAction";
import { assetsDoUserWithdraw } from "../../actions/AssetsAction";

const mapStoreToProps = ( store, ownProps ) => {

    const { params } = ownProps.navigation.state;

    let coin = null;

    for (let index = 0; index < store.metaStore.coinList.length; index ++)
    {
        if (store.metaStore.coinList[index].coin_id === params.assets.coin_id)
        {
            coin =    store.metaStore.coinList[index];
            break;
        }
    }

    return {
        assets: params ? params.assets : null,
        marketList: store.metaStore.marketList,
        coinList: store.metaStore.coinList,
        coin:coin,
        userInfo: store.userStore.userInfo,
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
